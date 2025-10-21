import { LoaderIcon } from "lucide-react";

export default function Loader({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <LoaderIcon
      className={`animate-spin${className ? " " + className : ""}`}
      size={size}
    />
  );
}
