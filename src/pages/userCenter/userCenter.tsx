import { Component } from "react";
import { View, Image } from "@tarojs/components";
import { AtAvatar } from "taro-ui";

import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./userCenter.scss";

export default class UserCenter extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      bannerList: [1, 2, 3]
    };
  }
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className='user-center'>
        <View className='user-top'>
          <Image
            src={require("../../assets/bg_userinfo.png")}
            mode='widthFix'
          ></Image>
          <View className='user-icon'>
            <AtAvatar
              circle
              image={require("../../assets/default_head.png")}
            ></AtAvatar>
            <p className="user-name">冰梦烧烤</p>
          </View>
        </View>
      </View>
    );
  }
}
