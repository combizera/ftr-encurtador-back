import { useState } from "react";
import { InputField } from "./InputField";
import { ButtonPrimary } from "./ButtonPrimary";

type Link = {
  id: string;
  shortCode: string;
  originalUrl: string;
  accessCount: number;
};

interface NewLinkFormProps {
  onLinkCreated: (newLink: Link) => void;
}

export function NewLinkForm({ onLinkCreated }: NewLinkFormProps) {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3333/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          originalUrl,
          shortCode,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || "Erro ao criar link.");
        return;
      }

      // Limpa os campos
      setOriginalUrl("");
      setShortCode("");
      
      // Chama o callback para adicionar o link à lista
      onLinkCreated(data.data);
      
      alert("Link criado com sucesso!");
    } catch {
      setError("Erro ao se comunicar com o servidor.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white w-full rounded-lg shadow p-6 max-w-md mx-auto"
    >
      <h2 className="text-lg font-semibold mb-4">
        Novo link
      </h2>
      <InputField
        label="Link Original"
        placeholder="www.exemplo.com.br"
        type="text"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        error={error}
      />
      <InputField
        label="Link Encurtado"
        placeholder="seu-alias"
        type="text"
        value={shortCode}
        onChange={(e) => setShortCode(e.target.value)}
        prefix="brev.ly/"
        error={error}
      />
      <ButtonPrimary type="submit" className="mt-4">
        Salvar link
      </ButtonPrimary>
    </form>
  );
}