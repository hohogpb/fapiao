import React, { memo } from "react";
import styles from "./Select.module.scss";
import { SelectOption } from "./SelectOption";

export function Select(props: any) {
  const { title, children, value } = props;

  function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    props.onChange?.(event.target.value);
  }

  return (
    <div className={styles.wrap}>
      <select title={title} onChange={onChange} value={value}>
        {children}
      </select>
    </div>
  );
}

Select.Option = SelectOption;
