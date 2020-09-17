import React, { FC, HTMLAttributes, useEffect, useState } from 'react'
import { Modal, Form, Select, Input, Button, message } from 'antd'
import { tableProps, categoryItem } from '../CategoryList'

interface editInfoProps extends HTMLAttributes<HTMLElement> {
  editVisible: boolean;
  editData: tableProps;
  handleEditInfoOK: (dataValue: any) => void;
  handleEditInfoCancel: () => void;
  categoryList?: Array<categoryItem>
}
const EditInfo: FC<editInfoProps> = (props) => {
  const [form] = Form.useForm();
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
    form.setFieldsValue({
      categoryId: editData.categoryId || '',
      title: editData.title || '',
      content: editData.content || ''
    })
  }, [editData])
  const submitForm = (formData: any) => {
    if (formData.title === '') {
      message.warning('请填写标题')
      return
    }
    if (formData.categoryId === '') {
      message.warning('请选择分类')
      return
    }
    if (formData.content === '') {
      message.warning('请填写内容')
      return
    }

    handleEditInfoOK(formData)
  }
  return (
    <div>
      <Modal
        title="修改详情"
        visible={props.editVisible}
        onOk={() => { submitForm({ ...editData, ...editValue }) }}
        // onOk={()=>{submitForm()}}
        onCancel={handleEditInfoCancel}
        cancelText="取消"
        // centered
        okText="确定"
      >

        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          name="editOrAdd"
          form={form}
        >
          <Form.Item label="类型" rules={[{ required: true, message: '必须选择分类' }]} name="categoryId">
            <Select style={{ width: 120 }} value={editValue.categoryId && editValue.categoryId} onSelect={seleteCategoryId}>
              {
                categoryList && categoryList.map((item: categoryItem) => {
                  return <Select.Option key={item.id} value={item.id}>{item.category_name}</Select.Option>
                })
              }
            </Select>
          </Form.Item>
          <Form.Item name="title" label="标题" rules={[{ required: true, message: '必须填写标题' }]}>
            <Input style={{ minWidth: 300 }} value={editValue.title && editValue.title} onChange={editTitle} />
          </Form.Item>
          <Form.Item label="概况" rules={[{ required: true, message: '必须填写内容' }]} name="content" >
            <Input.TextArea style={{ minWidth: 300, minHeight: 80 }} value={editValue.content && editValue.content} onChange={editContent} />
          </Form.Item>
        </Form>

      </Modal>
    </div>
  )
}

export default EditInfo