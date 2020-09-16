import React, { FC, HTMLAttributes, useEffect, useState } from 'react'
import { Modal, Form, Select, Input, Button, } from 'antd'
import { tableProps, categoryItem } from '../CategoryList'

interface editInfoProps extends HTMLAttributes<HTMLElement> {
  editVisible: boolean;
  editData: tableProps;
  handleEditInfoOK: (dataValue:any) => void;
  handleEditInfoCancel: () => void;
  categoryList?: Array<categoryItem>
}
const EditInfo: FC<editInfoProps> = (props) => {
  const { editVisible, handleEditInfoOK, handleEditInfoCancel, categoryList, editData } = props;
  const [editValue, setEditValue] = useState({
    categoryId: editData.categoryId || '',
    title: editData.title || '',
    content: editData.content || ''
  })
  // 选择分类
  const seleteCategoryId = (value: any) => {
    setEditValue({
      ...editValue,
      categoryId: value
    })
  }
  // 改变标题
  const editTitle = (e: any) => {
    const val = e.target.value;
    setEditValue({
      ...editValue,
      title: val
    })
  }
  // 改变内容
  const editContent = (e: any) => {
    const val = e.target.value;
    setEditValue({
      ...editValue,
      content: val
    })
  }
  useEffect(() => {
    setEditValue({
      categoryId: editData.categoryId || '',
      title: editData.title || '',
      content: editData.content || ''
    })
  }, [editData])
  return (
    <div>
      <Modal
        title="修改详情"
        visible={props.editVisible}
        onOk={()=>{handleEditInfoOK({...editData,...editValue})}}
        onCancel={handleEditInfoCancel}
        cancelText="取消"
        // centered
        okText="确定"
      >

        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"

        >
          <Form.Item label="类型" >
            <Select style={{ width: 120 }} value={editValue.categoryId && editValue.categoryId} onSelect={seleteCategoryId}>
              {
                categoryList && categoryList.map((item: categoryItem) => {
                  return <Select.Option key={item.id} value={item.id}>{item.category_name}</Select.Option>
                })
              }
            </Select>
          </Form.Item>
          <Form.Item label="标题">
            <Input style={{ minWidth: 300 }} value={editValue.title && editValue.title} onChange={editTitle} />
          </Form.Item>
          <Form.Item label="概况">
            <Input.TextArea style={{ minWidth: 300, minHeight: 80 }} value={editValue.content && editValue.content} onChange={editContent} />
          </Form.Item>
        </Form>

      </Modal>
    </div>
  )
}

export default EditInfo