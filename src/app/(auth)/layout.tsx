import GlassPane from "@/components/GlassPane";
import { PropsWithChildren } from "react";

export const metadata = {
  title: "Login",
  description: "Please login to continue",
};
export default function AuthRootLayout({ children }: PropsWithChildren<{}>) {
  return (
    <body className="h-screen w-screen rainbow-mesh p6">
      <GlassPane className="w-full h-full flex justify-center items-center">
        {children}
      </GlassPane>
    </body>
  );
}
