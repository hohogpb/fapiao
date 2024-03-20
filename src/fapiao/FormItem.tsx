import React, { memo } from "react";

function FormItem(props: any) {
  const { label, children, style } = props;

  return (
    <div style={{ ...style, display: "flex", alignItems: "center" }}>
      <div
        style={{
          flex: "0 0 10em", // 0 - 不拉长（flex-grow）0 - 不缩短（flex-shrink）200px - 开始于 10em（flex-basis)
          display: "inline-flex",
          justifyContent: "end",
          whiteSpace: "nowrap",
          overflow: "hidden",
          alignItems: "center",
        }}
      >
        {label}：
      </div>

      <div style={{ flex: "auto", display: "flex", alignItems: "center" }}>
        {children}
      </div>
    </div>
  );
}

export default memo(FormItem);
