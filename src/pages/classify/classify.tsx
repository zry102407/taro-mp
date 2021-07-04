import Taro from "@tarojs/taro";
import { Component } from "react";
import { View, Text, Swiper, SwiperItem } from "@tarojs/components";
import { AtInput, AtIcon, AtTabs, AtTabsPane } from "taro-ui";

import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./classify.scss";
import TabBar from "../../custom-tab-bar/custom-tab-bar";
import TreeSelect from "../../components/tree-select/tree-select";
import api from "../../service/api.service";
import utils from "../../utils/utils";
import { rearg } from "lodash";

export default class Classify extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      myList: [],
      value: "",
      tabList: [],
      rightList: [],
      current: 0,
      storeInfo: {},
      currentClassify: 0,
      loginInfo: {},
      page: 1,
      hasMore: true
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
    const loginInfo = utils.storage.get("login_info") || {};
    if (loginInfo) {
      this.setState(
        {
          loginInfo
        },
        () => {
          this.getClassifyList();
        }
      );
    }
  }

  getClassifyList() {
    const params = {
      sybdm: this.state.storeInfo.sybdm || "",
      khdm: this.state.storeInfo.khdm || ""
    };
    api
      .getClassifyList(params)
      .then(res => {
        res.data.data.forEach(item => {
          item.title = item.CPLBMC;
        });
        this.setState({
          tabList: res.data.data,
          current: this.state.current
        });
        this.getSubClassifyList();
      })
      .catch(error => {
        Taro.atMessage({
          message: "获取分类失败，请稍后重试",
          type: "error"
        });
      });
  }

  getSubClassifyList() {
    const params = {
      sybdm: this.state.storeInfo.sybdm || "",
      khdm: this.state.storeInfo.khdm || "",
      YJCPLBDM: this.state.tabList[this.state.current].CPLBDM
    };
    api
      .getSubClassifyList(params)
      .then(res => {
        res.data.data.forEach(item => {
          item.title = item.CPLBMC;
          item.id = item.CPLBDM;
        });
        this.setState(
          {
            myList: res.data.data,
            currentClassify: res.data.data[0].CPLBDM,
            hasMore: true,
            page: 1
          },
          () => {
            this.getItemList(this.state.currentClassify);
          }
        );
      })
      .catch(error => {
        Taro.atMessage({
          message: "获取分类失败，请稍后重试",
          type: "error"
        });
      });
  }

  getItemList(currentClassify) {
    let page = this.state.page;
    const params = {
      sybdm: this.state.storeInfo.sybdm || "",
      khdm: this.state.storeInfo.khdm || "",
      YJCPLBDM: this.state.tabList[this.state.current].CPLBDM,
      CPLBDM: currentClassify,
      pageIndex: page
    };
    api.getItemList(params).then(res => {
      if (res.data.data.length) {
        const rightList = this.state.rightList;
        this.setState({
          rightList: rightList.concat(res.data.data),
          page: ++page,
          hasMore: res.data.data.length >= 20
        });
      }
    });
  }

  loadMore() {
    if (!this.state.hasMore) {
      return;
    }
    this.getItemList(this.state.currentClassify);
  }

  doSearch() {
    Taro.navigateTo({
      url: "/pages/search/search"
    });
  }

  handleTabClick(value) {
    this.setState(
      {
        current: value
      },
      () => {
        this.getSubClassifyList();
      }
    );
  }

  render() {
    return (
      <View className='classify'>
        <View className='search-top' onClick={this.doSearch}>
          <AtInput
            name='value'
            placeholder='搜索想要的商品'
            value={this.state.value}
            onChange={this.doSearch}
          ></AtInput>
          <AtIcon
            value='search'
            color='#9a9a9a'
            className='search-icon'
          ></AtIcon>
        </View>
        <View className='tab-box'>
          <AtTabs
            scroll
            current={this.state.current}
            tabList={this.state.tabList}
            onClick={this.handleTabClick.bind(this)}
          ></AtTabs>
        </View>
        <TreeSelect
          list={this.state.myList}
          rightList={this.state.rightList}
          selectTab={classify => {
            this.getItemList(classify);
          }}
          hasMore={this.state.hasMore}
          loadMore={() => {
            this.loadMore();
          }}
        />
        <TabBar current={1}></TabBar>
      </View>
    );
  }
}
