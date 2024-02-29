import { unstable_noStore as noStore } from "next/cache";
import { cn } from "~/utils";
import { api } from "~/trpc/server";

const bgGradient = "bg-gradient-to-r from-violet-200 to-pink-200";

export default async function ChatLayout({
  children,
}: React.PropsWithChildren) {
  // noStore();
  const personas = (await api.persona.get.query()) ?? [];

  console.log("personas :>> ", personas);

  return (
    <div className="flex min-h-screen">
      {/* Static Desktop Sidebar */}
      <div
        className={cn(
          "hidden bg-gray-300/40 md:fixed md:inset-y-0 md:z-50 md:flex md:w-64 md:flex-col",
          bgGradient,
        )}
      >
        {/* Sidebar content */}
      </div>
      <div className="flex flex-1 md:pl-64">
        {/* Messenger */}
        <div className="mx-auto w-full max-w-screen-md">
          <div className="flex h-full flex-col p-6">
            <h2 className="mb-4 text-2xl font-semibold">
              Chat with Robin Williams
            </h2>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
