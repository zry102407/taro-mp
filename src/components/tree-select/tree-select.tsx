import Taro from "@tarojs/taro";
import { Component } from "react";
import { View, Text, Image, ScrollView } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import classNames from "classnames";
import "./tree-select.scss";
import utils, { theme } from "../../utils/utils";

class TreeSelect extends Component<any, any> {
  constructor(props) {
    super(props);
    this.onDialogConfirm = this.onDialogConfirm.bind(this);
  }
  state = {
    isActive: 0,
    rightList: [],
    selectedList: [],
    theme: theme
  };
  static defaultProps = {
    list: [],
    confirmText: "保存",
    showConfirm: true // 是否显示确定按钮
  };

  componentDidMount() {
    const { list, rightList } = this.props;
  }
  // 确认事件
  onDialogConfirm() {
    const { onConfirm } = this.props;
    const { selectedList } = this.state;
    if (typeof onConfirm === "function") {
      onConfirm(selectedList);
    }
  }
  selectLeft(classify, index) {
    this.props.selectTab(classify);
    this.setState({
      isActive: index
    });
  }
  loadMore() {
    this.props.loadMore();
  }
  itemSelected(item) {
    Taro.navigateTo({
      url: `/pages/detail/detail?itemId=${item.mdph}`
    });
  }
  render() {
    const { list, rightList, styles, hasMore } = this.props;
    const { isActive, selectedList } = this.state;
    const theme = utils.storage.get("theme") || this.state.theme;
    return (
      <View style={{ ...styles, height: "calc(100vh - 165px)" }}>
        <View className="treeSelect">
          {/* left-father */}
          <View className="treeSelect-left">
            {list &&
              list.map((item, index) => (
                <View
                  key={item.CPLBDM}
                  className={classNames(
                    "leftBtn",
                    { active: isActive === index },
                    { activeA: isActive === index + 1 },
                    { activeB: isActive === index - 1 }
                  )}
                  onClick={() => {
                    this.selectLeft(item.CPLBDM, index);
                  }}
                >
                  {item.CPLBMC}
                </View>
              ))}
          </View>
          {/* right-children */}
          <ScrollView
            scrollY
            onScrollToLower={() => {
              this.loadMore();
            }}
            className="treeSelect-right"
          >
            {rightList &&
              rightList.map((item, index) => (
                <View
                  key={item.mdph || index}
                  className={classNames("list-item at-row", {
                    active: selectedList.includes(item.CPLBDM)
                  })}
                  onClick={() => {
                    this.itemSelected(item);
                  }}
                >
                  <Image src={`${item.TPWJ}`} className="item-img"></Image>
                  <View className="at-col at-col--auto item-detail">
                    <View className="item-title">{item.PM}</View>
                    <View className="item-desc">{item.GG}</View>
                    <View className="item-price" style={{ color: theme }}>
                      ¥{Number(item.ylxsdj || 0).toFixed(2)}/{item.CGDW}
                    </View>
                    <View className="item-choose" style={{ background: theme }}>
                      选择规格
                    </View>
                  </View>
                </View>
              ))}
            {!hasMore && (
              <View className="no-more">
                <Text>没有更多了</Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default TreeSelect;
