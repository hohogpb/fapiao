import React, { useState } from "react";

let radioId = 0;

interface RadioGroupProps {
  name?: string;
  value?: any;
  onChange?: (value: any) => void;
  children?: React.ReactNode;
}

export const RadioGroup = (props: RadioGroupProps) => {
  const [selectedValue, setSelectedValue] = useState(props.value); // 设置默认值

  const onRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange?.(event.target.value);
  };

  //const name = props.name || `radio_${radioId++}`;

  // 使用React.Children.map遍历子元素，并为每个子元素添加额外的props
  const radioButtons = React.Children.map(props.children, (child) => {
    if (!React.isValidElement(child)) return null;

    return React.cloneElement<any>(child, {
      onChange: onRadioChange,
      checked: child.props.value === props.value,
      name: props.name,
    });
  });

  return <div>{radioButtons}</div>;
};
