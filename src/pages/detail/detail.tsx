import { Component } from "react";
import { View, Image, Text, Swiper, SwiperItem } from "@tarojs/components";
import { AtButton, AtIcon, AtBadge } from "taro-ui";
import Taro, { getCurrentInstance } from "@tarojs/taro";

import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./detail.scss";
import api from "../../service/api.service";
import utils, { theme } from "../../utils/utils";

export default class Detail extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      detail: {},
      loginInfo: {},
      itemId: 0,
      theme: theme
    };
  }

  current = getCurrentInstance();

  componentWillMount() {}

  componentDidMount() {
    // this.init();
  }

  componentWillUnmount() {}

  componentDidShow() {
    this.init();
  }

  componentDidHide() {}

  init() {
    const loginInfo = utils.storage.get("login_info");
    if (loginInfo && loginInfo.token) {
      this.setState(
        {
          loginInfo,
          itemId: this.current.router.params.itemId
        },
        () => {
          this.getDetail();
        }
      );
    } else {
      Taro.navigateTo({
        url: "/pages/login/login"
      });
    }
  }

  getDetail() {
    const params = {
      sybdm: this.state.loginInfo.sybdm || "",
      khdm: this.state.loginInfo.khdm || "",
      PH: this.state.itemId
    };
    api
      .getDetail(params)
      .then(res => {
        console.log(res);
        this.setState({
          detail: res.data.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleCarClick() {
    Taro.navigateTo({
      url: '/pages/cart/cart'
    })
  }

  back() {
    Taro.navigateBack();
  }

  render() {
    const { detail } = this.state;
    const theme = utils.storage.get("theme") || this.state.theme;
    return (
      <View className='detail-box'>
        <View className='detail-top'>
          <Text onClick={this.back} className='back-icon'></Text>
          <Text>商品详情</Text>
        </View>
        <Swiper className='detail-swiper' autoplay>
          {detail.TPWJ
            ? detail.TPWJ.map(item => {
                return (
                  <SwiperItem key={item}>
                    <img src={`${item}`} alt='...' />
                  </SwiperItem>
                );
              })
            : null}
        </Swiper>
        <View className='detail-desc-top'>
          <View className='detail-title'>{detail.PM}</View>
          <View className='detail-num'>库存{detail.KCSL}</View>
        </View>
        <View className='detail-gg'>
          <View className='gg-item'>
            <View className='gg-item'>
              <Text className='price'>¥30.00/包</Text>
              <Text>库存15.00</Text>
              <Text className='num-count'>
                <i
                  style={{ backgroundColor: theme }}
                  className='count-icon icon-substract'
                  color='#fff'
                ></i>
                <Text>0</Text>
                <i
                  style={{ backgroundColor: theme }}
                  className='count-icon icon-plus'
                  color='#fff'
                ></i>
              </Text>
            </View>
          </View>
        </View>
        <View className='detail-desc'>商品详情：{detail.SPMS}</View>
        <View className='detail-bottom at-row'>
          <View className='bottom-left at-col at-col--auto'>
            <View className='fun-icon'>
              <View>
                <AtIcon value="heart"></AtIcon>
              </View>
              <Text>加入常购</Text>
            </View>
            <View className='fun-icon' onClick={() => {this.handleCarClick()}}>
              <View>
                <AtBadge value={0}>
                  <AtIcon value="shopping-cart"></AtIcon>
                </AtBadge>
              </View>
              <Text>购物车</Text>
            </View>
          </View>
          <AtButton
            className='buy-btn'
            customStyle={{ backgroundColor: theme }}
          >
            立即购买
          </AtButton>
        </View>
      </View>
    );
  }
}
