import Decimal from 'decimal.js';
import dxrmb from 'dxrmb';
import HTableLayout from 'kbjtable';
import { KbjTableProviderRefProp } from 'kbjtable/dist/KbjTableContext';
import 'kbjtable/dist/kbjtable.cjs.development.css';
import { KbjTableCellDetail, KbjTableColumn } from 'kbjtable/dist/types';
import React, { useMemo, useRef, useState } from 'react';
import { Flex } from '../Flex';
import Input from '../Input/input';
import { Radio } from '../Radio';
import { Select } from '../Select';
import { BuyerEditInput } from './BuyerEditInput';
import FormItem from './FormItem';
import { GoodsNameEditInput } from './GoodsNameEditInput';

interface FapiaoGoods {
  id?: string;
  name?: string;
  models?: string;
  unit?: string;
  total?: string;
  price?: string;
  totalPrice?: string;
  taxCode?: string;
  taxType?: string | null;
  taxRate?: string;
  taxAmount?: string;
  discount?: string | null;
  fapiaoId?: string;
  NAVICAT_ROWID?: number;
}

export function Fapiao(props: any) {
  const [buyerType, setBuyerType] = useState<any>();
  const [invoiceType, setInvoiceType] = useState<any>();

  const [buyerName, setBuyerName] = useState<string>();
  const [buyerTaxNum, setBuyerTaxNum] = useState<string>();
  const [buyerAddress, setBuyerAddress] = useState<string>();
  const [buyerTel, setBuyerTel] = useState<string>();
  const [buyerBankName, setBuyerBankName] = useState<string>();
  const [buyerBankAccount, setBuyerBankAccount] = useState<string>();

  const [sellerName, setSellerName] = useState<string>();
  const [sellerTaxnum, setSellerTaxnum] = useState<string>();
  const [sellerAddress, setSellerAddress] = useState<string>();
  const [sellerTel, setSellerTel] = useState<string>();
  const [sellerBankName, setSellerBankName] = useState<string>();
  const [sellerBankAccount, setSellerBankAccount] = useState<string>();

  const [extra, setExtra] = useState<string>();
  const [cashier, setCashier] = useState<string>();
  const [checker, setChecker] = useState<string>();
  const [invoicer, setInvoicer] = useState<string>();

  const [goods, setGoods] = useState<FapiaoGoods[]>(props.goods || []);

  const refTable = useRef<KbjTableProviderRefProp>(null);

  const columns: KbjTableColumn[] = [
    {
      title: '货物、服务名称',
      dataIndex: 'name',
      width: '15em',
      editable: true,
      // 要能autocomplete
      editor: GoodsNameEditInput,
    },
    { title: '税目编码', dataIndex: 'taxCode', width: '14em', editable: true },
    { title: '规格型号', dataIndex: 'models', width: '6em', editable: true },
    { title: '单位', dataIndex: 'unit', width: '4em', editable: true },
    {
      title: '数量单价(含税)',
      dataIndex: 'price',
      width: '9em',
      editable: true,
    },
    {
      title: '金额(含税)',
      dataIndex: 'totalPrice',
      width: '7em',
      editable: true,
    },
    {
      title: '税率',
      dataIndex: 'taxRate',
      width: '4em',
      editable: true,
      // 要显示为3% 而且只接受这种形式的 x%
    },
    { title: '税额', dataIndex: 'taxAmount', width: '7em', editable: true },
    {
      title: '操作',
      dataIndex: 'opr',
      render: (value: any, index: number, record: any) => {
        return (
          <a onClick={e => onClickRowDelete(index)} href="javascript: void(0)">
            删除
          </a>
        );
      },
      width: '4em',
      align: 'center',
    },
  ];

  function onClickAddRow() {
    setGoods([...goods, {}]);
  }

  function onClickRowDelete(rowIdx: number) {
    goods.splice(rowIdx, 1);
    setGoods([...goods]);
  }

  function onClickRemoveAll() {
    setGoods([]);
    refTable.current?.setEditingCell(undefined);
    refTable.current?.setSelectedCell(undefined);
  }

  function onChangeCell(value: any, detail: KbjTableCellDetail, tag: any) {
    // console.log("[invoice cell change]：", detail, value, tag);

    if (detail.column.dataIndex === undefined) {
      throw new Error(`detail.column.dataIndex can't be undefine`);
    }

    if (detail.column.dataIndex === 'name') {
      if (tag instanceof Object) {
        Object.assign(goods[detail.rowIdx], { ['taxCode']: tag.taxCode });
      }
    }

    if (detail.column.dataIndex === 'totalPrice') {
      // return;
    }

    Object.assign(goods[detail.rowIdx], { [detail.column.dataIndex]: value });

    setGoods([...goods]);
    // detail.rowIdx,
    // detail.cell.dataIndex
  }

  const totalPrice = useMemo(() => {
    const price = goods.reduce(
      (acc, cur) => acc.add(cur.totalPrice || 0),
      new Decimal(0)
    );
    return price.toString();
  }, [goods]);

  const rmbTotalPrice = dxrmb(totalPrice);

  function onChangeBuyerType(value: any) {
    setBuyerType(value);
  }

  function onChangeInvoiceType(value: any) {
    setInvoiceType(value);
  }

  function onChangeBuyerName(value: any, tag: any) {
    setBuyerName(value);
    if (tag instanceof Object) {
      setBuyerTaxNum(tag.taxNum);
      setBuyerAddress(tag.address);
      setBuyerTel(tag.tel);
      setBuyerBankName(tag.bankName);
      setBuyerBankAccount(tag.bankAccount);
    }
  }

  function onChangeBuyerTaxnum(event: React.ChangeEvent<HTMLInputElement>) {
    setBuyerTaxNum(event.currentTarget.value);
  }

  function onChangeBuyerAddress(event: React.ChangeEvent<HTMLInputElement>) {
    setBuyerAddress(event.currentTarget.value);
  }

  function onChangeBuyerTel(event: React.ChangeEvent<HTMLInputElement>) {
    setBuyerTel(event.currentTarget.value);
  }

  function onChangeBuyerBankName(event: React.ChangeEvent<HTMLInputElement>) {
    setBuyerBankName(event.currentTarget.value);
  }

  function onChangeBuyerBankAccount(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setBuyerBankAccount(event.currentTarget.value);
  }

  function onChangeSellerName(event: React.ChangeEvent<HTMLInputElement>) {
    setSellerName(event.currentTarget.value);
  }

  function onChangeSellerTaxnum(event: React.ChangeEvent<HTMLInputElement>) {
    setSellerTaxnum(event.currentTarget.value);
  }

  function onChangeSellerAddress(event: React.ChangeEvent<HTMLInputElement>) {
    setSellerAddress(event.currentTarget.value);
  }

  function onChangeSellerTel(event: React.ChangeEvent<HTMLInputElement>) {
    setSellerTel(event.currentTarget.value);
  }

  function onChangeSellerBankName(event: React.ChangeEvent<HTMLInputElement>) {
    setSellerBankName(event.currentTarget.value);
  }

  function onChangeSellerBankAccount(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setSellerBankAccount(event.currentTarget.value);
  }

  function onChangeExtra(event: React.ChangeEvent<HTMLInputElement>) {
    setExtra(event.currentTarget.value);
  }

  function onChangeCashier(event: React.ChangeEvent<HTMLInputElement>) {
    setCashier(event.currentTarget.value);
  }

  function onChangeChecker(event: React.ChangeEvent<HTMLInputElement>) {
    setChecker(event.currentTarget.value);
  }

  function onChangeInvoicer(event: React.ChangeEvent<HTMLInputElement>) {
    setInvoicer(event.currentTarget.value);
  }

  return (
    <div
      style={{
        background: 'rgb(235,236,240)',
        fontSize: 12,
        padding: 10,
        borderRadius: 6,
      }}
    >
      <Flex style={{ marginBottom: 6 }} gap={6}>
        <FormItem label="购方类型">
          <Radio.Group value={buyerType} onChange={onChangeBuyerType}>
            <Radio value={'个人'}>个人</Radio>
            <Radio value={'企业'}>企业</Radio>
          </Radio.Group>
        </FormItem>

        <FormItem label="发票类型">
          <Select value={invoiceType} onChange={onChangeInvoiceType}>
            <Select.Option value="増值税电子发票">増值税电子发票</Select.Option>
            <Select.Option value="増值税普通发蔈">増值税普通发蔈</Select.Option>
            <Select.Option value="増值税专用发蔈">増值税专用发蔈</Select.Option>
          </Select>
        </FormItem>
      </Flex>

      <Flex style={{ marginBottom: 6 }} gap={6}>
        <FormItem label="购方名称">
          <BuyerEditInput onChange={onChangeBuyerName} value={buyerName} />
        </FormItem>

        <FormItem label="购方纳税人识别号">
          <Input
            placeholder="请输入购方纳税人识别号"
            onChange={onChangeBuyerTaxnum}
            value={buyerTaxNum}
          />
        </FormItem>
      </Flex>

      <Flex style={{ marginBottom: 6 }} gap={6}>
        <FormItem label="购方地址、电话">
          <Flex gap={6} flexs={['auto', '0 1 8em']}>
            <Input
              placeholder="请输入购方地址"
              onChange={onChangeBuyerAddress}
              value={buyerAddress}
            />
            <Input
              placeholder="请输入电话"
              onChange={onChangeBuyerTel}
              value={buyerTel}
            />
          </Flex>
        </FormItem>

        <FormItem label="购方开户行及账户">
          <Flex gap={6} flexs={['auto', '0 1 10em']}>
            <Input
              placeholder="请输入开户行"
              onChange={onChangeBuyerBankName}
              value={buyerBankName}
            />
            <Input
              placeholder="请输入账户"
              onChange={onChangeBuyerBankAccount}
              value={buyerBankAccount}
            />
          </Flex>
        </FormItem>
      </Flex>

      <div style={{ fontSize: 12, textAlign: 'right', marginBottom: 6 }}>
        <a
          style={{ marginRight: 10, textDecoration: 'none' }}
          onClick={onClickAddRow}
          href="javascript: void(0)"
        >
          添加新行
        </a>

        <a
          style={{ textDecoration: 'none' }}
          onClick={onClickRemoveAll}
          href="javascript: void(0)"
        >
          清空数据
        </a>
      </div>

      <HTableLayout
        ref={refTable}
        style={{ marginBottom: 6 }}
        columns={columns}
        data={goods}
        onChangeCell={onChangeCell}
      />

      <Flex style={{ marginBottom: 6 }} gap={6}>
        <FormItem label="合计金额">￥{totalPrice}</FormItem>
        <FormItem label="合计税额">￥0.00</FormItem>
      </Flex>

      <Flex style={{ marginBottom: 6 }} gap={6}>
        <FormItem label="价税合计(大写)">{rmbTotalPrice}</FormItem>
        <FormItem label="价税合计(小写)">￥0.00</FormItem>
      </Flex>

      <Flex style={{ marginBottom: 6 }} gap={6}>
        <FormItem label="销方名称">
          <Input
            placeholder="请输入销方名称"
            onChange={onChangeSellerName}
            value={sellerName}
          />
        </FormItem>

        <FormItem label="销方纳税人识别号">
          <Input
            placeholder="销方纳税人识别号"
            onChange={onChangeSellerTaxnum}
            value={sellerTaxnum}
          />
        </FormItem>
      </Flex>

      <Flex style={{ marginBottom: 6 }} gap={6}>
        <FormItem label="销方地址、电话">
          <Flex gap={6} flexs={['auto', '0 1 8em']}>
            <Input
              placeholder="请输入销方地址"
              onChange={onChangeSellerAddress}
              value={sellerAddress}
            />
            <Input
              placeholder="请输入电话"
              onChange={onChangeSellerTel}
              value={sellerTel}
            />
          </Flex>
        </FormItem>

        <FormItem label="销方开户行及账户">
          <Flex gap={6} flexs={['auto', '0 1 10em']}>
            <Input
              placeholder="请输入开户行"
              onChange={onChangeSellerBankName}
              value={sellerBankName}
            />
            <Input
              placeholder="请输入账户"
              onChange={onChangeSellerBankAccount}
              value={sellerBankAccount}
            />
          </Flex>
        </FormItem>
      </Flex>

      <FormItem label="备注" style={{ marginBottom: 6 }}>
        <Input
          placeholder="请输入备注"
          value={extra}
          onChange={onChangeExtra}
        />
      </FormItem>

      <Flex style={{ marginBottom: 6 }} gap={6}>
        <FormItem label="收款人">
          <Input
            placeholder="请输入开票人"
            onChange={onChangeCashier}
            value={cashier}
          />
        </FormItem>

        <FormItem label="复核人">
          <Input
            placeholder="请输入复核人"
            onChange={onChangeChecker}
            value={checker}
          />
        </FormItem>

        <FormItem label="开票人">
          <Input
            placeholder="请输入开票人"
            onChange={onChangeInvoicer}
            value={invoicer}
          />
        </FormItem>
      </Flex>
    </div>
  );
}
