import Taro from "@tarojs/taro";
import { Component } from "react";
import { View, Text, Swiper, SwiperItem } from "@tarojs/components";
import { AtSearchBar, AtTabs, AtTabsPane } from "taro-ui";

import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./classify.scss";
import TabBar from "../../custom-tab-bar/custom-tab-bar";
import TreeSelect from "../../components/tree-select/tree-select";
import api from "../../service/api.service";
import utils from "../../utils/utils";

export default class Classify extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      myList: [
        {
          id: "1212121",
          title: "日用品",
          children: [
            {
              id: "32232312",
              title: "洗发水"
            },
            {
              id: "3234232",
              title: "洗发水1"
            },
            {
              id: "32243132",
              title: "洗发水2"
            },
            {
              id: "2131212312",
              title: "洗发水3"
            }
          ]
        },
        {
          id: "121212w2221",
          title: "服务",
          children: [
            {
              id: "3223222222312",
              title: "洗发水222"
            },
            {
              id: "3234232342432",
              title: "洗发水3331"
            },
            {
              id: "32243342132",
              title: "洗发水4442"
            },
            {
              id: "123232113324524",
              title: "洗发水3555"
            }
          ]
        },
        {
          id: "121212w2221",
          title: "服务333",
          children: [
            {
              id: "322322222231332",
              title: "洗发水233322"
            },
            {
              id: "323423234243222",
              title: "洗发水3333331"
            },
            {
              id: "322433421322",
              title: "洗发水3334442"
            },
            {
              id: "1232321133224524",
              title: "洗发水3533355"
            }
          ]
        }
      ],
      value: "",
      tabList: [],
      current: 0,
      storeInfo: {},
      currentClassify: 0
    };
  }
  componentWillMount() {}

  componentDidMount() {
    // this.getClassifyList()
  }

  componentWillUnmount() {}

  componentDidShow() {
    this.getClassifyList()
  }

  componentDidHide() {}

  init() {
    const storeInfo = utils.storage.get("store_info");
    if (storeInfo) {
      this.setState(
        {
          storeInfo
        },
        () => {
          this.getClassifyList();
        }
      );
    }
  }

  getClassifyList() {
    const params = {
      sybdm: this.state.storeInfo.sybdm || 9999,
      khdm: this.state.storeInfo.khdm || 900183000003
    }
    api.getClassifyList(params).then(res => {
      console.log(res)
      this.getSubClassifyList();
    }).catch(error => {
      Taro.atMessage({
        message: '获取分类失败，请稍后重试',
        type: 'error'
      })
    })
  }

  getSubClassifyList() {
    const params = {
      sybdm: this.state.storeInfo.sybdm || 9999,
      khdm: this.state.storeInfo.khdm || 900183000003,
      YJCPLBDM: this.state.current
    }
    api.getSubClassifyList(params).then(res => {
      console.log(res)
    }).catch(error => {
      Taro.atMessage({
        message: '获取分类失败，请稍后重试',
        type: 'error'
      })
    })
  }

  handleChange() {}

  doSearch() {
    Taro.navigateTo({
      url: "/pages/search/search"
    });
  }

  handleTabClick() {}

  render() {
    const tabPanes = this.state.tabList.map((item, index) => {
      return <AtTabsPane current={this.state.current} index={index}>{item.CPLBMC}</AtTabsPane>
    })
    return (
      <View className='classify'>
        <View className='search-top' onClick={this.doSearch}>
          <AtSearchBar value={this.state.value} onChange={this.handleChange} />
        </View>
        <View className='tab-box'>
          <AtTabs
            current={this.state.current}
            tabList={this.state.tabList}
            onClick={this.handleTabClick.bind(this)}
          >
            {tabPanes}
          </AtTabs>
        </View>
        <TreeSelect list={this.state.myList} />
        <TabBar></TabBar>
      </View>
    );
  }
}
