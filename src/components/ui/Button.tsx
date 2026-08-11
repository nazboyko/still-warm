import type { ButtonHTMLAttributes } from "react";
import "./Button.css";

export function Button({
  type = "button",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type={type} className="button" {...rest} />;
}
