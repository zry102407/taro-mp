import Taro from "@tarojs/taro";

import { AtInput, AtButton, AtIcon, AtMessage, AtCheckbox } from "taro-ui";
import { View, Image } from "@tarojs/components";
import "./login.scss";
import { Component } from "react";
import api from "../../service/api.service";
import utils from '../../utils/utils'

export default class Login extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      password: "",
      regCheck: true,
      checkedList: [],
      checkboxOption: [
        {
          value: "pwdReg",
          label: "记住密码"
        }
      ]
    };
  }

  handleChange(key, value) {
    switch(key) {
      case 'account':
        this.setState({
          account: value
        });
        break;
      case 'password':
        this.setState({
          password: value
        });
        break;
      case 'checkedList':
        this.setState({
          checkedList: value
        });
        break;
      default:
        break;
    }
    return value;
  }

  onLogin() {
    const params = {
      account: this.state.account,
      password: this.state.password
    };
    api
      .login(params)
      .then(res => {
        if (res && res.data && res.data.success) {
          if (this.state.regCheck) {
            utils.storage.set('checked_list',  this.state.checkedList)
            utils.storage.set('account_info', {account: this.state.account, password: this.state.password})
          }
          utils.storage.set('login_info', res.data.data)
          // Taro.navigateTo({
          //   url: '/pages/index/index'
          // })
          Taro.navigateBack()
        }
      })
      .catch(error => {
        console.log(error)
        Taro.atMessage({
          message: '登录失败，请稍后重试',
          type: 'error'
        })
      });
  }

  componentWillMount() {}

  componentDidMount() {
    const accountInfo = utils.storage.get('account_info')
    const checkedList = utils.storage.get('checked_list')
    this.setState({
      checkedList,
      ...accountInfo
    })
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="login-body">
        <AtMessage />
        <View className="login-bg">
          <Image
            src={require("../../assets/bg_userinfo.png")}
            mode="widthFix"
          ></Image>
        </View>
        <View className="login-box">
          <View className="login-logo">
            <Image
              src={require("../../assets/xxclogo.png")}
              mode="widthFix"
            ></Image>
          </View>
          <View className="login-form">
            <View className="login-input at-row">
              <AtIcon value="iphone" size="30" color="#7f848f"></AtIcon>
              <AtInput
                name="value"
                title=""
                className="at-col at-col--auto"
                border={false}
                type="text"
                placeholder="请输入手机号"
                value={this.state.account}
                onChange={this.handleChange.bind(this, "account")}
              />
            </View>
            <View className="login-input at-row">
              <AtIcon value="lock" size="30" color="#7f848f"></AtIcon>
              <AtInput
                name="value"
                title=""
                className="at-col at-col--auto"
                border={false}
                type="password"
                placeholder="请输入密码"
                value={this.state.password}
                onChange={this.handleChange.bind(this, "password")}
              />
            </View>
            <AtButton className="login-btn" onClick={this.onLogin.bind(this)}>
              登 录
            </AtButton>
            <View className="login-reg">
              {/* <label className="reg-check">
                记住密码
                <input type="checkbox" value={this.state.regCheck} onChange={() => {this.handleChange('regCheck', this)}} />
              </label> */}
              <AtCheckbox className="reg-check" options={this.state.checkboxOption} selectedList={this.state.checkedList} onChange={this.handleChange.bind(this, 'checkedList')}></AtCheckbox>
              <a href="/dhxt/dhzc.aspx?tjm=">快速注册</a>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
