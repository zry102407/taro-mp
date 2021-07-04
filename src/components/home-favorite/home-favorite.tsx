import { Component } from "react";
import { View, Image } from "@tarojs/components";
import "./home-favorite.scss";
import utils, { theme } from "../../utils/utils";
import api from "../../service/api.service";

export default class HomeFavorite extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      itemList: [],
      theme: theme
    };
  }

  componentDidMount() {
    this.getModuleItemList();
  }

  componentDidShow() {}

  getModuleItemList() {
    api
      .getModuleItemList({ CPXLDM: 10 })
      .then(res => {
        if (res.data.success) {
          this.setState({
            itemList: res.data.data
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const loginInfo = utils.storage.get("login_info");
    const theme = utils.storage.get("theme") || this.state.theme;
    const items = this.state.itemList.map(item => {
      return (
        <View className='at-col good-item at-col-6' key={item}>
          <Image
            src={require("../../assets/xxclogo.png")}
            mode='widthFix'
          ></Image>
          <p className='item-name'>烤事君小黄鱼串</p>
          {loginInfo ? (
            <View className='item-price' style={{ color: theme }}>
              ¥{Number(item.ylxsdj || 0).toFixed(2)}
            </View>
          ) : (
            <p className='item-price'>登陆可见价格</p>
          )}
        </View>
      );
    });
    return (
      <>
        <View className='favorite-box'>
          <Image
            className='favorite-icon'
            mode='widthFix'
            src={require("../../assets/title_xi.png")}
          ></Image>
          <View className='at-row at-row--wrap item-container'>{items}</View>
        </View>
      </>
    );
  }
}
