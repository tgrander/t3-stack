import { api } from "~/trpc/server";
import { PersonaCard } from "~/components/personas";

export default async function IndexPage() {
  const personas = (await api.persona.getAll.query()) ?? [];

  return (
    <div className="flex h-full flex-1 items-center justify-center">
      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
        {personas.map((p) => {
          return <PersonaCard key={p.id} persona={p} />;
        })}
      </div>
    </div>
  );
}
