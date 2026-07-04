interface AvatarProps {
  initials: string;
  color: string;
  size?: number;
  className?: string;
}

export function Avatar({ initials, color, size = 48, className = "" }: AvatarProps) {
  return (
    <div
      className={["flex items-center justify-center rounded-full font-semibold text-white shrink-0", className].join(" ")}
      style={{ backgroundColor: color, width: size, height: size, fontSize: size * 0.36 }}
    >
      {initials}
    </div>
  );
}
