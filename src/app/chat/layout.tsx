import { cn } from "~/utils";
import { Messenger } from "~/app/chat/_components";

const bgGradient = "bg-gradient-to-r from-violet-200 to-pink-200";

export default function ChatLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex min-h-screen">
      {/* Static Desktop Sidebar */}
      <div className="hidden bg-gray-300/40 lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        {/* Sidebar content */}
      </div>

      {/* Columns Wrapper */}
      <div className="flex flex-1 lg:pl-64">
        {/* Chat History */}
        <div className={cn("hidden lg:flex lg:w-72 lg:flex-col", bgGradient)}>
          {/* Chat history content */}
        </div>

        {/* Chat Messenger */}
        <div className="flex flex-1">
          <div className="w-full">
            {/* Messenger component */}
            <Messenger />
          </div>
        </div>

        {/* Conversation Details */}
        {children}
      </div>
    </div>
  );
}
