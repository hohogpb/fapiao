import React, { memo } from "react";
import styles from "./FormItem.module.css";

function FormItem(props: any) {
  const { label, children, style } = props;

  return (
    <div className={styles.formItem} style={style}>
      
    </div>
  );
}

export default memo(FormItem);
