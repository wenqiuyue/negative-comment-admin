export default [
  //登录页
  {
    path: '/',
		name: '/',
    component: () => import('../../views/login/login.vue'),
  },
  //注册页
  {
    path: '/register',
		name: 'register',
    component: () => import('../../views/register'),
  },
  //忘记密码
  {
    path: '/forgot-password',
		name: 'forgot-password',
    component: () => import('../../views/forgot-password'),
  },
  //重置密码
  {
    path: '/password-reset',
		name: 'password-reset',
    component: () => import('../../views/password-reset'),
  },
  //修改密码加载页
  {
    path: '/email-loading',
		name: 'email-loading',
    component: () => import('../../views/setting/email-loading.vue'),
  },
	//首页
  {
    path: '/',
    name: 'layout',
    component: () => import('../../views/layout/layout.vue'),
    children: [
      //首页
      {
        path: '/home',
        name: 'home',
        meta:{title:'Home'},
        component: () => import('../../views/home/home.vue'),
      },
      //数据
      {
        path: '/analystics',
        name: 'analystics',
        meta:{title:'Analystics'},
        component: () => import('../../views/analystics'),
      },
      //评论回复
      {
        path: '/reviews',
        name: 'reviews',
        meta:{title:'Reviews'},
        component: () => import('../../views/reviews'),
      },
      //验证
      {
        path: '/verification',
        name: 'verification',
        meta:{title:'Verification'},
        component: () => import('../../views/verification'),
      },
      //验证
      {
        path: '/setting',
        name: 'setting',
        meta:{title:'Setting'},
        component: () => import('../../views/setting'),
      },
    ]
  }
]
