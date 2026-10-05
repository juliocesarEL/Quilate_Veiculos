/**
 * Gera a imagem de compartilhamento (public/og.png) e os ícones (app/icon.svg,
 * app/apple-icon.png, public/icon-192.png, public/icon-512.png) a partir da marca
 * da logo e da foto do hero. Rode com:  node scripts/gerar-icones-og.mjs
 *
 * Rode de novo se trocar a logo ou a foto do hero (heroFoto em data/loja.ts).
 */
import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const raiz = path.resolve(import.meta.dirname, "..");
const out = (...p) => path.join(raiz, ...p);

/** Lê heroFoto.src de data/loja.ts (ou use o caminho passado como argumento) */
const lojaTs = await readFile(out("data", "loja.ts"), "utf8");
const FOTO_HERO = process.argv[2] ?? lojaTs.match(/heroFoto: \{\s*src: "\/([^"]+)"/)[1];

/* ---------- marca da logo (mesma geometria de components/ui/Logo.tsx) ---------- */
const MARCA = {
  contorno: "10.5,1.5 37.5,1.5 46.5,11.5 24,35.5 1.5,11.5",
  cintura: "M1.5 11.5H46.5",
  facetas: "M10.5 1.5L17 11.5L24 1.5L31 11.5L37.5 1.5M17 11.5L24 35.5L31 11.5",
};

/** Marca com largura `w` posicionada em (ox, oy); viewBox original -1 -0.5 50 39 */
const marcaSvg = (w, ox, oy, cor = "#2D6A53") => {
  const k = w / 50;
  return `<g transform="translate(${ox + k} ${oy + 0.5 * k}) scale(${k})" fill="none" stroke="${cor}" stroke-linejoin="round" stroke-linecap="round">
    <polygon points="${MARCA.contorno}" stroke-width="3"/>
    <path d="${MARCA.cintura}" stroke-width="3"/>
    <path d="${MARCA.facetas}" stroke-width="2"/></g>`;
};

const FONTE = "Montserrat, 'Segoe UI', Arial, sans-serif";

async function salvar(svg, arquivo, { w, h }) {
  await sharp(Buffer.from(svg), { density: 96 }).resize(w, h).png({ compressionLevel: 9 }).toFile(arquivo);
  console.log("✓", path.relative(raiz, arquivo));
}

/** Imagem de compartilhamento: texto à esquerda e a foto do hero em quadro arredondado à direita */
async function og() {
  const [largura, altura, x, y, raio] = [500, 420, 640, 105, 28];
  const foto = await sharp(out("public", FOTO_HERO)).resize(largura, altura, { fit: "cover" }).png().toBuffer();
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <radialGradient id="g" cx=".76" cy=".66" r=".6"><stop offset="0" stop-color="#2D6A53" stop-opacity=".6"/><stop offset="1" stop-color="#0E1217" stop-opacity="0"/></radialGradient>
      <clipPath id="quadro"><rect x="${x}" y="${y}" width="${largura}" height="${altura}" rx="${raio}"/></clipPath>
    </defs>
    <rect width="1200" height="630" fill="#0E1217"/>
    <rect width="1200" height="630" fill="url(#g)"/>
    ${marcaSvg(92, 72, 76, "#53B590")}
    <text x="182" y="112" font-family="${FONTE}" font-size="34" font-weight="800" letter-spacing="3" fill="#E9ECEE">QUILATE</text>
    <text x="184" y="146" font-family="${FONTE}" font-size="17" font-weight="600" letter-spacing="9" fill="#9AA3AB">VEÍCULOS</text>
    <text x="72" y="268" font-family="${FONTE}" font-size="58" font-weight="800" fill="#ffffff">Seminovos com</text>
    <text x="72" y="336" font-family="${FONTE}" font-size="58" font-weight="800" fill="#53B590">procedência</text>
    <text x="72" y="392" font-family="${FONTE}" font-size="26" fill="#C9D1D6">Salto/SP · Atendimento pelo WhatsApp</text>
    <image x="${x}" y="${y}" width="${largura}" height="${altura}" clip-path="url(#quadro)" xlink:href="data:image/png;base64,${foto.toString("base64")}"/>
    <rect x="${x}" y="${y}" width="${largura}" height="${altura}" rx="${raio}" fill="none" stroke="#ffffff" stroke-opacity=".12"/>
  </svg>`;
}

/** Ícone quadrado: marca verde sobre fundo branco */
function icone(tam, raio = 0.22) {
  const w = tam * 0.7;
  const h = (w * 39) / 50;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${tam}" height="${tam}" viewBox="0 0 ${tam} ${tam}">
    <rect width="${tam}" height="${tam}" rx="${tam * raio}" fill="#ffffff"/>${marcaSvg(w, (tam - w) / 2, (tam - h) / 2)}</svg>`;
}

await salvar(await og(), out("public", "og.png"), { w: 1200, h: 630 });
await writeFile(out("app", "icon.svg"), icone(64));
console.log("✓ app/icon.svg");
await salvar(icone(180, 0), out("app", "apple-icon.png"), { w: 180, h: 180 });
await salvar(icone(192), out("public", "icon-192.png"), { w: 192, h: 192 });
await salvar(icone(512), out("public", "icon-512.png"), { w: 512, h: 512 });
