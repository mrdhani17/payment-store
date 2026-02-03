export default function PaymentButton({
  icon,
  label,
  href = "#",
  isExternal = false,
  onClick,
}) {
  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };
  const content = (
    <>
      <div className="flex items-center gap-4">
        {typeof icon === "object" ? (
          icon
        ) : (
          <div className="w-8 h-8 bg-white/5 border border-white/20 rounded-lg flex items-center justify-center">
            <span className={`material-icons text-white text-lg`}>{icon}</span>
          </div>
        )}
        <span className="font-medium tracking-wide uppercase text-sm">
          {label}
        </span>
      </div>
      <span className="material-icons text-primary/40 group-hover:text-primary transition-colors">
        {isExternal ? "launch" : "chevron_right"}
      </span>
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-cyber group"
        onClick={handleClick}
      >
        {content}
      </a>
    );
  }

  return (
    <a href={href} className="btn-cyber group" onClick={handleClick}>
      {content}
    </a>
  );
}
