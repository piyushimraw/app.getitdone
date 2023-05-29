import clsx from "clsx";
import { PropsWithChildren } from "react";

const Card = ({
  className,
  children,
  ...props
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <div
      className={clsx(
        "rounded-3xl px-10 py-4 drop-shadow-xl bg-white",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
