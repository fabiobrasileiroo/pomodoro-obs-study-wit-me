interface WaveIconProps {
  type: "pomodoro" | "break"
}

export function WaveIcon({ type }: WaveIconProps) {
  return (
    <div className="flex items-center justify-center">
      <img
        src="/images/17da052ce4c87426c416b66a85fecb16.jpg"
        alt="Great Wave"
        className={`h-56 w-56 rounded-full object-cover transition-opacity ${
          type === "break" ? "opacity-100" : "opacity-90"
        }`}
      />
    </div>
  )
}
