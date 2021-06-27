import { Component } from "react";
import { View, Image, Swiper, SwiperItem } from "@tarojs/components";
import { AtIcon, AtInput } from "taro-ui";
import "./home-notice.scss";

interface homeNoticeType {
  searchValue: string;
  height: number;
  iconHeight: number;
  noticeList: any[];
}

export default class HomeNotice extends Component<
  { noticeList: any[] },
  homeNoticeType
> {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      height: 37,
      iconHeight: 20,
      noticeList: []
    };
  }

  componentDidMount() {}

  componentDidShow() {}

  searchChange() {}

  render() {
    const noticeList = this.props.noticeList || [];
    const swipterItems = noticeList.map(item => {
      return (
        <SwiperItem className='swiper-item' key={item.CPXLDM}>
          {item.name}
        </SwiperItem>
      );
    });
    return (
      <>
        <View
          className='notice-box'
          style={{
            height: this.state.height + "px",
            lineHeight: this.state.height + "px"
          }}
        >
          <Image
            className='notice-icon'
            style={{
              height: this.state.iconHeight + "px",
              width: this.state.iconHeight + "px",
              top: "8px"
            }}
            src={require("../../assets/icon_horn.png")}
            mode='heightFix'
          ></Image>
          <Swiper
            className='notice-msg'
            circular
            autoplay
            vertical
            style={{ marginLeft: this.state.iconHeight + "px" }}
          >
            {swipterItems}
          </Swiper>
        </View>
      </>
    );
  }
}
