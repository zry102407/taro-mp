import Taro from "@tarojs/taro";

import { AtInput, AtButton, AtIcon, AtCheckbox } from "taro-ui";
import { View, Image } from "@tarojs/components";
import "./login.scss";
import { Component } from "react";
import api from "../../service/api.service";

export default class Login extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      password: "",
      regCheck: false,
      checkboxOption: [
        {
          value: "pwdReg",
          label: "记住密码"
        }
      ]
    };
  }

  handleChange(key, value) {
    if (key === "account") {
      this.setState({
        account: value
      });
    } else if (key === "password") {
      this.setState({
        password: value
      });
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
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="login-body">
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
              <label className="reg-check">
                记住密码
                <input type="checkbox" value={this.state.regCheck} />
              </label>
              <a href="/dhxt/dhzc.aspx?tjm=">快速注册</a>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
