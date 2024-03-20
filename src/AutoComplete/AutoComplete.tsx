import React, { useEffect, useRef, useState } from "react";
import styles from "./AutoComplete.module.scss";
import { useMouseDown } from "../useMouseDown/useMouseDown";
import { Popover } from "../Popover/Popover";
import scrollIntoView from "scroll-into-view-if-needed";

const AutoCompleteOption = (props: any) => {
  const { active, children, ...rest } = props;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    if (active) {
      scrollIntoView(ref.current, {
        scrollMode: "if-needed",
        behavior: "smooth",
      });
    }
  }, [active]);

  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  );
};

interface AutoCompleteOptions {
  dataSource: any[] | ((keyword: string) => Promise<any[]>);
  value?: any;
  onChange?: (value: any, option?: any) => void;
  filter?: (dataSource: any[], keyword: string) => any[];
  optionRender?: (option: any) => React.ReactNode;
  optionValuer?: (option: any) => string;
  inputStyle?: React.CSSProperties;
}

/**
 * 默认的过滤器
 * 默认过滤器认为数据源是字符串数组
 * @param dataSource
 * @param keyword
 */
function defaultFilter(dataSource: any[], keyword: string) {
  let options = [];
  if (dataSource.length > 0) {
    options = dataSource.filter(
      (item) => `${item}`.toLowerCase().indexOf(keyword) > -1
    );
  }
  return options;
}

/**
 * 默认的项绘制
 * @param option
 * @returns
 */
function defaultOptionRender(option: any) {
  return option;
}

/**
 * 默认的值渲染器
 * @param option
 * @returns
 */
function defaultOptionValuer(option: any) {
  return option;
}

function useDebounce() {
  const debounceTimeoutRef = useRef<any>();

  function exec(fn: () => void) {
    // 清除上一个定时器
    clearTimeout(debounceTimeoutRef.current);

    // 设置新的定时器
    debounceTimeoutRef.current = setTimeout(fn, 300);
    // 300ms 防抖延迟，你可以根据需要调整
  }

  return { exec };
}

export const AutoComplete = (props: AutoCompleteOptions) => {
  const refTarget = useRef<HTMLInputElement>(null);
  const refDropdown = useRef<HTMLInputElement>(null);

  const [options, setOptions] = useState<any[]>([]);
  const [optionIndex, setOptionIndex] = useState(0);
  const [optionsActive, setOptionsActive] = useState(false);
  const [value, setValue] = useState(props.value);

  // 使用默认或者传入的过滤器
  const filter = props.filter || defaultFilter;
  // 内容渲染器
  const optionRender = props.optionRender || defaultOptionRender;
  // input渲染器
  const optionValuer = props.optionValuer || defaultOptionValuer;

  const onInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.currentTarget.value;
    setValue(keyword);

    let dataSource;
    if (props.dataSource instanceof Function) {
      dataSource = await props.dataSource(keyword);
    } else {
      dataSource = props.dataSource;
    }

    const filterOptions = filter(dataSource, keyword);
    if (filterOptions.length > 0) {
      setOptions(filterOptions);
      setOptionsActive(true);
    } else {
      setOptionsActive(false);
    }

    triggerChange(keyword);
  };

  const onInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      if (optionIndex === 0) {
        setOptionIndex(options.length - 1);
        return;
      }
      setOptionIndex(optionIndex - 1);
    } else if (e.key === "ArrowDown") {
      // 如果该项当前不可见，需要进行处理,让其可见
      if (optionIndex >= options.length - 1) {
        setOptionIndex(0);
        return;
      }
      setOptionIndex(optionIndex + 1);
    } else if (e.key === "Enter") {
      const option = options[optionIndex];
      const val = optionValuer(option);
      setValue(val);
      triggerChange(val, option);

      setOptionIndex(0);
      setOptionsActive(false);
    } else if (e.key === "Escape") {
      setOptionsActive(false);
    }
  };

  const onOptionClick = (option: any) => {
    const val = optionValuer(option);
    setValue(val);
    triggerChange(val, option);

    setOptionsActive(false);
    setOptionIndex(0);
  };

  useMouseDown((event: MouseEvent) => {
    const elements = [refTarget.current, refDropdown.current];
    if (elements.every((el) => !el?.contains(event.target as Node)))
      setOptionsActive(false);
  });

  // const debounce = useDebounce();

  function triggerChange(value: string, option?: any) {
    //debounce.exec(() => {
      props.onChange?.(value, option);
    //});
  }

  return (
    <>
      <input
        type="text"
        ref={refTarget}
        className={styles.input}
        title={value}
        value={value}
        onChange={onInputChange}
        onKeyDown={onInputKeyDown}
        style={props.inputStyle}
        autoFocus
      />

      {optionsActive && (
        <Popover targetEl={refTarget.current} ref={refDropdown}>
          {options.map((option, index) => {
            const active = index === optionIndex;
            return (
              <AutoCompleteOption
                className={styles.dropdownoption}
                {...(active && {
                  style: { background: "#d8dce1" },
                })}
                active={active}
                key={index}
                onClick={(e: any) => onOptionClick(option)}
              >
                {optionRender(option)}
              </AutoCompleteOption>
            );
          })}
        </Popover>
      )}
    </>
  );
};
