import "./globals.css";

export const metadata = {
  title: "Get it done",
  description: "Todo app with project management features",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" data-theme="bumblebee">
      <body className="flex items-center justify-center w-screen h-screen rainbow-mesh p6">
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
