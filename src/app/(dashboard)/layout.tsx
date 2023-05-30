import GlassPane from "@/components/GlassPane";
import SideBar from "@/components/Sidebar";
import { PropsWithChildren } from "react";

export default function AuthRootLayout({ children }: PropsWithChildren<{}>) {
  return (
    <GlassPane className="flex justify-center items-center h-96p w-96p">
      <SideBar />
      {children}
    </GlassPane>
  );
}
