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
import api from "../../service/api.service";

export default class Index extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      bannerList: [],
      theme: '#fe7646',
      gridList: [],
      advList: []
    };
  }
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {
    this.getConfig()
  }

  componentDidHide() {}

  getConfig () {
    api.getIndexConfig().then(res => {
      if (res && res.data) {
        this.setState({
          theme: res.data.data.color,
          bannerList: (res.data.data.list.find(item => {
            return item.CSSType === 'slide'
          }) || {}).Arry,
          noticeList: (res.data.data.list.find(item => {
            return item.CSSType === 'Notice'
          }) || {}).Arry,
          gridList: (res.data.data.list.find(item => {
            return item.CSSType === 'grid'
          }) || {}).Arry,
          advList: (res.data.data.list.find(item => {
            return item.CSSType === 'titimg'
          }) || {}).Arry
        })
      }
    }).catch(error => {
      console.log(error)
    })
  }

  render() {
    const swiperItems = this.state.bannerList.map(item => {
      return (
        <SwiperItem key={item.CPXLDM}>
          <img src={`${item.titleImg}`} alt="" />
        </SwiperItem>
      );
    });
    return (
      <View className="index">
        <HomeHeader></HomeHeader>
        <Swiper className="lingding-swiper" circular autoplay>
          {swiperItems}
        </Swiper>
        <HomeNotice noticeList={this.state.noticeList}></HomeNotice>
        <HomeClassify gridList={this.state.gridList} advList={this.state.advList}></HomeClassify>
        <HomeFavorite></HomeFavorite>
        <TabBar></TabBar>
      </View>
    );
  }
}
