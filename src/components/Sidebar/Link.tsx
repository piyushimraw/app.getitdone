"use client";

import Link from "next/link";
import { Settings, User, Grid, Calendar } from "react-feather";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const icons = {
  Settings,
  User,
  Grid,
  Calendar,
};

export type LinkIconTypes = keyof typeof icons;

export interface Link {
  to: string;
  icon: LinkIconTypes;
  label: string;
}

const SideBarLink = ({ link }: { link: Link }) => {
  const pathname = usePathname();
  let isActive = false;

  if (pathname === link.to) {
    isActive = true;
  }

  const Icon = icons[link.icon];

  return (
    <Link href={link.to}>
      <Icon
        size={40}
        className={clsx(
          "stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out",
          isActive && "stroke-violet-600"
        )}
      />
    </Link>
  );
};

export default SideBarLink;
