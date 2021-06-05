import { Component } from "react";
import { View, Image } from "@tarojs/components";
import "./home-favorite.scss";

export default class HomeFavorite extends Component<{}, any> {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      height: 37,
      iconHeight: 20
    };
  }

  componentDidMount() {}

  searchChange() {}

  render() {
    return (
      <>
        <View
          className="notice-box"
          style={{
            height: this.state.height + "px",
            lineHeight: this.state.height + "px"
          }}
        ></View>
      </>
    );
  }
}
