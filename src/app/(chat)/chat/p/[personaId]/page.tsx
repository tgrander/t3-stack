export default async function PersonaChat({
  params,
}: {
  params: { personaId?: string };
}) {
  const { personaId } = params;

  return (
    <div>
      <h1>Persona Chat</h1>
      <p>Persona ID: {personaId}</p>
    </div>
  );
}
