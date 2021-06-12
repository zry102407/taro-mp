import { Component } from "react";
import { View, Text, Swiper, SwiperItem } from "@tarojs/components";

import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./classify.scss";
import TabBar from "../../custom-tab-bar/custom-tab-bar";

export default class Classify extends Component<any, any> {
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
    return <View className="classify"></View>;
  }
}
