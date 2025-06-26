import type { SVGProps } from "react";

export function FlowerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 5.2c1.4-2.4 3.8-4 6.5-4C20.9-1.3 23.3.8 24 3.5c-2.4-1.4-5-1.4-7.4 0-.3-1.2-1-2.3-1.9-3.3M12 5.2c-1.4-2.4-3.8-4-6.5-4C3.1-1.3.8.8 0 3.5c2.4-1.4 5-1.4 7.4 0 .3-1.2 1-2.3 1.9-3.3" />
      <path d="M12 21.8c1.4 2.4 3.8 4 6.5 4c2.4-2.5 2.4-5 0-7.4-1.2.3-2.3 1-3.3 1.9M12 21.8c-1.4 2.4-3.8 4-6.5 4c-2.4-2.5-2.4-5 0-7.4 1.2.3 2.3 1 3.3 1.9" />
      <path d="M5.2 12c-2.4-1.4-4-3.8-4-6.5C-1.3 3.1.8.8 3.5 0c1.4 2.4 1.4 5 0 7.4-1.2-.3-2.3-1-3.3-1.9M21.8 12c2.4-1.4 4-3.8 4-6.5c2.5 2.4 2.5 4.9 0 7.4-1.2-.3-2.3-1-3.3-1.9" />
      <path d="M5.2 12c-2.4 1.4-4 3.8-4 6.5C-1.3 20.9.8 23.3 3.5 24c1.4-2.4 1.4-5 0-7.4.9-1 2.1-1.6 3.3-1.9M21.8 12c2.4 1.4 4 3.8 4 6.5c2.5-2.4 2.5-4.9 0-7.4-.9-1-2.1-1.6-3.3-1.9" />
      <circle cx="12" cy="12" r="2.8" />
    </svg>
  );
}

export function SparkleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
        <path d="M12 3L13.82 8.18L19 10L13.82 11.82L12 17L10.18 11.82L5 10L10.18 8.18L12 3Z" />
        <path d="M4 20L5 17L8 16L5 15L4 12L3 15L0 16L3 17L4 20Z" />
        <path d="M20 5L19 8L16 9L19 10L20 13L21 10L24 9L21 8L20 5Z" />
    </svg>
  );
}
