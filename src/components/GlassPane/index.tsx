import { PropsWithChildren } from "react";
import clsx from "clsx";

function GlassPane({
  children,
  className,
}: PropsWithChildren<{
  className?: string;
}>) {
  return (
    <div className={clsx("glass rounded-2xl border-solid border-2", className)}>
      {children}
    </div>
  );
}

export default GlassPane;
