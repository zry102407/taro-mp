import { Component } from "react";
import { View, Image, Text } from "@tarojs/components";

import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./alwaysBuy.scss";
import TabBar from "../../custom-tab-bar/custom-tab-bar";
import SearchBox from '../../components/search-box/search-box';
import api from "../../service/api.service";
import utils from "../../utils/utils";

export default class AlwaysBuy extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      itemList: []
    };
  }
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {
    this.getAlwaysBuy()
  }

  componentDidHide() {}

  getAlwaysBuy() {
    const loginInfo = utils.storage.get('login_info') || {}
    const params = {
      sybdm: loginInfo.sybdm,
      khdm: loginInfo.khdm,
      token: loginInfo.token
    }
    api.getAlwaysBuy(params).then(res => {
      if (res && res.data) {
        this.setState({
          itemList: res.data.data
        })
      }
    }).catch(error => {
      console.log(error)
    })
  }

  render() {
    const items = this.state.itemList.map(item => {
      return <View className="buy-item at-row" key={item.PH}>
      <Image className="item-pic" mode="widthFix" src={`${item.TPWJ}`}></Image>
      <View className="at-col at-col--auto">
        <Text className="item-title">{item.PM}</Text>
        <View>{item.GG}</View>
        <View>库存{item.KCSL}</View>
        <View className="item-bottom">
          <Text className="item-price">¥{item.XSDJ} /{item.CGDW}</Text>
          <Text className="item-button">选择规格</Text>
        </View>
      </View>
    </View>
    })
    return (
      <View className="always-buy">
        <SearchBox></SearchBox>
        <View className="buy-list">
          {items}
        </View>
        <TabBar current={3}></TabBar>
      </View>
    );
  }
}
