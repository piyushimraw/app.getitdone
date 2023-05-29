import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Get it done",
  description: "Todo app with project management features",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen w-screen rainbow-mesh p6 flex justify-center items-center">
        {children}
      </body>
    </html>
  );
}
