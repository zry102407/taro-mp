import { Component } from "react";
import { View, Image } from "@tarojs/components";
import "./home-classify.scss";

export default class HomeClassify extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      height: 37,
      iconHeight: 20,
      gridList: props.gridList
    };
  }

  componentDidMount() {}

  componentDidShow() {}

  searchChange() {}

  render() {
    const gridList = this.props.gridList || [];
    const items = gridList.map(item => {
      return (
        <View className='at-col classify-item' key={item.CPXLDM}>
          <Image src={`${item.titleImg}`} mode='widthFix'></Image>
          <p>{item.name}</p>
        </View>
      );
    });
    const advList = this.props.advList || [];
    console.log(advList)
    const advs = advList.map(item => {
      return (
        <Image
          key={item.CPXLDM}
          src={`${item.titleImg}`}
          mode='widthFix'
        ></Image>
      );
    });
    return (
      <>
        <View className='home-classify'>
          <View className='classify-box at-row'>{items}</View>
          <View className='recharge-box'>
            {advs}
          </View>
        </View>
      </>
    );
  }
}
