export default {
  pages: [
    'pages/index/index'
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
        pagePath: 'pages/index/classify',
        text: '分类'
      },
      {
        pagePath: 'pages/index/cart',
        text: '购物车'
      },
      {
        pagePath: 'pages/index/alwaysBut',
        text: '常购'
      },
      {
        pagePath: 'pages/index/userCenter',
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
