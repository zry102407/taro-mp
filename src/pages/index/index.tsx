import { Component } from "react";
import { View, Text, Swiper, SwiperItem } from "@tarojs/components";
import { AtButton } from "taro-ui";

import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./index.scss";
import TabBar from "../../custom-tab-bar/custom-tab-bar";
import HomeHeader from "../../components/home-header/home-header";
import HomeNotice from "../../components/home-notice/home-notice";
import HomeClassify from "../../components/home-classify/home-classify";
import HomeFavorite from "../../components/home-favorite/home-favorite";

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
        <HomeHeader></HomeHeader>
        <Swiper className="lingding-swiper" circular autoplay>
          {swiperItems}
        </Swiper>
        <HomeNotice></HomeNotice>
        <HomeClassify></HomeClassify>
        <HomeFavorite></HomeFavorite>
      </View>
    );
  }
}
