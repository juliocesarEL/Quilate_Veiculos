import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { FormFinanciamento } from "@/components/formularios/FormFinanciamento";

/**
 * Teste do formulário como o visitante usa: digita, envia e confere o que aparece.
 * O window.open é substituído por um espião para verificar o link do WhatsApp sem abrir nada.
 */
describe("FormFinanciamento", () => {
  let abrir: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    abrir = vi.spyOn(window, "open").mockReturnValue({ opener: null } as Window);
  });

  const campoCpf = () => screen.getByLabelText("CPF");
  const campoNascimento = () => screen.getByLabelText("Data de nascimento");
  const botaoEnviar = () => screen.getByRole("button", { name: /simular financiamento/i });

  it("aplica as máscaras enquanto o usuário digita", async () => {
    const user = userEvent.setup();
    render(<FormFinanciamento />);

    await user.type(campoCpf(), "52998224725");
    await user.type(campoNascimento(), "15081990");

    expect(campoCpf()).toHaveValue("529.982.247-25");
    expect(campoNascimento()).toHaveValue("15/08/1990");
  });

  it("não envia com campos vazios: mostra os erros e leva o foco ao primeiro", async () => {
    const user = userEvent.setup();
    render(<FormFinanciamento />);

    await user.click(botaoEnviar());

    expect(screen.getByText("Informe seu CPF.")).toBeInTheDocument();
    expect(screen.getByText("Informe sua data de nascimento.")).toBeInTheDocument();
    expect(campoCpf()).toHaveAttribute("aria-invalid", "true");
    expect(campoCpf()).toHaveAccessibleDescription("Informe seu CPF.");
    await waitFor(() => expect(campoCpf()).toHaveFocus());
    expect(abrir).not.toHaveBeenCalled();
  });

  it("recusa CPF inválido e menor de idade", async () => {
    const user = userEvent.setup();
    render(<FormFinanciamento />);

    await user.type(campoCpf(), "11111111111");
    await user.type(campoNascimento(), "01012015");
    await user.click(botaoEnviar());

    expect(screen.getByText(/esse cpf não é válido/i)).toBeInTheDocument();
    expect(screen.getByText(/só para maiores de 18 anos/i)).toBeInTheDocument();
    expect(abrir).not.toHaveBeenCalled();
  });

  it("depois do primeiro envio, o erro some assim que o campo é corrigido", async () => {
    const user = userEvent.setup();
    render(<FormFinanciamento />);

    await user.click(botaoEnviar());
    expect(screen.getByText("Informe seu CPF.")).toBeInTheDocument();

    await user.type(campoCpf(), "52998224725");
    expect(screen.queryByText(/Informe seu CPF|CPF incompleto|CPF não é válido/)).not.toBeInTheDocument();
    expect(campoCpf()).not.toHaveAttribute("aria-invalid");
  });

  it("com dados válidos, abre o WhatsApp com a mensagem preenchida e mostra a confirmação", async () => {
    const user = userEvent.setup();
    render(<FormFinanciamento />);

    await user.type(campoCpf(), "52998224725");
    await user.type(campoNascimento(), "15081990");
    await user.click(botaoEnviar());

    expect(abrir).toHaveBeenCalledTimes(1);
    const [link, alvo] = abrir.mock.calls[0] as [string, string];
    expect(alvo).toBe("_blank");
    expect(link).toMatch(/^https:\/\/wa\.me\/\d+\?text=/);
    expect(decodeURIComponent(link.split("text=")[1])).toBe(
      "Olá! Quero simular um financiamento.\nCPF: 529.982.247-25\nData de nascimento: 15/08/1990",
    );
    expect(screen.getByRole("status")).toHaveTextContent(/abrimos o whatsapp/i);
  });
});
