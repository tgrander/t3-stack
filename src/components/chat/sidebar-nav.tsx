import { SidebarItem } from "./sidebar-nav/";
import { PersonaSchemaType } from "~/schema";
import { Card, CardContent } from "~/components/ui/card";

interface Props {
  items: PersonaSchemaType[];
}

export const SidebarNav: React.FC<Props> = ({ items }) => {
  return (
    <Card className="flex flex-1 flex-col">
      <CardContent className="p-4">
        <ul role="list" className="space-y-1">
          {items.map((p) => (
            <li key={p.id}>
              <SidebarItem persona={p} />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
