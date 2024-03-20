import React, { forwardRef, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./Popover.module.scss";

interface AutoCompleteDropdownProps {
  children?: React.ReactNode;
  targetEl?: HTMLInputElement | HTMLDivElement | null;
  className?: string;
  style?: React.CSSProperties;
}

export const Popover = forwardRef<HTMLDivElement, AutoCompleteDropdownProps>(
  (props, ref) => {
    const refDropdown = useRef<HTMLDivElement>(null);
    const { children, targetEl, ...rest } = props;

    useLayoutEffect(() => {
      console.log("mount");
      if (!refDropdown.current) return;
      if (!targetEl) return;

      const rect = targetEl.getBoundingClientRect();

      const left = rect.left;
      const top = rect.top + rect.height;
      const width = rect.width;
      const padding = 10;

      refDropdown.current.style.position = "absolute";
      refDropdown.current.style.top = `${top + padding}px`;
      refDropdown.current.style.left = `${left}px`;
      refDropdown.current.style.width = `${width}px`;
    }, [targetEl]);

    function setRefs(dom: any) {
      (refDropdown as React.MutableRefObject<HTMLElement | null>).current = dom;
      (ref as React.MutableRefObject<HTMLElement | null>).current = dom;
    }

    return createPortal(
      <div className={styles.popover} ref={setRefs} {...rest}>
        {children}
      </div>,
      document.body
    );
  }
);
