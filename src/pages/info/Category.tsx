import React, { FC, useState, useEffect } from 'react'
import { Button, Row, Col, Form, Input, message, Modal } from 'antd';
import { MinusSquareOutlined } from '@ant-design/icons'
import { GetCategoryAll, AddFirstCategory, AddChildrenCategory, EditCategory, DeleteCategory } from '../../api/info'
import './Category.less'


const inputWidth = {
  width: '268px'
}
interface categoryProps {
  getCategoryforProps: () => void;
  categoryList?: []
}
interface categoryItem {
  id: string;
  parent_id?: null;
  category_name?: string;
  children?: []
}
interface categoryTypeProps {
  type: string;
  value?: null | categoryItem
}

const Category: FC<categoryProps> = (props) => {
  // 获取form表单
  const [form] = Form.useForm();
  // 分类列表
  const [categoryList, setCategoryList] = useState([])
  // 一级分类input框是否可以使用
  const [categoryFirstDisabled, setCategoryDirstDisabled] = useState(true)
  // 二级级分类input框是否可以使用
  const [categoryChildrenDisabled, setCategoryChildrenDisabled] = useState(true)
  // 提交按钮是否可以用
  const [submitButton, setSubmitButton] = useState(true)
  // 是否显示一级分类input框
  const [categoryFirstInput, setCategoryFirstInput] = useState(true)
  // 是否显示二级分类input框
  const [categoryChildrenInput, setCategoryChildrenInput] = useState(true)
  // 添加一级分类/二级分类标识
  const [categoryType, setCategoryType] = useState<categoryTypeProps>({ type: 'addCategoryFirst', value: null })
  // 确认框状态
  const [visible, setVisible] = useState(false)
  const [deleCategoryId, setDeleCategoryId] = useState('')
  useEffect(() => {
    getCategoryList()
  }, [])
  const getCategoryList = () => {
    GetCategoryAll({}).then(res => {
      let result = res.data;
      if (result.resCode === 0) {
        setCategoryList(result.data)
      }
    })
  }
  // 添加一级分类
  const addFirstCategory = () => {
    // 开启一级分类框
    setCategoryDirstDisabled(false)
    // 开启按钮
    setSubmitButton(false)
    // 隐藏二级分类框
    setCategoryChildrenInput(false)
    setCategoryType({ type: 'addCategoryFirst', value: null })
  }
  const submitForm = (values: any) => {
   
    // 添加一级分类
    if (categoryType.type === 'addCategoryFirst') {
      let requestData = {
        categoryName: values.categoryFirst
      }
      AddFirstCategory(requestData).then(res => {
        getCategoryListOrMessage(res.data)
      }).catch(err => {
        message.warning('添加失败')
      })
    }
    if (categoryType.type === 'editCategoryFirst') {
      let requestData = {
        id: categoryType.value?.id,
        categoryName: values.categoryFirst
      }
      EditCategory(requestData).then(res => {
        getCategoryListOrMessage(res.data)

      }).catch(err => {
        message.warning('修改失败')
      })

    }
    if (categoryType.type === 'addCategoryChildren') {
      let requestData = {
        parentId: categoryType.value?.id,
        categoryName: values.categoryChildren
      }
      AddChildrenCategory(requestData).then(res => {
        getCategoryListOrMessage(res.data)
      }).catch(err => {
        message.warning('添加失败')
      })
    }
    if (categoryType.type === 'editCategoryChildren') {
      
      let requestData = {
        id: categoryType.value?.id,
        categoryName: values.categoryChildren
      }
      EditCategory(requestData).then(res => {
        let result = res.data;
        if (result.resCode === 0) {
          // 添加成功，提示信息
          message.success(result.message)
          // 重新获取数据
          getCategoryList()
          //清空表单
          form.setFieldsValue({
            categoryChildren: ''
          })
        }

      }).catch(err => {
        message.warning('修改失败')
      })
    }

  }
  const getCategoryListOrMessage = (result: any) => {
    if (result.resCode === 0) {
      // 添加成功，提示信息
      message.success(result.message)
      // 重新获取数据
      getCategoryList()

      //清空表单
      form.resetFields()

    }
  }
  // 编辑一级分类
  const editcategoryFirst = (category: categoryItem) => {
    
    // 开启一级分类框
    setCategoryDirstDisabled(false)
    // 开启按钮
    setSubmitButton(false)
    // 修改请求表示
    setCategoryType({ type: 'editCategoryFirst', value: category })
    // 隐藏二级分类框
    setCategoryChildrenInput(false)
    // 设置要修改的一级分类值
    form.setFieldsValue({
      categoryFirst: category.category_name
    })
  }
  // 添加二级分类
  const addCategoryChildren = (category: categoryItem) => {
    // 开启一级分类框
    setCategoryDirstDisabled(false)
    // 开启按钮
    setSubmitButton(false)
    // 开启二级分类框
    setCategoryChildrenDisabled(false)
    setCategoryType({ type: 'addCategoryChildren', value: category })
    // 设置要修改的一级分类值
    form.setFieldsValue({
      categoryFirst: category.category_name
    })
    // 控制一级分类不能修改
    setCategoryDirstDisabled(true)
  }
  // 编辑二级分类
  const editCategoryChildren = (category: any) => {
    
    // 开启一级分类框
    setCategoryDirstDisabled(false)
    //  一级分类框不能使用
    setCategoryDirstDisabled(true)
    // 开启按钮
    setSubmitButton(false)
    // 开启二级分类框
    setCategoryChildrenDisabled(false)
    setCategoryType({ type: 'editCategoryChildren', value: category.children[0] })
    form.setFieldsValue({
      categoryFirst: category.firstName,
      categoryChildren: category.children[0].category_name
    })
  }
  // 删除分类
  const deleCategory = (id: any) => {
    // 显示提示框
    setVisible(true)
    // 设置要删除的id
    setDeleCategoryId(id)
  }
  // 点击了确定，删除
  const handleOk = () => {
    // 关闭提示框
    setVisible(false)
    let requestData = {
      categoryId: deleCategoryId
    }
    DeleteCategory(requestData).then(res => {
      if (res.data.resCode === 0) {
        message.success(res.data.message)
        getCategoryList()
      }
    }).catch(err => {
      message.warning('删除失败')
    })

  };
  //点击了取消，取消删除
  const handleCancel = () => {
    // 关闭提示框
    setVisible(false)

  };
  return (
    <div className="category-box">
      <div className="category-header">
        <Button type="primary" size="large" onClick={addFirstCategory}>添加一级分类</Button>
      </div>
      <Row>
        <Col span={8}>
          <div className="category-wrap">
            {
              categoryList && categoryList.length !== 0 ? (
                categoryList.map((item: categoryItem) => {
                  return (
                    <div className="category" key={item.id}>
                      <MinusSquareOutlined className="icon-svg" />
                      <h4>
                        {item.category_name}
                        <div className="button-group">
                          <Button type="primary" size="small" shape="round" onClick={() => editcategoryFirst(item)}>
                            编辑
                          </Button>
                          <Button type="primary" size="small" shape="round" onClick={() => addCategoryChildren(item)}>
                            添加子级
                          </Button>
                          <Button size="small" shape="round" onClick={() => deleCategory(item.id)}>
                            删除
                          </Button>
                        </div>
                      </h4>
                      <ul>
                        {
                          item.children && item.children.length !== 0 ? (
                            item.children.map((childrenItem: categoryItem) => {
                              return (
                                <li key={childrenItem.id}>
                                  {childrenItem.category_name}
                                  <div className="button-group">
                                    <Button type="primary" size="small" shape="round" onClick={() => editCategoryChildren({ firstName: item.category_name, children: item.children })}>
                                      编辑
                          </Button>
                                    <Button size="small" shape="round" onClick={() => deleCategory(childrenItem.id)}>
                                      删除
                          </Button>
                                  </div>
                                </li>
                              )
                            })
                          ) : null
                        }
                      </ul>
                    </div>
                  )
                })
              ) : null
            }
          </div>
        </Col>
        <Col span={16}>
          <h4 className="menu-title">一级分类名称</h4>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            className="category-form"
            onFinish={submitForm}
            form={form}
          >
            {
              categoryFirstInput ? (
                <Form.Item
                  label="一级分类名称"
                  name="categoryFirst"
                  rules={[{ required: true, message: '请填写一级分类名称' }]}
                >
                  <Input style={inputWidth} disabled={categoryFirstDisabled} />

                </Form.Item>
              ) : null
            }
            {
              categoryChildrenInput ? (
                <Form.Item
                  label="二级分类名称"
                  name="categoryChildren"
                  rules={[{ required: true, message: '请填写二级分类名称' }]}
                >
                  <Input style={inputWidth} disabled={categoryChildrenDisabled} />

                </Form.Item>
              ) : null
            }
            <Form.Item >
              <Button
                type="primary"
                htmlType="submit"
                className="category-button"
                disabled={submitButton}>
                确定
                </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        确定删除这条分类吗?
      </Modal>
    </div>
  )


}


export default Category