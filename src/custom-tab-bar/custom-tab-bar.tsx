import { Component } from "react";
import { AtTabBar } from "taro-ui";
import "./custom-tab-bar.scss";

export default class TabBar extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
  }

  handleClick(value) {
    this.setState({
      current: value
    });
  }

  render() {
    return (
      <AtTabBar
        fixed
        tabList={[
          { title: "待办事项", text: 8 },
          { title: "拍照" },
          { title: "通讯录", dot: true }
        ]}
        onClick={this.handleClick.bind(this)}
        current={this.state.current}
      />
    );
  }
}
