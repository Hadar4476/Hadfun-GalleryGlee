import React from "react";

const Input = ({
  name,
  label,
  background,
  color,
  border,
  autoComplete,
  errorColor,
  error,
  ...rest
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        className="form-control"
        id={name}
        name={name}
        style={{ background: background, color: color, borderColor: border }}
        autoComplete={autoComplete}
      />
      {error && <span className={errorColor}>* {error} *</span>}
    </div>
  );
};

export default Input;
