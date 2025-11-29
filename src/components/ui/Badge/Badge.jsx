import React from "react";

const Badge = ({ children, variant = "neutral", style, ...props }) => {
  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    padding: "0.2rem 0.6rem",
    borderRadius: "9999px",
    fontSize: "0.75rem",
    fontWeight: 500
  };

  const variants = {
    neutral: {
      backgroundColor: "#e5e7eb",
      color: "#111827"
    },
    success: {
      backgroundColor: "#dcfce7",
      color: "#166534"
    },
    danger: {
      backgroundColor: "#fee2e2",
      color: "#b91c1c"
    }
  };

  const finalStyle = {
    ...baseStyle,
    ...(variants[variant] || variants.neutral),
    ...style
  };

  return (
    <span style={finalStyle} {...props}>
      {children}
    </span>
  );
};

export default Badge;
