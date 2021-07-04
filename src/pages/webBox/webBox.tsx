import { Component } from "react";
import { View, WebView } from "@tarojs/components";
import Taro, { getCurrentInstance } from "@tarojs/taro";

import "taro-ui/dist/style/components/button.scss"; // 按需引入
import utils from "../../utils/utils";

export default class WebViewCom extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  current = getCurrentInstance();

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  back() {
    Taro.navigateBack();
  }

  render() {
    let link = this.current.router.params.link;
    const loginInfo = utils.storage.get('login_info')
    if (link.indexOf('?') > -1) {
      link = `${link}&token=${loginInfo.token}`
    } else {
      link = `${link}?token=${loginInfo.token}`
    }
    return (
      <View className='web-view'>
        <WebView src={link}></WebView>
      </View>
    );
  }
}
