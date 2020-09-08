import React, { useState } from 'react'
import { getToken, getUserName, removeToken, removeUserName } from '../../utils/app'
import { Layout, Menu, Modal, message } from 'antd'
import * as Icons from '@ant-design/icons';
import { Link, Switch, Route, Redirect, useHistory } from 'react-router-dom'
import routers from '../../router'
import './admin.less'
import Console from '../console/Console'
import InfoIndex from '../info/CategoryList.tsx'
import Category from '../info/Category.tsx'
import User from '../user/User.tsx'
import logo from '../../assets/images/logo.png'
import headerImg from '../../assets/images/header_icon.jpg'
import classnames from 'classnames'

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

// interface routerProps {
//   path: string;
//   title: string;
//   children?: Array<routerProps>
//   icon?: string;
//   SubMenu?: boolean
// }

const Admin = (props) => {
  const [collapsed, setCollapsed] = useState(false)
  // 退出模态框
  const [visible, setVisible] = useState(false);
  let history = useHistory();
  const toggle = () => {
    setCollapsed(!collapsed)
  }
  // 点击了确定
  const handleOk = () => {
    // 清除登录信息
    removeToken()
    removeUserName()
    // 路由跳转
    history.replace('/login')
    message.success('退出成功')
    //  关闭模态框
    setVisible(true)
  }
  // 点击了取消
  const handleCancel = () => {
    setVisible(false)
  }
  const MenuList = (router) => {
    return router.map((item) => {
      if (!item.children) {
        // 子菜单
        return (<Menu.Item key={item.path} title={item.title}>
          <Link to={item.path}>
            {item.title}
          </Link>
        </Menu.Item>)
      } else {
        // 一级菜单
        // icon={`<${item.icon} />`}
        return (<SubMenu key={item.path} title={item.title} icon={
          item.icon ? React.createElement(Icons[item.icon], {
            fontSize: '26px'
          })
            : null
        }>
          {MenuList(item.children)}
        </SubMenu>)
      }
    })
  }
  // 退出登录
  const logout = () => {
    setVisible(true)
  }

  let classes = classnames('logo-box', {
    'small': collapsed
  })

  if (!getToken() || !getUserName()) {
    return (
      <Redirect to="/login" />
    )
  } else {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className={classes}>
            <img className="logo" src={logo} alt="logo"/>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['/consoleIndex']}>

            {
              MenuList(routers)
            }
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background admin-header" style={{ padding: 0 }}>
            {React.createElement(collapsed ? Icons.MenuUnfoldOutlined : Icons.MenuFoldOutlined, {
              className: 'trigger ',
              onClick: toggle,
              style: { fontSize: 20, marginLeft: 20 }
            })}
            <div className="header-right ">
              <div className="username">
                <img src={headerImg} alt="header" />
                {getUserName && getUserName()}
              </div>
              <div className="logout">
                {React.createElement(Icons.LoginOutlined, {
                  style: { fontSize: 20 },
                  onClick: logout
                })}
              </div>
            </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              overflow:'auto'
            }}
          >
            <Switch>
              <Redirect from="/" to="/consoleIndex" exact />
              <Route component={Console} path="/consoleIndex" />
              <Route component={InfoIndex} path="/infoIndex" />
              <Route component={Category} path="/category" />
              <Route component={User} path="/userIndex" />

            </Switch>
          </Content>
        </Layout>
        <Modal
          title="确定要退出登录吗？"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          centered
          cancelText="取消"
          okText="确认"
        >

        </Modal>
      </Layout>
    )
  }

}

export default Admin