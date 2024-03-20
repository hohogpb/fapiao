import React, { memo } from 'react';
import { AutoComplete } from '../AutoComplete/AutoComplete';

const goods: any[] = [];

const inputStyle: React.CSSProperties = {
  boxSizing: 'border-box',
  border: 'none',
  outline: 'none',
  fontSize: 'inherit',
  fontFamily: 'inherit',
  margin: 0,
  padding: '6px 11px',
  width: '100%',
  height: '100%',
  boxShadow: 'inset 0 0 0 2px #5292f7',
  borderRadius: 0,
};

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
      option => option.name.toLowerCase().indexOf(keyword) > -1
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

interface GoodsNameEditInputProps {
  value?: string;
  onChange?: (value: any) => void;
}

const dataSource = async (keyword: string) => {
  let options: any[] = [];

  if (keyword.length === 0) return options;

  if (goods.length > 0) {
    options = goods.filter(
      option => option.name.toLowerCase().indexOf(keyword) > -1
    );
  }
  return options;
  // return customers;
};

export const GoodsNameEditInput = (props: GoodsNameEditInputProps) => {
  return (
    <AutoComplete
      dataSource={dataSource}
      value={props.value}
      onChange={props.onChange}
      filter={filter}
      optionRender={optionRender}
      optionValuer={optionRender}
      inputStyle={inputStyle}
    />
  );
};
