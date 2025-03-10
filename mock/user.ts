function createUserList() {
  return [
    {
      userId: 1,
      avatar: "/ikun.png",
      username: "ikun",
      password: "111",
      desc: "平台管理员",
      roles: ["平台管理员"],
      buttons: ["cuser.details"],
      routes: ["home"],
      token: "Admin Token",
    },
    {
      userId: 2,
      avatar: "",
      username: "system",
      password: "111",
      desc: "系统管理员",
      roles: ["系统管理员"],
      buttons: ["cuser.details", "cuser.user"],
      routes: ["home"],
      token: "Admin Token",
    },
  ];
}

export default [
  // 用户登录接口
  {
    url: "/api/user/login",
    method: "post",
    timeout: 2000,
    response: ({ body }) => {
      const { username, password } = body;
      const checkUser = createUserList().find(
        (item) => item.username === username && item.password === password
      );
      if (!checkUser)
        return { code: 201, data: { message: "账号或者密码不正确" } };
      const { token } = checkUser;
      return { code: 200, data: { token } };
    },
  },
  // 获取用户信息
  {
    url: "/api/user/info",
    method: "get",
    timeout: 2000,
    response: (request:any) => {
      const token = request.headers.token;
      const checkUser = createUserList().find((item) => item.token === token);
      if (!checkUser)
        return { code: 201, data: { message: "获取用户信息失败" } };
      return { code: 200, data: checkUser };
    },
  },
];
