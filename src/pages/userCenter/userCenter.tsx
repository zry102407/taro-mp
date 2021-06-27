import Taro from "@tarojs/taro";
import { Component } from "react";
import { View, Image, Text } from "@tarojs/components";
import { AtAvatar, AtIcon, AtList, AtListItem, AtMessage } from "taro-ui";
import TabBar from "../../custom-tab-bar/custom-tab-bar";
import utils from "../../utils/utils";
import api from "../../service/api.service";

import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./userCenter.scss";

export default class UserCenter extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      loginInfo: {},
      userInfo: {}
    };
  }
  componentWillMount() {
    this.init();
  }

  componentDidMount() {}

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
          loginInfo
        },
        () => {
          this.getUserInfo();
        }
      );
    } else {
      Taro.navigateTo({
        url: "/pages/login/login"
      });
    }
  }

  getUserInfo() {
    const params = {
      token: this.state.loginInfo.token,
      khdm: this.state.loginInfo.khdm
    };
    api
      .getUserInfo(params)
      .then(res => {
        this.setState({
          userInfo: res.data.data
        });
      })
      .catch(error => {
        Taro.atMessage({
          message: "获取用户信息失败，请稍后重试",
          type: "error"
        });
      });
  }

  handleServe() {
    Taro.navigateTo({
      url: "/pages/serve/serve"
    });
  }

  handleExit() {
    const params = {
      khdm: this.state.loginInfo.khdm,
      token: this.state.loginInfo.token
    };
    api
      .logout(params)
      .then(res => {
        utils.storage.removeItem("login_info");
        Taro.navigateTo({
          url: "/pages/index/index"
        });
      })
      .catch(error => {
        Taro.atMessage({
          message: "退出登录失败，请稍后重试",
          type: "error"
        });
      });
  }

  handleTab(type) {
    Taro.navigateTo({
      url: `/pages/webview/webview?type=${type}`
    });
  }

  handleTabClick(type) {
    switch (type) {
      case "退出系统":
        this.handleExit();
        break;
      case "联系客服":
        this.handleServe();
        break;
      default:
        this.handleTab(type);
        break;
    }
  }

  render() {
    let listItems = [];
    if (this.state.userInfo.menu) {
      listItems = this.state.userInfo.menu.map(item => {
        return (
          <AtListItem
            key={item.zmenuname}
            onClick={this.handleTabClick.bind(this, item.zmenuname)}
            className="user-tab-item"
            title={item.zmenuname}
            arrow="right"
            thumb={`${item.imgurl}`}
          />
        );
      });
    }
    return (
      <View className="user-center">
        <AtMessage></AtMessage>
        {this.state.userInfo.userinfo && (
          <>
            <View className="user-top">
              <Image
                src={require("../../assets/bg_userinfo.png")}
                mode="widthFix"
              ></Image>
              <View className="user-icon">
                <AtAvatar
                  circle
                  image={require("../../assets/default_head.png")}
                ></AtAvatar>
                <p className="user-name">{this.state.userInfo.userinfo.khmc}</p>
              </View>
            </View>
            <View className="account-info at-row">
              <View className="at-col info-item">
                <Text>余额（元）</Text>
                <p className="info-number">
                  {this.state.userInfo.userinfo.money}
                </p>
              </View>
              <View className="at-col info-item">
                <Text>积分</Text>
                <p className="info-number">
                  {this.state.userInfo.userinfo.score}
                </p>
              </View>
              <View className="at-col info-item">
                <Text>优惠券</Text>
                <p className="info-number">
                  {this.state.userInfo.userinfo.couponnum}
                </p>
              </View>
            </View>
            <View className="order-info at-row">
              <View className="at-col order-item">
                <AtIcon value="calendar" size="45" color="#f15233"></AtIcon>
                <p>全部</p>
              </View>
              <View className="at-col order-item">
                <AtIcon value="calendar" size="45" color="#f15233"></AtIcon>
                <p>待付款</p>
              </View>
              <View className="at-col order-item">
                <AtIcon value="calendar" size="45" color="#f15233"></AtIcon>
                <p>待发货</p>
              </View>
              <View className="at-col order-item">
                <AtIcon value="calendar" size="45" color="#f15233"></AtIcon>
                <p>待收货</p>
              </View>
            </View>
            <View className="user-tab">
              <AtList className="user-tab-list">
                {listItems}
                <AtListItem
                  onClick={this.handleTabClick.bind(this, "退出系统")}
                  className="user-tab-item"
                  title="退出系统"
                  arrow="right"
                  thumb={require("../../assets/ntcxt.png")}
                />
              </AtList>
            </View>
          </>
        )}
        <TabBar current={4}></TabBar>
      </View>
    );
  }
}
