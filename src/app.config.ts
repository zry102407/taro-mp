export default {
  pages: [
    'pages/index/index',
    'pages/classify/classify',
    'pages/cart/cart',
    'pages/alwaysBuy/alwaysBuy',
    'pages/userCenter/userCenter',
    'pages/login/login',
  ],
  tabBar: {
    custom: true,
    selectedColor: '#f15233',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '主页'
      },
      {
        pagePath: 'pages/classify/classify',
        text: '分类'
      },
      {
        pagePath: 'pages/cart/cart',
        text: '购物车'
      },
      {
        pagePath: 'pages/alwaysBuy/alwaysBuy',
        text: '常购'
      },
      {
        pagePath: 'pages/userCenter/userCenter',
        text: '我的'
      }
    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
}
