import Console from '../pages/console/Console.tsx'
import InfoIndex from '../pages/info/CategoryList.tsx'
import Category from '../pages/info/Category.tsx'
import User from '../pages/user/User.tsx'
// 路由配置文件
const routers = [
  {
    path: '/console', title: '控制台', icon: 'ClockCircleOutlined',hidden:'admin', SubMenu: true, children: [
      { path: '/consoleIndex', title: '首页', component: Console }
    ]
  },
  {
    path: '/info', title: '信息管理', icon: 'CopyOutlined',hidden:'infoSystem', SubMenu: true, children: [
      { path: '/infoIndex', title: '信息列表', component: InfoIndex },
      { path: '/category', title: '信息分类', component: Category },
    ]
  },
  {
    path: '/user', title: '用户管理', icon: 'UserOutlined',hidden:'userSystem', SubMenu: true, children: [
      { path: '/userIndex', title: '用户列表', component: User }
    ]
  }
]
export default routers