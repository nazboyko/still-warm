import type { ButtonHTMLAttributes } from "react";
import "./Button.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ type = "button", className, ...rest }: ButtonProps) {
  return (
    <button
      type={type}
      className={className ? `button ${className}` : "button"}
      {...rest}
    />
  );
}
