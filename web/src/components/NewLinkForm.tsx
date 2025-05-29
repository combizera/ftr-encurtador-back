import { InputField } from "./InputField";
import { ButtonPrimary } from "./ButtonPrimary";

export function NewLinkForm() {
  return (
    <div className="bg-white w-full rounded-lg shadow p-6 max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-4">
        Novo link
      </h2>

      <InputField
        label="Link Original"
        placeholder="www.exemplo.com.br"
        type="text"
        error="Esse link já existe"
      />

      <InputField
        label="Link Encurtado"
        placeholder="brev.ly/"
        type="text"
      />

      <ButtonPrimary href="#" className="mt-4">
        Salvar link
      </ButtonPrimary>
    </div>
  );
}
