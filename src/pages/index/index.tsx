import { Component } from "react";
import { View, Text, Swiper, SwiperItem } from "@tarojs/components";
import { AtButton } from "taro-ui";

import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./index.scss";
import TabBar from "../../custom-tab-bar/custom-tab-bar";

export default class Index extends Component<any, any> {
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
    const swiperItems = this.state.bannerList.map(item => {
      const src = `../../assets/banner${item}.jpg`;
      return (
        <SwiperItem key={item}>
          <img src={require(`../../assets/banner${item}.jpg`)} alt="" />
        </SwiperItem>
      );
    });
    return (
      <View className="index">
        <Swiper
          className="lingding-swiper"
          indicatorColor="#999"
          indicatorActiveColor="#333"
          circular
          autoplay
        >
          {swiperItems}
          {/* <SwiperItem>
            <View className="demo-text-1">1</View>
          </SwiperItem>
          <SwiperItem>
            <View className="demo-text-2">2</View>
          </SwiperItem>
          <SwiperItem>
            <View className="demo-text-3">3</View>
          </SwiperItem> */}
        </Swiper>
      </View>
    );
  }
}
