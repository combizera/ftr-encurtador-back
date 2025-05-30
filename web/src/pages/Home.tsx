import { useEffect, useState } from 'react';

import { config } from '../config';
import { Logo } from '../components/Logo';
import { LinksList } from '../components/LinksList';
import { NewLinkForm } from '../components/NewLinkForm';

type Link = {
  id: string;
  shortCode: string;
  originalUrl: string;
  accessCount: number;
};

export function Home() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchLinks() {
    try {
      setLoading(true);
      const response = await fetch(`${config.BACKEND_URL}/links/`);
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

  useEffect(() => {
    fetchLinks();
  }, []);

  function addNewLink(newLink: Link) {
    setLinks(prev => [newLink, ...prev]);
  }

  function removeLink(shortCode: string) {
    setLinks(prev => prev.filter(link => link.shortCode !== shortCode));
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col items-start gap-6 justify-center p-6">
        <header>
          <Logo />
        </header>
        <main className="mt-4 w-full flex flex-col md:flex-row items-start gap-6">
          <NewLinkForm onLinkCreated={addNewLink} />
          <LinksList
            links={links}
            loading={loading}
            onLinkRemoved={removeLink}
          />
        </main>
      </div>
    </div>
  );
}