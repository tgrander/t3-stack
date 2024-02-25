import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import ArrowUpIcon from "@heroicons/react/20/solid/ArrowUpIcon";

export function Messenger() {
  return (
    <div className="flex h-full flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto">{/* Messages go here */}</div>

      {/* Text Input with Button */}
      <div className="relative flex items-end p-4">
        <Textarea
          className="form-textarea min-h-[60px] w-full resize-none overflow-hidden rounded-md border pb-2 pl-3 pr-16 pt-2 text-lg"
          placeholder="Send a message to Debate King..."
          rows={1}
          // Implement auto-resizing of textarea based on content
        ></Textarea>
        <Button size="sm" className="absolute bottom-7 right-7">
          <ArrowUpIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
