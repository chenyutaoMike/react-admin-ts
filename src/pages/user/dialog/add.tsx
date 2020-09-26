import React, { FC, useEffect, useState, HTMLAttributes } from 'react'
import {
  Modal, Form,
  Input,
  Radio,
  Checkbox, message
} from 'antd'
import { GetRole, GetPermButton, AddUser, UserEdit, GetSystem } from '../../../api/user'
import sha1 from 'js-sha1'
import './add.less'
interface AddProps extends HTMLAttributes<HTMLElement> {
  visible: boolean;
  close: () => void;
  getList: () => void;
  editVal?: any
}
interface RoleProps {
  name: string;
  role: string
}

const Add: FC<AddProps> = ({ visible, close, getList, editVal }) => {
  const [isOpen, setisOpen] = useState('1');
  const [roleItem, setRoleItem] = useState([]);
  const [btnPerm, setBtnPerm] = useState([]);
  const [form] = Form.useForm();
  const [requestType, setRequestType] = useState({ type: 'ADD', value: '' })
  useEffect(() => {
    if (roleItem.length === 0) {
      // 请求用户角色
      GetSystem().then(res => {
        let result = res.data;
        if (result.resCode === 0) {
          setRoleItem(result.data)
        }
      })
    }
    if (btnPerm.length === 0) {
      GetPermButton().then(res => {
        let result = res.data;
        if (result.resCode === 0) {
          setBtnPerm(result.data)
        }
      });
    }

  }, []);
  useEffect(() => {
    if (editVal.id) {
      setRequestType({ type: 'EDIT', value: editVal.id })
      form.setFieldsValue({
        'useremail': editVal.username,
        'username': editVal.truename,
        'phone': editVal.phone,
        'isOpen': editVal.status,
        'role': editVal.role,
        'perm': editVal.btnPerm
      })
    }
  }, [editVal])
  //点击确定
  const handleOk = () => {
    form.submit()
    // console.log(form.getFieldValue('role'))
  }
  //点击取消
  const handleCancel = () => {
    close()
  }

  //是否禁启用
  const onChangeisOpen = (e: any) => {
    setisOpen(e.target.value)
  }
  // 角色改变
  const RoleChange = (val: any) => {
    console.log(val)
  }

  const submitForm = (values: any) => {

    console.log(values)
    if (requestType.type === 'ADD') {
      let requestData = {
        username: values.useremail,
        truename: values.username,
        password: sha1(values.password),
        phone: values.phone,
        status: values.isOpen,
        role: (values.role instanceof Array) ? values.role.join() : values.role,
        btnPerm: (values.perm instanceof Array) ? values.perm.join() : values.perm,
      }
      addUser(requestData)
    }
    if (requestType.type === 'EDIT') {

      let requestEdit = {
        id: requestType.value,
        username: values.useremail,
        truename: values.username,
        phone: values.phone,
        status: values.isOpen,
        role: (values.role instanceof Array) ? values.role.join() : values.role,
        btnPerm: (values.perm instanceof Array) ? values.perm.join() : values.perm,
      }

      editUser(requestEdit)
    }
  }
  const addUser = (requestData: any) => {
    AddUser(requestData).then(res => {
      if (res.data.resCode === 0) {
        message.success(res.data.message)
        // 更新列表
        getList()
        // 关闭弹窗
        handleCancel()
        //清空表单
        form.resetFields()
      }
    })
  }
  const editUser = (requestEdit: any) => {
    UserEdit(requestEdit).then(res => {
      if (res.data.resCode === 0) {
        message.success(res.data.message)
        // 更新列表
        getList()
        // 关闭弹窗
        handleCancel()
        //清空表单
        form.resetFields()
      }
    })
  }

  return (
    <Modal
      getContainer={false}
      title="新增"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="确定"
      cancelText="取消"
    >
      <Form
        labelCol={{ span: 4 }}
        // wrapperCol={{ span: 14 }}
        layout="horizontal"
        form={form}
        name="addForm"
        onFinish={submitForm}
      >
        <Form.Item label="邮箱" name="useremail" rules={[{ required: true, message: '邮箱必须填写' }]}>
          <Input />
        </Form.Item>
        {
          requestType.type === 'EDIT' ? (
            <Form.Item label="密码" name="password"  >
              <Input.Password />
            </Form.Item>
          ) : (
              <Form.Item label="密码" name="password" rules={[{ required: true, message: '密码必须填写' }]} >
                <Input.Password />
              </Form.Item>
            )
        }

        <Form.Item label="姓名" name="username" rules={[{ required: true, message: '姓名必须填写' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="手机号" name="phone" rules={[{ required: true, message: '手机号必须填写' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="是否禁用" name="isOpen" rules={[{ required: true, message: '状态必须选择' }]}>
          <Radio.Group onChange={onChangeisOpen} value={isOpen}>
            <Radio value={'1'}>启用</Radio>
            <Radio value={'2'}>禁用</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="角色" name="role" rules={[{ required: true, message: '角色必须选择' }]} >
          {
            roleItem.length !== 0 && <Checkbox.Group onChange={RoleChange}>
              {
                roleItem.map((item: RoleProps) => {
                  return <Checkbox key={item.role} value={item.role}>{item.name}</Checkbox>
                })
              }
            </Checkbox.Group>
          }
        </Form.Item>
        <Form.Item label="按钮权限" name="perm">
          {
            btnPerm.length !== 0 && (
              <Checkbox.Group className="perm-group">
                {
                  btnPerm.map((permTitle: any, index: number) => {
                    return (
                      <div key={permTitle.name + index}>
                        {permTitle.name}
                        <br />
                        {
                          permTitle.perm.length !== 0 && permTitle.perm.map((childPerm: any, index: number) => {
                            return <Checkbox key={childPerm.value + index} value={childPerm.value}>{childPerm.name}</Checkbox>
                          })
                        }
                      </div>
                    )
                  })
                }

              </Checkbox.Group>
            )
          }
        </Form.Item>
      </Form>
    </Modal >
  )
}

export default Add