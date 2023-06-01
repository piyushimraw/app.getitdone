import clsx from "clsx";
import { PropsWithChildren, InputHTMLAttributes } from "react";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
const Input = ({ className, label, ...props }: PropsWithChildren<Props>) => {
  return (
    <>
      {label && <div className="mb-1 ml-2 text-xl ">{label}</div>}
      <input
        className={clsx(
          "border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full",
          className
        )}
        {...props}
      />
    </>
  );
};

export default Input;
