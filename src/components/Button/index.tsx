import { PropsWithChildren } from "react";
import { cva, VariantProps } from "class-variance-authority";

const buttonClasses = cva(
  [
    "rounded-3xl",
    "font-bold",
    "hover:scale-110",
    "active:scale-100",
    "transition",
    "duration-200",
    "ease-in-out",
  ],
  {
    variants: {
      intent: {
        primary: ["bg-primary", "hover:bg-primary"],
        secondary: ["bg-white", "hover:bg-secondary"],
        text: ["bg-transparent", "text-black"],
      },
      size: {
        small: ["text-md", "py-1", "px-2"],
        medium: ["text-lg", "px-6", "py-2"],
        large: ["text-xlg", "px-8", "py-4"],
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "medium",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonClasses> {}

const Button = ({
  children,
  className,
  intent,
  size,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button className={buttonClasses({ intent, size, className })} {...props}>
      {children}
    </button>
  );
};

export { Button };
