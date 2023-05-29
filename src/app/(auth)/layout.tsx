import GlassPane from "@/components/GlassPane";
import { PropsWithChildren } from "react";

export const metadata = {
  title: "Login",
  description: "Please login to continue",
};
export default function AuthRootLayout({ children }: PropsWithChildren<{}>) {
  return (
    <GlassPane className="flex justify-center items-center h-96p w-96p">
      {children}
    </GlassPane>
  );
}
