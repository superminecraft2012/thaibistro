export default function GoldOrnament({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-tb-gold/40" />
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-tb-gold/70 shrink-0">
        <path d="M10 1 L13 7 L19 7 L14.5 11 L16.5 17 L10 13.5 L3.5 17 L5.5 11 L1 7 L7 7 Z" fill="currentColor" />
      </svg>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-tb-gold/40" />
    </div>
  )
}
