import React, { ReactNode } from "react";

interface FlexProps {
  flexs?: any[];
  children: ReactNode;
  style?: React.CSSProperties;
  gap?: number;  
}

export function Flex(props: FlexProps) {
  const { flexs, children, style, gap } = props;

  const items = React.Children.map(children, (child, idx) => {
    const flex = flexs?.[idx] || 1;
    return <div style={{ flex: flex }}>{child}</div>;
  });

  return (
    <div
      style={{
        width: "100%",
        ...style,
        ...(gap && { gap }),
        display: "flex",
        alignItems: "center"
      }}
    >
      {items}
    </div>
  );
}

/*

const z = React.Children.map(children, (child) => {
    // Process each child element
    console.log("a prop:", child)

    return child; // You can return the modified child or perform other actions
  })

  */
