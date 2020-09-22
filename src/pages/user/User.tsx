import React, { FC, useState, useEffect } from 'react'
import { Row, Col, Select, Button, Input, Table, Pagination, Switch, Space, message, Popconfirm, Modal } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { QuestionCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { GetUserList, UserDelete } from '../../api/user'
interface tableProps {
  id: string;
  phone: string;
  region: string;
  role: string;
  status: string;
  truename: string;
  username: string;
  btnPerm: string;
}
const { confirm } = Modal;

const { Option } = Select;
const User: FC = () => {
  const [pageConfig, setPageConfig] = useState({
    pageNumber: 1,
    pageSize: 5
  })
  // 总页数
  const [totalPage, setTotalPage] = useState(0)
  // 表格数据
  const [tableData, setTableData] = useState([])
  // 当前选中页数
  const [currentPage, setCurrentPage] = useState(1)
  // 删除数组
  const [deleteTable, setDeteleTable] = useState([])
  const columns: ColumnsType<tableProps> = [
    {
      title: '邮箱/用户名',
      dataIndex: 'username',
      key: 'username',
      align: 'center'
    },
    {
      title: '姓名',
      dataIndex: 'truename',
      key: 'truename',
      align: 'center'
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      align: 'center'
    },
    {
      title: '地区',
      dataIndex: 'region',
      key: 'region',
      align: 'center'
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      align: 'center'
    },
    {
      title: '禁启用状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status) => {
        return (
          <Switch defaultChecked checked={status === '1' ? true : false} onChange={onChangeSwitch} />
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      render: (id) => {
        return (
          <Space size={'small'}>
            <Popconfirm title="确定要删除吗？" okText="确定" cancelText="取消" onConfirm={() => { deleteInfo([id]) }} icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
              <Button type="primary" danger>删除</Button>
            </Popconfirm>
            <Button type="primary">编辑</Button>
          </Space >
        )
      }
    }
  ]
  const onChangeSwitch = () => {

  }
  const handleChange = () => {

  }
  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setDeteleTable(selectedRowKeys)
    }
  };
  const pageChange = (pageNumber: number) => {
    setPageConfig({ ...pageConfig, pageNumber: pageNumber })
    setCurrentPage(pageNumber)
  }
  useEffect(() => {
    getUserList()
  }, [])
  useEffect(() => {
    getUserList()

  }, [pageConfig])
  // 获取表格列表
  const getUserList = () => {
    GetUserList(pageConfig).then((res: any) => {
      let result = res.data;
      console.log(result)
      if (result.resCode === 0) {
        setTableData(result.data.data)
        setTotalPage(result.data.total)
      }
    })
  }
  // 删除
  const deleteInfo = (ids: string[]) => {
    console.log(ids)
    // 删除在列表缓存中的数据
    setDeteleTable([])
    UserDelete({ id: ids }).then(res => {
      let result = res.data;
      if (result.resCode === 0) {
        message.success(result.message)
        getUserList()
      }
    })
  }
  // 批量删除
  const showDeleteConfirm = () => {
    if (deleteTable.length === 0) {
      message.warning('请选择要删除的数据')
      return
    }
    confirm({
      title: '警告',
      icon: <ExclamationCircleOutlined />,
      content: '确定要删除此数据吗？',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        deleteInfo(deleteTable)
      },
      onCancel() {
        message.warning('取消删除')
      },
    });
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
        dataSource={tableData}
        bordered
        rowKey={(record: any) => record['id']}

      />
      <Row justify={"space-between"} style={{ marginTop: 20 }}>
        <Col><Button onClick={showDeleteConfirm}>批量删除</Button></Col>
        <Col> <Pagination showQuickJumper pageSize={pageConfig.pageSize} current={currentPage} total={totalPage} onChange={pageChange} /></Col>
      </Row>

    </div>
  )
}

export default User