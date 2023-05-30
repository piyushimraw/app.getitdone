import Card from "../Card";
import SidebarLink, { Link } from "./Link";

const links: Array<Link> = [
  {
    label: "Home",
    icon: "Grid",
    to: "/home",
  },
  {
    label: "Calendar",
    icon: "Calendar",
    to: "/calendar",
  },
  {
    label: "Profile",
    icon: "User",
    to: "/profile",
  },
  {
    label: "Settings",
    icon: "Settings",
    to: "/settings",
  },
];

const SideBar = () => {
  return (
    <Card className="h-full w-40 flex items-center justify-between flex-wrap mr-4">
      {links.map((link) => (
        <SidebarLink link={link} key={link.to} />
      ))}
    </Card>
  );
};

export default SideBar;
