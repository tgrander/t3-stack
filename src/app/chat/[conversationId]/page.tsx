import { cn } from "~/utils";

const bgGradient = "bg-gradient-to-r from-violet-200 to-pink-200";

function ChatDetails() {
  return (
    <div className={cn("hidden lg:flex lg:w-72 lg:flex-col", bgGradient)}>
      <div className=" w-full px-6 py-4">
        <h2 className="w text-lg">Conversation Details</h2>
      </div>
    </div>
  );
}

export default ChatDetails;
