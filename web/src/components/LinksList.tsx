import { useState } from "react";
import { DownloadSimple, Trash, Copy, Link } from "phosphor-react";

import { IconButton } from "./IconButton";
import { ButtonSecondary } from "./ButtonSecondary";

type Link = {
  id: string;
  shortUrl: string;
  originalUrl: string;
  clicks: number;
};

export function LinksList() {
  const [links, setLinks] = useState<Link[]>([
    {
      id: "1",
      shortUrl: "brev.ly/Portfolio-Dev",
      originalUrl: "devsite.portfolio.com.br/devname-123456",
      clicks: 30,
    },
    {
      id: "2",
      shortUrl: "brev.ly/Linkedin-Profile",
      originalUrl: "linkedin.com/in/myprofile",
      clicks: 15,
    },
    {
      id: "3",
      shortUrl: "brev.ly/Github-Project",
      originalUrl: "github.com/devname/project-name-v2",
      clicks: 34,
    },
    {
      id: "4",
      shortUrl: "brev.ly/Figma-Encurtador-de-Links",
      originalUrl: "figma.com/design/file/Encurtador-de-Links",
      clicks: 53,
    },
  ]);

  function copyLink(url: string) {
    navigator.clipboard.writeText(url).then(() => {
      alert("Link copiado para a área de transferência!");
    });
  }

  function deleteLink(id: string) {
    setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
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

      {links.length === 0 ? (
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
                    {link.shortUrl}
                  </a>
                  <span className="text-xs text-gray-500 truncate max-w-[150px] sm:max-w-none">
                    {link.originalUrl}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 mr-2">
                    {link.clicks} acessos
                  </span>
                  <div className="flex items-center gap-2">
                    <IconButton title="Copiar link" onClick={() => copyLink(link.shortUrl)}>
                      <Copy size={16} />
                    </IconButton>
                    <IconButton title="Excluir link" onClick={() => deleteLink(link.id)}>
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
