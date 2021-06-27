import Taro from '@tarojs/taro'
import { Component } from "react";
import { View, Image } from "@tarojs/components";
import { AtIcon, AtInput } from "taro-ui";
import "./home-header.scss";

interface homeHeaderType {
  searchValue: string;
  height: number;
}

export default class HomeHeader extends Component<{}, homeHeaderType> {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      height: 47
    };
  }

  componentDidMount() {}

  toServe() {
    Taro.navigateTo({
      url: '/pages/serve/serve'
    })
  }

  searchChange() {}

  render() {
    return (
      <>
        <View
          className="header-box at-row"
          style={{ height: this.state.height + "px" }}
        >
          <View className="header-icon">
            <Image
              style={{ marginTop: "-4px" }}
              className="header-image"
              src={require("../../assets/icon_gps.png")}
              mode="widthFix"
            ></Image>
          </View>
          <View className="header-search at-col at-col--auto">
            <Image
              className="header-image search-icon"
              src={require("../../assets/icon_search.png")}
              mode="widthFix"
            ></Image>
            <AtInput
              className="search-input"
              name=""
              border={false}
              value={this.state.searchValue}
              onChange={this.searchChange.bind(this)}
              placeholder="输入商品名称"
            />
          </View>
          <View className="header-icon">
            <Image
              onClick={this.toServe}
              style={{ marginTop: "-1px" }}
              className="header-image"
              src={require("../../assets/icon_serve.png")}
              mode="widthFix"
            ></Image>
          </View>
        </View>
      </>
    );
  }
}
