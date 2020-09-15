import React, { FC, useState, useEffect } from 'react'
import InfoHeader from '../../components/infoHeader/InfoHeader'
import { GetCategory, GetList, DeleteInfo } from '../../api/info'
import { Row, Col, Table, Button, Space, Pagination, Popconfirm, message, Modal } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';

export interface categoryItem {
  id: string;
  category_name: string;
}

// export interface infoHeaderProps {
//   category: Array<categoryItem>;
//   keyword: Array<keywordProps>
// }
// export interface keywordProps {
//   value: string;
//   label: string;
// }
// const infoHeaderData = {
//   category: [],
//   keyword: [
//     {
//       value: "id",
//       label: "ID"
//     },
//     {
//       value: "title",
//       label: "标题"
//     }
//   ]
// }

interface tableProps {
  id: string;
  title: string;
  categoryId: string;
  createDate: string;
  content: string;
  imgUrl?: null | []
  categoryName?: null | string
  status?: null | []
}
const CategoryList: FC = (props) => {
  const columns: ColumnsType<tableProps> = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      align: 'center'
    },
    {
      title: '类别',
      dataIndex: 'categoryId',
      key: 'categoryId',
      width: 150,
      align: 'center',
      render: (categoryId: any) => {
        let categoryItem: categoryItem | undefined = infoHeaderData.category.find((item: any) => item.id === categoryId)
        return <div>{categoryItem && categoryItem['category_name'] || '没有此分类'}</div>
      }
    },
    {
      title: '日期',
      key: 'createDate',
      width: 100,
      dataIndex: 'createDate',
      align: 'center'
    },
    {
      title: '管理员',
      key: 'id',
      dataIndex: 'id',
      width: 100,
      align: 'center'
    },
    {
      title: '操作',
      key: 'id',
      dataIndex: 'id',
      width: 200,
      align: 'center',
      render: (id: any, record: any, index: any) => {
        return (
          <Space>
            <Button type="primary" key={index} size="small" style={{ fontSize: 13 }}>编辑</Button>
            <Button type="primary" key={index} size="small" style={{ fontSize: 13 }}>编辑详情</Button>
            <Popconfirm title="确定删除此数据吗" icon={<QuestionCircleOutlined style={{ color: 'red' }} />} onConfirm={() => deleteInfo(id)}>
              <Button type="primary" danger key={index} size="small" style={{ fontSize: 13 }} >删除</Button>
            </Popconfirm>
          </Space>
        )
      }
    },

  ];
  // 表格多选
  const [selectionType, setSelectionType] = useState<String>('checkbox');
  // 请求页数和请求条数
  const [pageConfig, setPageConfig] = useState({
    pageNumber: 1,
    pageSize: 10,
  })
  // 表格总条数
  const [total, setTotal] = useState(0)
  // 当前页数
  const [currentPage, setCurrentPage] = useState(1)
  console.log(currentPage)
  // 加载状态
  const [loadingStatus, setLoadingStatus] = useState(false)
  // 要删除的列表的数组
  const [deleteInfoArray, setDeleteInfoArray] = useState<[]>([])
  // 删除全部提示框
  const [visible, setVisible] = useState(false)
  // 表格数据
  const [tableData, setTableData] = useState([])
  const [infoHeaderData, setInfoHeaderData] = useState({
    category: [],
    keyword: [
      {
        value: "id",
        label: "ID"
      },
      {
        value: "title",
        label: "标题"
      }
    ]
  })
  useEffect(() => {
    // 请求分类
    getCategory()
    getListData()
  }, [])
  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setDeleteInfoArray(selectedRowKeys)
      console.log(selectedRowKeys)
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };
  // 获取分类
  const getCategory = () => {
    GetCategory({}).then(res => {
      let result = res.data
      if (result.resCode === 0) {
        // 设置要传递的值
        setInfoHeaderData({ ...infoHeaderData, category: result.data.data })
      }
    })
  }
  // 获取列表
  const getListData = () => {
    // 请求的时候，设置Loading状态
    setLoadingStatus(true)
    GetList(pageConfig).then(res => {
      // 请求成功，取消loading状态
      setLoadingStatus(false)
      let result = res.data;
      console.log(res)
      if (result.resCode === 0) {
        // 设置表格数据
        setTableData(result.data.data)
        setTotal(result.data.total)
      }
    }).catch(err => {
      setLoadingStatus(false)
    })
  }
  const pageChange = (pageNumber: number) => {
    const newPageNumber = pageNumber;
    setCurrentPage(newPageNumber)
    // 设置请求页数
    setPageConfig({
      pageNumber: newPageNumber,
      pageSize: 10,
    })

  }
  useEffect(() => {
    getListData()
  }, [pageConfig]);
  // 删除表格信息
  const deleteInfo = (id: string | []) => {
    console.log(id)
    let requestData = {}
    if (typeof id === 'string') {
      requestData = {
        id: [id]
      }
    }
    if (id instanceof Array) {
      requestData = {
        id
      }
    }

    DeleteInfo(requestData).then(res => {
      // 清空之前删除的数组
      setDeleteInfoArray([])
      if (res.data.resCode === 0) {
        message.success(res.data.message)
        getListData()
      }
    }).catch(err => {
      // 清空之前删除的数组
      setDeleteInfoArray([])
    })
  }
  // 删除信息数组
  const deleteInfoAll = () => {
    if (deleteInfoArray.length === 0) {
      message.warning('请选择要删除的数据')
      return
    }
    // 提示是否删除模态框
    setVisible(true)

  }
  const handleOk = () => {
    // 点击了ok
    // 调取删除数组接口
    deleteInfo(deleteInfoArray)
    // 关闭对话框
    setVisible(false)
  }
  const handleCancel = () => {
    // 点击了取消
    // 关闭对话框
    setVisible(false)

  }
  return (
    <div>
      <InfoHeader infoHeaderProps={infoHeaderData} />
      <Row>
        <Col span={24} style={{ marginTop: 30 }}>
          <Table
            pagination={false}
            rowSelection={{
              type: selectionType,
              ...rowSelection,
            } as any}
            rowKey={(record: any) => record['id']}
            columns={columns}
            dataSource={tableData}
            bordered
            loading={loadingStatus}
          />
        </Col>
      </Row>
      <Row justify="space-between" style={{ marginTop: 20 }}>
        <Col >
          <Button onClick={deleteInfoAll}>批量删除</Button>
        </Col>
        <Col>
          <Pagination showQuickJumper defaultPageSize={10} current={currentPage} total={total} onChange={pageChange} />
        </Col>
      </Row>
      <Modal
        visible={visible}
        title="提示信息"
        onOk={handleOk}
        onCancel={handleCancel}
      >
        是否删除所有信息，删除后无法恢复
      </Modal>
    </div>
  )
}

export default CategoryList