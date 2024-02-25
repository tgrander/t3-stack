import { Input } from "~/components/ui/input";

export function Messenger() {
  return (
    <div className="flex h-full flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto">{/* Messages go here */}</div>

      {/* Text Input */}
      <div className="flex space-x-2 p-4">
        <Input placeholder="Type a message..." />
        <button>Send</button>
      </div>
    </div>
  );
}
