import type { ButtonHTMLAttributes } from "react";
import "./Button.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /* The room's own variant: no fill, a lit label. */
  quiet?: boolean;
};

export function Button({ type = "button", quiet, ...rest }: ButtonProps) {
  return (
    <button
      type={type}
      className={quiet ? "button button-quiet" : "button"}
      {...rest}
    />
  );
}
