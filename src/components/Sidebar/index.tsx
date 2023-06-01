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
    to: "/",
  },
  {
    label: "Profile",
    icon: "User",
    to: "/",
  },
  {
    label: "Settings",
    icon: "Settings",
    to: "/",
  },
];

const SideBar = () => {
  return (
    <Card className="flex flex-col flex-wrap items-center justify-around w-40 h-full mr-4">
      {links.map((link) => (
        <SidebarLink link={link} key={link.to} />
      ))}
    </Card>
  );
};

export default SideBar;
