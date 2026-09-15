function Button({
  children,
  variant = "primary",
  size = "medium",
  type = "button",
  onClick,
  disabled = false,
  className = "",
}) {
  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary-dark",
    secondary:
      "border border-primary/15 bg-white text-text hover:border-primary hover:bg-soft-pink",
    ghost:
      "bg-transparent text-primary hover:bg-soft-pink",
  };

  const sizes = {
    small: "px-4 py-2 text-sm",
    medium: "px-5 py-3 text-sm",
    large: "px-6 py-3.5 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center
        rounded-[12px]
        font-semibold
        transition
        duration-200
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;