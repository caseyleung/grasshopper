// 登录接口需要携带参数ts类型
export interface loginForm {
  username: string,
  password: string,
}

interface dataType {
  token?: string,
  message?: string,
}

// 登录接口返回的数据类型
export interface loginResponse {
  code: number,
  data: dataType,
}

interface userInfo {
  userId: number,
  avatar: string,
  username: string,
  passowrd: string,
  desc: string,
  roles: string[],
  buttons: string[],
  routes: string[],
  token: string,
}

interface user {
  checkUser: userInfo,
}

export interface userResponse {
  code: number,
  data: user,
}


// 以下是替换真实接口
export interface loginFormData {
  username: string,
  password: string,
}

export interface ResponseData {
  code: number,
  message: string,
  ok: boolean,
  token: string,
}

export interface loginResponseData extends ResponseData {
  data: string,
}

export interface userInfoResponseData extends ResponseData {
  data: {
    routes: string[],
    button: string[],
    roles: [],
    name: string,
    avatar: string,
    token: string,
    username: string,
  }
}