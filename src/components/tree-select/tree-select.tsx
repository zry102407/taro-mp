import Taro from '@tarojs/taro';
import { Component } from 'react';
import { View, Button, Image } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import classNames from 'classnames';
import './tree-select.scss';

class TreeSelect extends Component<any, any> {
    constructor(props) {
        super(props);
        this.onDialogConfirm = this.onDialogConfirm.bind(this);
    }
    state = {
        isActive: 0,
        rightList: [],
        selectedList: []
    }
    static defaultProps = {
        list: [],
        confirmText: '保存',
        showConfirm: true, // 是否显示确定按钮
    }

    componentDidMount() {
        const { list } = this.props;
        this.setState({
            rightList: list[0].children
        });
    }
    // 确认事件
    onDialogConfirm() {
        const { onConfirm } = this.props;
        const { selectedList } = this.state;
        if (typeof onConfirm === 'function') {
            onConfirm(selectedList);
        }
    }
    selectLeft(index) {
        const { list } = this.props;
        this.setState({
            rightList: list[index].children,
            isActive: index
        });
    }
    addSelected(id) {
        const { selectedList } = this.state;
        const newList = Array.from(new Set([...selectedList, id]));
        this.setState({
            selectedList: newList
        });
    }
    render() {
        const {
            list,
            styles
        } = this.props;
        const {
             isActive,
             rightList,
             selectedList
        } = this.state;
        return (
            <View style={{...styles, height: 'calc(100vh - 165px)'}}>
                <View className='treeSelect'>
                    {/* left-father */}
                    <View className='treeSelect-left'>
                        {list && list.map((item, index) =>
                            (
                                <View
                                  key={item.id}
                                  className={classNames('leftBtn',
                                        { active: isActive === index },
                                        { activeA: isActive === (index + 1) },
                                        { activeB: isActive === (index - 1) })
                                    }
                                  onClick={() => { this.selectLeft(index); }}
                                >
                                    {item.title}
                                </View>
                            )
                        )}
                    </View>
                    {/* right-children */}
                    <View className='treeSelect-right'>
                        {rightList && rightList.map((item) =>
                            (
                                <View
                                  key={item.id}
                                  className={classNames('list-item at-row', { active: selectedList.includes(item.id) })}
                                  onClick={() => {this.addSelected(item.id);}}
                                >
                                    <Image src={require('../../assets/xxclogo.png')} className="item-img"></Image>
                                    <View className="at-col at-col--auto item-detail">
                                      <View className="item-title">烤事君小黄鱼串</View>
                                      <View className="item-desc">5串*20包</View>
                                      <View className="item-price">¥10.00/包</View>
                                      <View className="item-choose">选择规格</View>
                                    </View>
                                </View>
                            )
                        )}
                    </View>
                </View>
            </View>
        );
    }
}

export default TreeSelect;
