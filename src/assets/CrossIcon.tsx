import React from "react";

type CrossIconProps = {
  className?: string;
  onClick?: () => void;
  visible?: boolean;
  style?: React.CSSProperties;
};
function CrossIcon({
  className = "",
  onClick,
  visible = false,
  style,
}: CrossIconProps) {
  return visible ? (
    <div
      onClick={() => {
        typeof onClick === "function" && onClick();
      }}
      title="Clear"
      className={`cross-icon hand-cursor ${className}`}
      style={style}
    >
      &#x2715;
    </div>
  ) : null;
}
export default CrossIcon;
