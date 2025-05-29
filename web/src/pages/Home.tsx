import { Logo } from '../components/Logo';
import { LinksList } from '../components/LinksList';
import { NewLinkForm } from '../components/NewLinkForm';

export function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col md:flex-row items-start gap-6 justify-center">
      <header className="absolute top-6 left-6">
        <Logo />
      </header>

      <main className="mt-20 w-full flex flex-col md:flex-row items-start gap-6 max-w-6xl mx-auto">
        <NewLinkForm />
        <LinksList />
      </main>
    </div>
  );
}
