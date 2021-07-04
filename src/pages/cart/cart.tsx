import { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Swiper, SwiperItem } from "@tarojs/components";
import { AtButton, AtCheckbox } from "taro-ui";

import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./cart.scss";
import TabBar from "../../custom-tab-bar/custom-tab-bar";
import utils, { theme } from "../../utils/utils";

export default class Cart extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      itemList: [],
      editStatus: false,
      theme: theme,
      checkedList: [],
      checkboxOption: [
        {
          value: "all",
          label: "全选"
        }
      ],
      itemCheckedList: []
    };
  }
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {
    this.init();
  }

  componentDidHide() {}

  init() {
    const loginInfo = utils.storage.get("login_info");
    if (loginInfo && loginInfo.token) {
      this.setState({
        loginInfo
      });
    } else {
      Taro.navigateTo({
        url: "/pages/login/login"
      });
    }
  }

  handleEmptyClick() {
    Taro.navigateTo({
      url: "/pages/classify/classify"
    });
  }

  handleChange(value) {
    const itemCheckedList = this.state.itemList.map(item => {
      return item.PH;
    });
    this.setState({
      checkedList: value,
      itemCheckedList: itemCheckedList
    });
  }

  render() {
    return (
      <View className="cart">
        <View className="car-top">
          <Text>购物车</Text>
          <Text className="edit-icon">
            {this.state.editStatus ? "完成" : "编辑"}
          </Text>
        </View>
        {this.state.itemList.length ? (
          <View className="full-car"></View>
        ) : (
          <View className="empty-car">
            <View className="empty-title">购物车快饿瘪了T.T</View>
            <View>快给我挑点宝贝</View>
            <AtButton
              onClick={this.handleEmptyClick.bind(this)}
              className="empty-button"
              customStyle={{
                color: this.state.theme,
                borderColor: this.state.theme
              }}
            >
              去逛逛
            </AtButton>
          </View>
        )}
        <View className="car-bottom at-row">
          <AtCheckbox
            className="all-check"
            options={this.state.checkboxOption}
            selectedList={this.state.checkedList}
            onChange={this.handleChange.bind(this)}
          ></AtCheckbox>
          <View className="at-col at-col--auto">
            <Text>合计</Text>
            <Text className="total-price" style={{ color: this.state.theme }}>
              ¥0.00
            </Text>
          </View>
          <AtButton
            className="submit-btn"
            customStyle={{ background: this.state.theme }}
          >
            去提交订单
          </AtButton>
        </View>
        <TabBar current={2}></TabBar>
      </View>
    );
  }
}
