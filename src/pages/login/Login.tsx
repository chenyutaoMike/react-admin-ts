import React, { useState, FC, useEffect } from 'react'
import './Login.less'
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  message
} from 'antd';
import { GetSms, login, register } from '../../api/login'
import { extractCode } from '../../utils/validate'
import { setToken, setUserName } from '../../utils/app'
import sha1 from 'js-sha1'
import classnames from 'classnames'

interface requestDataProps {
  username: string,
  password: string,
  code: string
}


const Login: FC = (props) => {
  // 按钮列表
  const menuList = [
    { id: 0, value: '登陆' },
    { id: 1, value: '注册' },
  ]
  const [componentSize] = useState('default')
  // 是否禁用按钮
  const [buttonStatus, setButtonStatus] = useState(true)
  // 验证码按钮状态
  const [codeButtonStatus, setCodeButtonStatus] = useState({
    status: false,
    value: '获取验证码'
  })
  // 验证码按钮定时器
  let [codeTimer] = useState<NodeJS.Timer | null>(null)
  // 按钮状态
  const [menuStatus, setMenuStatus] = useState(0)
  // 判断登录注册按钮
  const [isLogin, setIsLogin] = useState('登录')
  //form表单控制
  const [form] = Form.useForm();
  // 验证码Input控制

  // 切换按钮
  const changeMenuItem = (index: number) => {
    if (index === 0) {
      setIsLogin('登录')
    } else if (index === 1) {
      setIsLogin('注册')
    }
    setMenuStatus(index)
    clearCountDown()
  }

  /**
   * 获取短信
   */
  const getSms = () => {
    let username = form.getFieldValue(['user', 'name'])
    if (!username) {
      message.error('请输入邮箱')
      return
    }
    let requertData = {
      username,
      module: menuStatus === 0 ? 'login' : 'register'
    }
    // 当点击获取验证码的时候，把按钮disable掉，把文字变成获取中
    setCodeButtonStatus({ status: true, value: '获取验证码中' })
    GetSms(requertData).then((res: any) => {
      // 回复按钮状态
      setButtonStatus(false)
      // 开启验证码按钮倒数计时器
      countDown(60)
      if (res.data.resCode === 0) {
        // 获取验证码成功
        message.success(res.data.message)
        // 提取验证码
        const code = extractCode(res.data.message)
        // 设置验证码
        form.setFieldsValue({ user: { code: code } });
      }
    }).catch(err => {
      // 如果失败了，提示失败信息
      message.error('获取验证码失败')
      // 恢复按钮
      setCodeButtonStatus({ status: false, value: '重新获取' })
    })
  }

  /**
   * 提交表单
   */
  const submitForm = () => {
    const user = form.getFieldsValue(['user']).user
    if (!user) {
      message.error('请填好表单')
      return
    }
    let requertData = {
      username: user.name,
      password: sha1(user.password),
      code: user.code
    }
    if (menuStatus === 0) {
      // 触发登陆
      login(requertData).then(res => {
        let result = res.data;
        if (result.resCode === 0) {
          // 提示登陆成功
          message.success('登陆成功')
          // 设置token
          setToken(result.data.token)
          // 设置username
          setUserName(result.data.username)
          form.resetFields()
        }
      }).catch(err => {
        message.error('登陆失败，网络错误')
      })
    } else if (menuStatus === 1) {
      // 注册
      register(requertData).then(res => {
        let result = res.data;
        if (result.resCode === 0) {
          message.success('注册成功')
          // 重置表单
          form.resetFields()
          // 切换到登录
          setMenuStatus(0)
        }
        console.log(res)
      }).catch(err => {
        message.error('注册失败，网络错误')
      })
    }


  }
  /**
   * 倒数定时器
   */
  const countDown = (time: number) => {
    if (codeTimer) {
      clearInterval(codeTimer)
    }
    let timer = time
    codeTimer = setInterval(() => {
      timer--;
      if (timer === 0) {
        clearInterval(Number(codeTimer))

        setCodeButtonStatus({ status: false, value: `重新获取` })
      } else {
        setCodeButtonStatus({ status: true, value: `倒计时${timer}秒` })
      }
    }, 1000)
  }
  /** 
   *  清除定时器
   */
  const clearCountDown = () => {
    setCodeButtonStatus({ status: false, value: `获取验证码` })
    clearInterval(Number(codeTimer))
  };

  useEffect(() => {

    return () => {
      //页面卸载的时候，清除定时器
      clearCountDown()
    }
  }, [])

  const classes = classnames('default-button', {
    'disable-button': buttonStatus
  })

  return (
    <div className="login">
      <div className="login-wrap">
        <ul className="menu-tab">
          {
            menuList.map((item, index) => {
              return (
                <li key={item.id} onClick={() => changeMenuItem(index)} className={index === menuStatus ? 'menu-item current' : 'menu-item'}>{item.value}</li>
              )
            })
          }
        </ul>
        <Form
          form={form}
          layout="vertical"
          initialValues={{ size: componentSize }}
          labelCol={{ span: 5 }}
          labelAlign="left"
        >

          <Form.Item
            name={['user', 'name']}
            rules={[{ required: true, message: '请输入邮箱' }, { pattern: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/, message: '请输入正确格式的邮箱' }]}
            label="邮箱"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['user', 'password']}
            label="密码"
            rules={[{ required: true, message: '请输入密码' }, { pattern: /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/, message: '请输入正确格式的密码' }]}>
            <Input id="password" type="password" />
          </Form.Item>
          {
            menuStatus && menuStatus === 1 ?
              <Form.Item
                name={['user', 'passwords']}
                label="重复密码"
                rules={
                  [
                    { required: true, message: '请再次输入密码', },
                    { pattern: /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/, message: '请输入正确格式的密码' },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (!value || getFieldValue(['user', 'password']) === value) {
                          console.log('通过')
                          return Promise.resolve();
                        }
                        return Promise.reject('两次密码不一致');
                      },
                    }),
                  ]}>
                <Input id="passwords" />
              </Form.Item> : null
          }
          <Form.Item
            label="验证码"
          >
            <Row>
              <Col span={14}  >
                <Form.Item
                  name={['user', 'code']}
                  rules={[{ required: true, message: '请输入验证码' }, { pattern: /^[a-z0-9A-Z]{6}$/, message: '请输入正确格式的验证码' }]}
                >
                  <Input id="usercode" />
                </Form.Item>
              </Col>
              <Col offset={2}></Col>

              <Col span={6} className="button-wrapp"><Button type="primary" onClick={getSms} disabled={codeButtonStatus.status ? true : false}>{codeButtonStatus.value}</Button></Col>
            </Row>
          </Form.Item>
          <Form.Item>
            <Button className={classes} htmlType="submit" onClick={submitForm} disabled={buttonStatus ? true : false}>{isLogin}</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
export default Login

