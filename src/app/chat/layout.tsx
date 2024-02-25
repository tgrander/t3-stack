import { cn } from "~/utils";

const bgGradient = "bg-gradient-to-r from-violet-200 to-pink-200";

export default function ChatLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <div className="flex">
        {/* Static Desktop Sidebar */}
        <div className="hidden w-64 lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-300/40 px-6 pb-4"></div>
        </div>

        {/* Columns Wrapper */}
        <div className="flex h-screen flex-1 lg:pl-64">
          {/* Chat History */}
          <div className={cn("hidden lg:flex lg:w-72 lg:flex-col", bgGradient)}>
            <div className=" w-full px-6 py-4">
              <h2 className="w text-lg">Chat History</h2>
              {/* Server Component goes here */}
            </div>
          </div>

          {/* Chat Messenger */}
          <div className="flex flex-1">
            <div className=" w-full px-6 py-4">
              <h2 className="w text-lg">Messenger</h2>
              {/* Server Component goes here */}
            </div>
          </div>

          {/* Conversation Details */}
          {children}
        </div>
      </div>
    </>
  );
}
