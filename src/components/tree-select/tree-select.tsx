import Taro from '@tarojs/taro';
import { Component } from 'react';
import { View, Button } from '@tarojs/components';
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
                                  className={classNames('rightBtn', { active: selectedList.includes(item.id) })}
                                  onClick={() => {this.addSelected(item.id);}}
                                >
                                    <View>{item.title}</View>
                                    <View style={{ display: selectedList.includes(item.id) ? 'flex' : 'none' }} className='checkIcon'>
                                        <AtIcon value='check' size={32} color='rgb(58,110,244)' />
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
