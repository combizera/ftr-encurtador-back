import { LinkSimple } from "phosphor-react";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import { config } from "../config";

export function Redirect() {
  const { shortCode } = useParams<{ shortCode: string }>();
  const [error, setError] = useState<string | null>(null);
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (hasRedirected.current) return;
    hasRedirected.current = true;

    async function handleRedirect() {
      try {
        if (!shortCode) {
          setError("Código inválido.");
          return;
        }

        const apiBase = `${config.BACKEND_URL}/links`;
        const res = await fetch(`${apiBase}/${shortCode}`);
        
        if (!res.ok) throw new Error("Resposta inválida do servidor");

        const result = await res.json();
        
        if (!result.success || !result.data?.originalUrl) {
          setError("Link não encontrado.");
          return;
        }

        const originalUrl = result.data.originalUrl;
        
        await fetch(`${apiBase}/${shortCode}`, { method: "PUT" });
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        window.location.href = originalUrl;
      } catch (err) {
        setError("Erro ao redirecionar.");
        console.error(err);
      }
    }

    handleRedirect();
  }, [shortCode]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-sm w-full">
          <h1 className="text-lg font-semibold mb-2">Erro</h1>
          <p className="text-sm text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-sm w-full">
        <div className="flex justify-center mb-4 text-blue-700">
          <LinkSimple size={48} weight="bold" />
        </div>
        <h1 className="text-lg font-semibold mb-2">
          Redirecionando...
        </h1>
        <p className="text-sm text-gray-600">
          Você será redirecionado automaticamente.
        </p>
      </div>
    </div>
  );
}