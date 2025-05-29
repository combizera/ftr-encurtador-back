import { useEffect } from "react";
import { LinkSimple } from "phosphor-react";
import { Link, useNavigate } from "react-router-dom";

interface RedirectProps {
  to: string;
  delay?: number;
}

export function Redirect({ to, delay = 3000 }: RedirectProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate(to);
    }, delay);

    return () => clearTimeout(timeout);
  }, [to, delay, navigate]);

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
          O link será aberto automaticamente em alguns instantes.
          <br />
          Não foi redirecionado?{" "}
          <Link to={to} className="text-blue-700 hover:underline">
            Acesse aqui
          </Link>
        </p>
      </div>
    </div>
  );
}
