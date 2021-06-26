import { Component } from "react";
import { View, Image } from "@tarojs/components";
import "./home-classify.scss";

export default class HomeClassify extends Component<{}, any> {
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
        <View className="home-classify">
          <View className="classify-box at-row">
            <View className="at-col classify-item">
              <Image
                src={require("../../assets/101.png")}
                mode="widthFix"
              ></Image>
              <p>海鲜串</p>
            </View>
            <View className="at-col classify-item">
              <Image
                src={require("../../assets/112.png")}
                mode="widthFix"
              ></Image>
              <p>肉串</p>
            </View>
            <View className="at-col classify-item">
              <Image
                src={require("../../assets/123.png")}
                mode="widthFix"
              ></Image>
              <p>调味串</p>
            </View>
            <View className="at-col classify-item">
              <Image
                src={require("../../assets/134.png")}
                mode="widthFix"
              ></Image>
              <p>小把串</p>
            </View>
          </View>
          <View className="recharge-box">
            <Image
              src={require("../../assets/img_Recharge.png")}
              mode="widthFix"
            ></Image>
          </View>
        </View>
      </>
    );
  }
}
