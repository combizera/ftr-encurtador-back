import { Logo } from '../components/Logo';
import { LinksList } from '../components/LinksList';
import { NewLinkForm } from '../components/NewLinkForm';

export function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col items-start gap-6 justify-center p-6">
        <header>
          <Logo />
        </header>

        <main className="mt-4 w-full flex flex-col md:flex-row items-start gap-6">
          <NewLinkForm />
          <LinksList />
        </main>
      </div>
    </div>
  );
}
