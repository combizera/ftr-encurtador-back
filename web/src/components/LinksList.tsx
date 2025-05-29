import { useEffect, useState } from "react";
import { DownloadSimple, Trash, Copy, Link } from "phosphor-react";

import { IconButton } from "./IconButton";
import { ButtonSecondary } from "./ButtonSecondary";

type Link = {
  id: string;
  shortCode: string;
  originalUrl: string;
  accessCount: number;
};

export function LinksList() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchLinks() {
      try {
        const response = await fetch("http://localhost:3333/links/");
        const data = await response.json();

        if (data.success) {
          setLinks(data.data);
        } else {
          console.error("Erro ao buscar links:", data.error);
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLinks();
  }, []);

  function copyLink(shortCode: string) {
    const fullUrl = `https://brev.ly/${shortCode}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      alert("Link copiado para a área de transferência!");
    });
  }

  function deleteLink(shortCode: string) {
    setLinks((prev) => prev.filter((link) => link.shortCode !== shortCode));
  }

  function handleDownloadCsv() {
    //
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 w-full max-w-2xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Meus links
        </h2>
        <ButtonSecondary title="Baixar CSV" onClick={handleDownloadCsv}>
          <DownloadSimple size={16} />
          Baixar CSV
        </ButtonSecondary>
      </div>

      {loading ? (
        <p className="text-gray-500">Carregando...</p>
      ) : links.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <Link size={48} className="mb-4" />
          <span className="text-sm text-center">
            Ainda não existem links cadastrados
          </span>
        </div>
      ) : (
        <ul className="space-y-4">
          {links.map((link) => (
            <li key={link.id} className="border-b border-gray-300 pb-4">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <a
                    href={`https://${link.originalUrl}`}
                    className="text-sm text-indigo-700 font-semibold hover:underline truncate max-w-[140px] sm:max-w-none"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    brev.ly/{link.shortCode}
                  </a>
                  <span className="text-xs text-gray-500 truncate max-w-[150px] sm:max-w-none">
                    {link.originalUrl.length > 60 ?
                      `${link.originalUrl.substring(0, 60)}...` :
                      link.originalUrl
                    }
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 mr-2">
                    {link.accessCount} acessos
                  </span>
                  <div className="flex items-center gap-2">
                    <IconButton
                      title="Copiar link"
                      onClick={() => copyLink(link.shortCode)}
                    >
                      <Copy size={16} />
                    </IconButton>
                    <IconButton
                      title="Excluir link"
                      onClick={() => deleteLink(link.shortCode)}
                    >
                      <Trash size={16} />
                    </IconButton>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
