import React, { FC, HTMLAttributes, useState } from 'react'

import { Select, Row, Col, Space, DatePicker, Input, Button, } from 'antd';

import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
const { Option } = Select;
const { RangePicker } = DatePicker;

export interface categoryItem {
  id: string;
  category_name: string;
}
export interface keywordProps {
  value: string;
  label: string;
}

export interface infoHeaderProps {
  category: Array<categoryItem>;
  keyword: Array<keywordProps>;
}

interface infoHeaderData extends HTMLAttributes<HTMLElement> {
  infoHeaderProps: infoHeaderProps;
  addInfo: () => void;
  search: (searckLey: any) => void
}

interface dateValProps {
  [index: number]: string
}

const InfoHeader: FC<infoHeaderData> = ({ infoHeaderProps, addInfo, search }) => {

  const { category, keyword } = infoHeaderProps;
  const [categoryId, setCategoryId] = useState('')
  const [dateVal, setDateVal] = useState<dateValProps>([])
  const [searchkey, setSearchKey] = useState('ID')
  const [searchVal, setSearchVal] = useState('')

  const handleCategoryChange = (value: any) => {
    setCategoryId(value)

  }
  const handleKeywordChange = (value: any) => {
    console.log(value)
    setSearchKey(value)
  }
  const searchList = () => {
    console.log(categoryId)
    console.log(dateVal)
    console.log(searchkey)

    let serachKey = {
      categoryId: !categoryId ? '' : Number(categoryId),
      startTiem: dateVal[0] || '',
      endTime: dateVal[1] || '',
      [searchkey]: searchkey === 'ID' ? Number(searchVal) : searchVal
    }
    search(serachKey)
  }
  const dateChange = (dates: any, dateStrings: any) => {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    setDateVal([dateStrings[0], dateStrings[1]])
  }
  const changeKeyValue = (e: any) => {
    setSearchVal(e.target.value)
  }
  return (

    <Row justify="space-between">
      <Col span={4}>
        分类：
      <Select style={{ width: 120 }} onChange={handleCategoryChange} placeholder="请选择">
          {
            category.length !== 0 && category.map((item: categoryItem) => {
              return <Option key={item.id} value={item.id}>{item.category_name}</Option>
            })
          }


        </Select>
      </Col>
      <Col span={7}>
        日期：
        <Space direction="vertical" size={12}>
          <RangePicker locale={locale} onChange={dateChange} />
        </Space>
      </Col>
      <Col span={3}>
        关键字：
        <Select defaultValue="ID" onChange={handleKeywordChange} style={{ width: 100 }} placeholder="关键字">
          {
            keyword.length !== 0 && keyword.map((item: keywordProps) => {
              return <Option value={item.value} key={item.value}>{item.label}</Option>
            })
          }
        </Select>
      </Col>
      <Col span={4} >
        <Input placeholder="请输入搜索内容" value={searchVal} onChange={changeKeyValue} />
      </Col>
      <Col span={5} >
        <Button type="primary" size="middle" style={{ width: 100, marginRight: 20 }} onClick={searchList}>搜索</Button>
        <Button type="primary" size="middle" style={{ width: 100 }} onClick={addInfo}>新增</Button>
      </Col>
    </Row>


  )
}

export default InfoHeader