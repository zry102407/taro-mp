import Taro from "@tarojs/taro";
import { Component } from "react";
import { AtTabBar } from "taro-ui";
import utils, { theme } from "./utils/utils";
import "./custom-tab-bar.scss";

export default class TabBar extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      current: props.current || 0,
      pageUrls: [
        { title: "主页", iconType: "home", pagePath: "/pages/index/index" },
        {
          title: "分类",
          iconType: "tag",
          pagePath: "/pages/classify/classify"
        },
        {
          title: "购物车",
          iconType: "shopping-cart",
          pagePath: "/pages/cart/cart"
        },
        {
          title: "常购",
          iconType: "bookmark",
          pagePath: "/pages/alwaysBuy/alwaysBuy"
        },
        {
          title: "我的",
          iconType: "user",
          pagePath: "/pages/userCenter/userCenter"
        }
      ],
      carNum: 0,
      theme: theme
    };
  }

  handleClick(value) {
    Taro.switchTab({
      url: this.state.pageUrls[value].pagePath
    });
  }

  componentDidShow() {
    this.setState({
      carNum: utils.storage.get("car_num") || 0
    });
  }

  render() {
    const tabList = this.state.pageUrls;
    const theme = utils.storage.get("theme") || this.state.theme;
    tabList[2].text = this.state.carNum;
    return (
      <AtTabBar
        fixed
        selectedColor={theme}
        tabList={tabList}
        onClick={this.handleClick.bind(this)}
        current={this.state.current}
      />
    );
  }
}
