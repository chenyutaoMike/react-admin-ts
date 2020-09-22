import service from './request';


/**
 * 
 * 获取用户列表
 */
export function GetUserList(data) {
  return service.request({
    method: 'post',
    url: '/user/getList/',
    data: data
  })
}


/**
 * 
 * 列表
 */

export function GetRole(data = {}) {
  return service.request({
    method: 'post',
    url: '/role/',
    data: data
  })
}
/**
 * 
 * 增加用户
 */
export function AddUser(data) {
  return service.request({
    method: 'post',
    url: '/user/add/',
    data: data
  })
}

/**
 * 
 * 删除用户
 */
export function UserDelete(data) {
  return service.request({
    method: 'post',
    url: '/user/delete/',
    data: data
  })
}

/**
 * 
 * 用户禁启用
 */
export function UserActives(data) {
  return service.request({
    method: 'post',
    url: '/user/actives/',
    data: data
  })
}


/**
* 
* 用户编辑
*/
export function UserEdit(data) {
  return service.request({
    method: 'post',
    url: '/user/edit/',
    data: data
  })
}


/**
 * 
 * 系统列表
 */
export function GetSystem(data) {
  return service.request({
    method: 'post',
    url: '/system/',
    data: data
  })
}


/**
 * 按钮权限
 */
export function GetPermButton(data) {
  return service.request({
    method: 'post',
    url: '/permButton/',
    data: data
  })
}