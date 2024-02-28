import { cn } from "~/utils";
import { SendMessage } from "~/app/chat/_components";

const bgGradient = "bg-gradient-to-r from-violet-200 to-pink-200";

export default function ChatLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex min-h-screen">
      {/* Static Desktop Sidebar */}
      <div className={cn("hidden bg-gray-300/40 md:fixed md:inset-y-0 md:z-50 md:flex md:w-64 md:flex-col", bgGradient)}>
        {/* Sidebar content */}
      </div>
      <div className="flex flex-1 lg:pl-64">
        {/* <SendMessage /> */}
        {/* Conversation Details */}
        {children}
      </div>
    </div>
  );
}
