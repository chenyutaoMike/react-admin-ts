import React, { FC, useState } from 'react'
import { Row, Col, Select, Button, Input, Table ,Pagination} from 'antd'
import { ColumnsType } from 'antd/es/table'

interface tableProps {

}
const data = [
  {
    key: 1,
    name: 'John Brown sr.',
    age: 60,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }
];

const { Option } = Select;
const User: FC = () => {
  const columns: ColumnsType<tableProps> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: '12%',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      width: '30%',
      key: 'address',
    },
  ]

  const handleChange = () => {

  }
  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record: any, selected: any, selectedRows: any) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected: any, selectedRows: any, changeRows: any) => {
      console.log(selected, selectedRows, changeRows);
    },
  };
  const pageChange = () =>{

  }
  return (
    <div>
      <Row justify={'space-between'}>
        <Col span={20}>
          <Row>
            <Col span={6}>
              关键字：
          <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
              </Select>
            </Col>
            <Col span={6} >
              <Input placeholder="请输入搜索关键字" />
            </Col>
            <Col span={3} offset={1}>
              <Button type="primary">搜索</Button>
            </Col>
          </Row>
        </Col>
        <Col>
          <Button type="primary">添加用户</Button>
        </Col>
      </Row>
      <Table
        style={{ marginTop: 20 }}
        columns={columns}
        rowSelection={{ ...rowSelection }}
        pagination={false}
        dataSource={data}
        bordered
      />
      <Row justify={"space-between"} style={{ marginTop: 20 }}>
        <Col><Button>批量删除</Button></Col>
        <Col> <Pagination showQuickJumper defaultPageSize={10} current={10} total={20} onChange={pageChange} /></Col>
      </Row>
    </div>
  )
}

export default User