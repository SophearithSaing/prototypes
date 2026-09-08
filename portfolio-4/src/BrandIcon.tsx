import { Infinity, Layers3 } from "lucide-react";
import type { SkillName } from "./data";

export default function BrandIcon({
  name,
  size = 28,
}: {
  name: SkillName;
  size?: number;
}) {
  if (name === "System design")
    return <Layers3 size={size} strokeWidth={1.3} aria-hidden="true" />;
  if (name === "CI/CD")
    return <Infinity size={size} strokeWidth={1.3} aria-hidden="true" />;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      aria-hidden="true"
    >
      {name === "React" && (
        <>
          <ellipse cx="16" cy="16" rx="14" ry="5.4" />
          <ellipse
            cx="16"
            cy="16"
            rx="14"
            ry="5.4"
            transform="rotate(60 16 16)"
          />
          <ellipse
            cx="16"
            cy="16"
            rx="14"
            ry="5.4"
            transform="rotate(120 16 16)"
          />
          <circle cx="16" cy="16" r="2.1" fill="currentColor" stroke="none" />
        </>
      )}
      {name === "TypeScript" && (
        <>
          <rect x="3" y="3" width="26" height="26" rx="2" />
          <path
            d="M8 12h9m-4.5 0v12m12-10.5c-1-2.8-6.5-2-6 1.2.5 2.8 6.8 1.8 6 5.7-.5 2.8-5.9 3.1-6.9.4"
            strokeWidth="1.9"
          />
        </>
      )}
      {name === "Node.js" && (
        <>
          <path d="m16 2 12.1 7v14L16 30 3.9 23V9Z" />
          <path
            d="M12 10v10c0 3-4 3-4 0m15-8c-1.7-3.4-7-1.5-5.6 1.5 1.1 2.2 6.8 1.5 5.7 5.2-.8 2.7-5.8 2.8-6.7-.1"
            strokeWidth="1.6"
          />
        </>
      )}
      {name === "Three.js" && (
        <>
          <path
            d="m3 3 26 3-11 24L3 3Zm0 0 15 27 1-20L3 3Zm16 7 10-4M10 16l9-6 4.7 7.5M10 16l13.7 1.5"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  );
}
