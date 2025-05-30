import { DownloadSimple, Trash, Copy, Link } from "phosphor-react";

import { config } from "../config";
import { IconButton } from "./IconButton";
import { ButtonSecondary } from "./ButtonSecondary";

type LinkType = {
  id: string;
  shortCode: string;
  originalUrl: string;
  accessCount: number;
};

interface LinksListProps {
  links: LinkType[];
  loading: boolean;
  onLinkRemoved: (shortCode: string) => void;
}

export function LinksList({ links, loading, onLinkRemoved }: LinksListProps) {
  function copyLink(shortCode: string) {
    const fullUrl = `${config.FRONTEND_URL}/redirect/${shortCode}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      alert("Link copiado para a área de transferência!");
    });
  }

  async function deleteLink(shortCode: string) {
    const confirmDelete = confirm("Tem certeza que deseja excluir este link?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${config.BACKEND_URL}/links/${shortCode}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.error || "Erro ao deletar link.");
        return;
      }

      onLinkRemoved(shortCode);
      alert("Link deletado com sucesso!");
    } catch (error) {
      alert("Erro ao se comunicar com o servidor.");
      console.error("Erro ao deletar:", error);
    }
  }

  function handleDownloadCsv() {
    fetch(`${config.BACKEND_URL}/export`, {
      method: "GET",
    })
      .then(async (response) => {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;

        const contentDisposition = response.headers.get("Content-Disposition");
        const filenameMatch = contentDisposition?.match(/filename=([^;\n]+)/i);
        const filename = filenameMatch?.[1] || "relatorio.csv";

        console.log("Nome do arquivo:", filename);
        console.log("Content-Disposition:", contentDisposition);

        a.download = filename.trim();
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Erro ao baixar CSV:", error);
        alert("Erro ao tentar baixar o relatório.");
      });
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 w-full max-w-2xl max-h-[450px] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Meus links
        </h2>
        <ButtonSecondary
          title="Baixar CSV"
          onClick={handleDownloadCsv}
          disabled={loading}
        >
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
                    href={`${config.FRONTEND_URL}/redirect/${link.shortCode}`}
                    className="text-sm text-indigo-700 font-semibold hover:underline truncate max-w-[140px] sm:max-w-none"
                    rel="noopener noreferrer"
                  >
                    brev.ly/{link.shortCode}
                  </a>
                  <span className="block text-xs text-gray-500 truncate max-w-[220px]">
                    {link.originalUrl.length > 45 ?
                      `${link.originalUrl.substring(0, 45)}...` :
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