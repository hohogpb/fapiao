import React from "react";
import { AutoComplete } from "../AutoComplete/AutoComplete";

const customers: any[] = [];

/**
 * 默认的过滤器
 * 默认过滤器认为数据源是字符串数组
 * @param dataSource
 * @param keyword
 */
function filter(dataSource: any[], keyword: string) {
  let options = [];
  if (dataSource.length > 0) {
    options = dataSource.filter(
      (option) => option.name.toLowerCase().indexOf(keyword) > -1
    );
  }
  return options;
}

/**
 * 默认的项绘制
 * @param option
 * @returns
 */
function optionRender(option: any) {
  return option?.name;
}

const dataSource = async (keyword: string) => {
  let options: any[] = [];
  if (keyword.length === 0) return options;

  if (dataSource.length > 0) {
    options = customers.filter(
      (option) => option.name.toLowerCase().indexOf(keyword) > -1
    );
  }
  return options;
  // return customers;
};

interface BuyerEditInputProps {
  value?: string;
  onChange?: (value: any, tag: any) => void;
}

export function BuyerEditInput(props: BuyerEditInputProps) {
  return (
    <AutoComplete
      dataSource={dataSource}
      value={props.value}
      onChange={props.onChange}
      filter={filter}
      optionRender={optionRender}
      optionValuer={optionRender}
    />
  );
}
