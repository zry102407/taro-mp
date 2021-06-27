import React, { Component } from "react";
import { View } from "@tarojs/components";
import { AtInput, AtIcon } from "taro-ui";
import "./search-box.scss";

export default class SearchBox extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleChange() {}

  render() {
    return (
      <View className='search-box at-row'>
        <View className='icon-box'>
          <View className='back-icon'></View>
        </View>
        <View className='search-input at-col at-col--auto'>
          <AtInput
            name='value'
            placeholder='搜索想要的商品'
            value={this.state.value}
            onChange={this.handleChange}
          ></AtInput>
          <AtIcon
            className='search-icon'
            value='search'
            size='24'
            color='#9a9a9a'
          ></AtIcon>
        </View>
      </View>
    );
  }
}
