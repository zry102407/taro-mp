import { Component } from "react";
import { View, Image, Text } from "@tarojs/components";
import Taro from '@tarojs/taro'

import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./detail.scss";

export default class Detail extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  back() {
    Taro.navigateBack()
  }

  render() {
    return (
      <View className='detail-box'>
        <View className="detail-top">
          <Text onClick={this.back} className="back-icon"></Text>
          <Text>商品详情</Text>
        </View>
        <View className="detail-body">
          <View className="serve-item at-row">
            <div className="serve-title">热线电话：</div>
            <div className="at-col at-col--auto">400800888</div>
          </View>
          <View className="serve-item at-row">
            <div className="serve-title">在线时间：</div>
            <div className="at-col at-col--auto">07:00-22:00 *7</div>
          </View>
        </View>
      </View>
    );
  }
}
