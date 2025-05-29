import Image404 from '../assets/404.svg';

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <img src={Image404} alt="404 Not Found" className="h-[150px] w-full object-contain" />
        <h2 className="text-xl font-semibold mb-2">
          Link não encontrado
        </h2>
        <p className="text-gray-600">
          O link que você está tentando acessar não existe, foi removido ou é uma URL inválida. Saiba mais em <a href="https://brev.ly" target="_blank" className="mt-4 inline-block text-blue-600 underline"> brev.ly</a>
        </p>
      </div>
    </div>
  );
}
