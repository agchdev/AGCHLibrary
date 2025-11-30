"use client";
import React  from 'react';

const Button = ({ children, variant = "primary", style, ...props }) => {
  const baseStyle = {
    padding: "0.5rem 1rem",
    borderRadius: "9999px",
    border: "none",
    fontWeight: 500,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    fontSize: "0.9rem"
  };

  const variants = {
    primary: {
      backgroundColor: "#111827",
      color: "#f9fafb"
    },
    outline: {
      backgroundColor: "transparent",
      color: "#111827",
      border: "1px solid #d1d5db"
    }
  };

  const finalStyle = {
    ...baseStyle,
    ...(variants[variant] || variants.primary),
    ...style
  };

  return (
    <button style={finalStyle} {...props}>
      {children}
    </button>
  );
};

export default Button;
