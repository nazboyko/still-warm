import type { ButtonHTMLAttributes } from "react";
import "./Button.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ type = "button", ...rest }: ButtonProps) {
  return <button type={type} className="button" {...rest} />;
}
