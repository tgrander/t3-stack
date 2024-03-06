import { api } from "~/trpc/server";

export default async function IndexPage() {
  const personas = (await api.persona.getAll.query()) ?? [];

  return (
    <div className="flex h-screen flex-1 items-center justify-center">
      <div>hello world</div>
    </div>
  );
}
