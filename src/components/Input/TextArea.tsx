import clsx from "clsx";
import { TextareaHTMLAttributes } from "react";

export interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  labelClassName: string;
}

const TextArea = ({ label, className, labelClassName, ...props }: Props) => {
  return (
    <>
      {label && (
        <div className={clsx("mb-1 ml-2 text-xl ", labelClassName)}>
          {label}
        </div>
      )}
      <textarea
        className={clsx(
          "border-solid border-gray border-2 px-6 py-2 text-lg  w-full h-64",
          className
        )}
        {...props}
      />
    </>
  );
};
export { TextArea };
