import type { SVGProps } from "react";

export function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: string }) {
  const common = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, ...props };
  const paths: Record<string, React.ReactNode> = {
    phone: <><path d="M5 4h3l2 5-2 1.5a15 15 0 0 0 5.5 5.5L15 14l5 2v3a2 2 0 0 1-2 2C9.7 20.5 3.5 14.3 3 6a2 2 0 0 1 2-2Z" /></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    arrow: <><path d="M5 12h14M14 7l5 5-5 5" /></>,
    check: <><path d="m5 12 4 4L19 6" /></>,
    implant: <><path d="M9 3h6l1 4-2 2 1 3-3 9-3-9 1-3-2-2 1-4Z" /></>,
    sparkle: <><path d="m12 2 1.7 5.3L19 9l-5.3 1.7L12 16l-1.7-5.3L5 9l5.3-1.7L12 2Z" /><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" /></>,
    align: <><path d="M7 4c2 2 8 2 10 0M6 8c2 2 10 2 12 0M6 12c2 2 10 2 12 0M7 16c2 2 8 2 10 0M9 20c1 1 5 1 6 0" /></>,
    family: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="10" r="2" /><path d="M3 20a6 6 0 0 1 12 0M14 20a4 4 0 0 1 8 0" /></>,
    shield: <><path d="M12 3 5 6v5c0 4.8 2.8 8.2 7 10 4.2-1.8 7-5.2 7-10V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></>,
    tooth: <><path d="M7 3c-2.2.8-3 3-2.2 5.3.8 2.4 2.3 3.2 2.7 6.7.3 2.8.8 6 2.5 6 1.3 0 1.2-4.5 2-4.5s.7 4.5 2 4.5c1.7 0 2.2-3.2 2.5-6 .4-3.5 1.9-4.3 2.7-6.7C20 6 19.2 3.8 17 3c-2.2-.8-3.4 1-5 1S9.2 2.2 7 3Z" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    facebook: <><path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v6h4v-6h3l1-4h-4V9c0-.6.4-1 1-1Z" /></>,
    tiktok: <><path d="M15 4c.5 2.3 1.8 3.7 4 4v3c-1.5 0-2.8-.4-4-1.2V16a5 5 0 1 1-5-5h1v3a2 2 0 1 0 1 2V4h3Z" /></>,
    youtube: <><path d="M21 8.2a2.8 2.8 0 0 0-2-2C17.2 5.7 12 5.7 12 5.7s-5.2 0-7 .5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2.5 12 29 29 0 0 0 3 15.8a2.8 2.8 0 0 0 2 2c1.8.5 7 .5 7 .5s5.2 0 7-.5a2.8 2.8 0 0 0 2-2 29 29 0 0 0 .5-3.8 29 29 0 0 0-.5-3.8Z" /><path d="m10 15 5-3-5-3v6Z" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
    edit: <><path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4Z" /><path d="m13.5 6.5 4 4" /></>,
    trash: <><path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14M10 11v6M14 11v6" /></>,
    upload: <><path d="M12 16V4M7 9l5-5 5 5" /><path d="M5 14v6h14v-6" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    save: <><path d="M5 4h12l2 2v14H5zM8 4v6h8V4M8 20v-6h8v6" /></>,
  };
  return <svg aria-hidden="true" {...common}>{paths[name] || paths.tooth}</svg>;
}
