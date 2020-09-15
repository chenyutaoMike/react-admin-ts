import React, { FC } from 'react'

import { Select, Row, Col, Space, DatePicker, Input, Button,  } from 'antd';

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



const InfoHeader: FC<any> = ({ infoHeaderProps }) => {
 
  const { category, keyword } = infoHeaderProps;
  const handleCategoryChange = (value: any) => {
    console.log(value)
  }
  const handleKeywordChange = (value: any) => {
    console.log(value)
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
            <RangePicker locale={locale} />
          </Space>
        </Col>
        <Col span={3}>
          关键字：
        <Select onChange={handleKeywordChange} style={{ width: 100 }} placeholder="关键字">
            {
              keyword.length !== 0 && keyword.map((item: keywordProps) => {
                return <Option value={item.value} key={item.value}>{item.label}</Option>
              })
            }
          </Select>
        </Col>
        <Col span={4} >
          <Input placeholder="请输入搜索内容" />
        </Col>
        <Col span={5} >
          <Button type="primary" size="middle" style={{ width: 100, marginRight: 20 }}>搜索</Button>
          <Button type="primary" size="middle" style={{ width: 100 }}>新增</Button>
        </Col>
      </Row>
    

  )
}

export default InfoHeader