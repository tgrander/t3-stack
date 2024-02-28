// "use client";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// import { Button } from "~/components/ui/button";
// import { Textarea } from "~/components/ui/textarea";
// import ArrowUpIcon from "@heroicons/react/20/solid/ArrowUpIcon";
// import { api } from "~/trpc/react";

// import { useCompletion } from 'ai/react';

// const guestSessionId = "6a5ae9b1-5d6c-4932-9838-08e156a332ae";

'use client';
 
import { useChat } from 'ai/react';
 
export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map(m => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content}
        </div>
      ))}
 
      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}

// export default function SendMessage() {
//   const router = useRouter();

//   // SEND MESSAGE
//   const [message, setMessage] = useState("");

//   const { mutate, isLoading } = api.chat.createChatWithMessage.useMutation({
//     onSuccess: () => {
//       router.refresh();
//     },
//   });
//   const sendMessage = () => mutate({ message, guestSessionId });

//   // STREAM MESSAGE RESPONSE
//   const { completion, input, handleInputChange, handleSubmit, error, data } =
//     useCompletion({api: "/chat"});

//   return (
//     <div className="flex flex-1">
//           <div className="w-full">
//             <div className="flex h-full flex-col p-6">
//               <h2 className=" text-xl font-medium mb-4">
//                 Chat with Robin Williams
//               </h2>
//               {/* {data && (
//         <pre className="p-4 text-sm bg-gray-100">
//           {JSON.stringify(data, null, 2)}
//         </pre>
//       )} */}
//       {error && (
//         <div className="fixed top-0 left-0 w-full p-4 text-center bg-red-500 text-white">
//           {error.message}
//         </div>
//       )}
//               <div className="flex-1 overflow-y-auto">
//               {completion}
//               </div>
//               <div className="relative flex items-end p-4">
//               <form
//       className="w-full"
//       // onSubmit={(e) => {
//       //   e.preventDefault();
//       //   sendMessage();
//       // }}
//       onSubmit={handleSubmit}
//     >
//       <Textarea
//         className="form-textarea min-h-[60px] w-full resize-none overflow-hidden rounded-md border pb-2 pl-3 pr-16 pt-2 text-lg"
//         placeholder="Send a message to Debate King..."
//         rows={1}
//         value={input}
//         onChange={handleInputChange}
//         // onKeyDown={(e) => {
//         //   if (isLoading) return;
//         //   if (e.key === "Enter") {
//         //     e.preventDefault();
            
//         //   }
//         // }}
//       />
//       <Button
//         type="submit"
//         size="sm"
//         className="absolute bottom-7 right-7"
//         disabled={isLoading}
//       >
//         <ArrowUpIcon className="h-4 w-4" />
//       </Button>
//     </form>
//               </div>
//             </div>
//           </div>
//         </div>
//   );
// }
