import { Component } from "react";
import { View, Image } from "@tarojs/components";
import "./home-favorite.scss";

export default class HomeFavorite extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      itemList: [1, 2, 3]
    };
  }

  componentDidMount() {}

  searchChange() {}

  render() {
    const items = this.state.itemList.map(item => {
      return (
        <View className="at-col good-item at-col-6" key={item}>
          <Image
            src={require("../../assets/xxclogo.png")}
            mode="widthFix"
          ></Image>
          <p className="item-name">烤事君小黄鱼串</p>
          <p className="item-price">登陆可见价格</p>
        </View>
      );
    });
    return (
      <>
        <View className="favorite-box">
          <Image
            className="favorite-icon"
            mode="widthFix"
            src={require("../../assets/title_xi.png")}
          ></Image>
          <View className="at-row at-row--wrap item-container">{items}</View>
        </View>
      </>
    );
  }
}
