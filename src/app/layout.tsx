import { trpc } from "@/lib/trpc";
import "./globals.css";

export const metadata = {
  title: "Get it done",
  description: "Todo app with project management features",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="h-screen w-screen rainbow-mesh p6 flex justify-center items-center">
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
