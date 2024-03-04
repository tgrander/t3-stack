import { PersonaNavButtonLink } from "./chat-sidebar-nav/";
import { PersonaSchemaType } from "~/schema";

interface Props {
  items: PersonaSchemaType[];
}

export const ChatsSidebarNav: React.FC<Props> = ({ items }) => {
  return (
    <div
      id="sidebar-wrapper"
      className="hidde md:fixed md:inset-y-0 md:z-50 md:flex md:w-72 md:flex-col"
    >
      <div
        id="sidebar-content"
        className="my-2 ml-2 h-full rounded-2xl bg-white drop-shadow"
      >
        <ul role="list" className="mx-2 my-2 space-y-2">
          {items.map((p) => (
            <li key={p.id}>
              <PersonaNavButtonLink persona={p} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
