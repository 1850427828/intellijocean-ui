<template>
  <div>
    <vue-particles
      color="#3c3c3c"
      :particle-opacity="0.3"
      :particles-number="80"
      shape-type="circle"
      :particle-size="4"
      lines-color="#3c3c3c"
      :lines-width="1"
      :line-linked="true"
      :line-opacity="0.2"
      :lines-distance="260"
      :move-speed="3"
      :hover-effect="true"
      hover-mode="grab"
      :click-effect="true"
      click-mode="push"
      class="login-bg"
    >
    </vue-particles>
    <div id="page" class="site">
      <div class="container">
        <div class="login">
          <div class="hero">
            <h1>SparcFusion<br />Hello</h1>
            <!-- <p>如果你没有账号<br />可以<a href="#">点击这里</a>进行注册.</p> -->
            <p>
              Every encounter is a collision of souls,<br />
              a profound connection that transcends mere chance
            </p>
          </div>
          <div class="main">
            <div v-if="showTest">绑定账号</div>
            <form action="" v-if="isShow">
              <p>
                <input
                  type="text"
                  placeholder="用户名"
                  v-model="ruleForm.username"
                />
              </p>
              <p class="password">
                <input
                  type="password"
                  placeholder="密码"
                  v-model="ruleForm.password"
                />
                <i class="ri-eye-off-line"></i>
              </p>
              <p class="code">
                <input
                  type="text"
                  placeholder="验证码"
                  v-model="ruleForm.code"
                  class="codeInput"
                  @keyup.enter="submitForm(ruleForm)"
                />
                <el-image
                  class="codeImage"
                  :src="'data:image/jpg;base64,' + img"
                  @click="getCaptcha()"
                >
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </p>
              <p style="position: relative" >
                <input
                  type="button"
                  class="submit"
                  value="Login"
                  @click="submitForm(ruleForm)"
                />
                <a href="#" class="findPassword">找回密码</a>
              </p>
            </form>
            <form action="" v-else-if="showEmailForm"  >
              <p style="margin-top: 78px">
                <input
                  type="text"
                  placeholder="邮箱"
                  v-model="emailForm.email"
                />
              </p>
              <p class="code">
                <input
                  type="text"
                  placeholder="验证码"
                  v-model="emailForm.emailCode"
                  class="emailInput"
                  @keyup.enter="emailSubmitForm()"
                />
                <span class="emailCode" @click="getEmailCode()"
                  >发送验证码</span
                >
              </p>
              <p style="position: relative">
                <input
                  type="button"
                  class="submit"
                  value="Login"
                  @click="emailSubmitForm()"
                />
                <!-- <a href="#" class="findPassword">找回密码</a> -->
              </p>
            </form>
            <div v-else class="qrcode">
              <el-image :src="qrcodeImage">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
              <div class="flexPosition">使用微信扫一扫登录</div>
            </div>
            <div class="options">
              <div class="separator">
                <p>使用其他方式登录</p>
              </div>
              <ul>
                <li @click="giteeLogin()">
                  <a href="#"
                    ><img class="image" src="~@/assets/images/gitee.png" alt=""
                  /></a>
                </li>

                <li @click="getEmailUuid()">
                  <a href="#"
                    ><img class="image" src="~@/assets/images/email.png" alt=""
                  /></a>
                </li>
                <li @click="wechatLogin()">
                  <a href="#"
                    ><img
                      class="image"
                      src="~@/assets/images/WeChart.png"
                      alt=""
                  /></a>
                </li>
                <li @click="codeLogin()">
                  <a href="#"
                    ><img
                      class="image"
                      style="width: 34px"
                      src="~@/assets/images/back.png"
                      alt=""
                  /></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 

<script>
import {
  login,
  getCaptcha,
  giteeLogin,
  weChatLogin,
  weChatCheckScan,
  getEmailUuid,
  emailLogin,
} from "@/api/login";
import { setToken } from "@/utils/auth"; //存储token
import { webSocketInit } from "@/utils/webSocket"; //webSocket
export default {
  name: "login",
  data() {
    return {
      //是否展示验证码登录
      isShow: true,
      //是否展示扫码后显示的文字
      showTest: false,
      //是否展示邮箱登录
      showEmailForm: false,
      //提交表单
      ruleForm: {
        username: "15137504729",
        password: "123456",
        code: "",
        uuid: "",
      },
      //邮箱表单
      emailForm: { email: "", emailCode: "", emailUuid: "" },
      //表单绑定微信验证id
      qrCodeId: "",
      //验证码图片
      img: "",
      //二维码图片
      qrcodeImage: "",
      //webSocket返回的对象
      webSocket: null,
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
    };
  },



  mounted() {
    this.getCaptcha();
  },
  destroyed() {
    if (this.webSocket != null) {
      if (this.webSocket.readyState == 1) {
        // 手动关闭
        this.webSocket.close();
      }
    }
  },
  methods: {
    //获取验证码
    async getCaptcha() {
      try {
        const res = await getCaptcha();
        console.log(res);
        this.img = res.data.img;
        this.ruleForm.uuid = res.data.uuid;
      } catch (error) {
        console.log(error.message);
      }
    },

    //登录按钮
    async submitForm() {
      let ruleForm = this.ruleForm;
      if (this.showTest) {
        ruleForm.wxScanUuid = this.qrCodeId;
      }
      console.log(ruleForm);
      try {
        const res = await login(ruleForm);
        this.$message.success("登陆成功");
        console.log(res);
        setToken(res.data);
        // localStorage.setItem("userId", res.data.id);
        this.$router.push({
          path: "/home",
        });
      } catch (error) {
        // 刷新验证码
        this.getCaptcha();
        this.ruleForm.code=""
        console.log(error.message);
      }
    },

    //第三方登录：gitee
    async giteeLogin() {
      try {
        const res = await giteeLogin();
        console.log(res);
        window.location.href = res.data;
        // if (res.code == 200) {
        //   console.log(res);
        //   this.$message.success("登陆成功");
        //   setToken(res.data);
        //   this.$router.push({
        //     path: "/home",
        //   });
        // } else {
        //   this.$message.error(res.message);
        // }
      } catch (error) {
        console.log(error.message);
      }
    },

    //微信扫码登录
    async wechatLogin() {
      this.isShow = false;
      this.showEmailForm = false;
      try {
        const res = await weChatLogin();
        if (res.code == 200) {
          console.log(res);
          this.qrcodeImage = res.data.url;
          this.qrCodeId = res.data.wxScanUuid;
          this.webSocket = webSocketInit(this.qrCodeId);
          this.webSocket.onmessage = (message) => {
            if (message.data === "scan_finish") {
              this.webSocket.close();
              this.checkScan();
            } else {
              this.$message.error("微信扫码登录失败");
            }
          };
        } else {
          this.$message.error(res.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    },

    //判断是否扫描完成
    async checkScan() {
      let data = {
        wxScanUuid: this.qrCodeId,
      };
      //发送请求获取用户扫码状态
      try {
        const res = await weChatCheckScan(data);
        console.log(res);
        if (res.data === "scan_bind") {
          this.isShow = true;
          this.showTest = true;
        } else if (res.data) {
          this.$message.success("登陆成功");
          setToken(res.data);
          this.$router.push({
            path: "/home",
          });
        } else {
          this.$message.error(res.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    },

    //选择邮箱登录
    getEmailUuid() {
      this.showEmailForm = true;
      this.isShow = false;
    },

    //获取邮箱验证码
    async getEmailCode() {
      let data = {
        email: this.emailForm.email,
      };
      try {
        const res = await getEmailUuid(data);
        console.log(res);
        this.emailForm.emailUuid = res.data;
      } catch (error) {
        
        console.log(error.message);
      }
    },

    //邮箱登录
    async emailSubmitForm() {
      try {
        const res = await emailLogin(this.emailForm);
        console.log(res);
        this.$message.success("登陆成功");
        setToken(res.data);
        this.$router.push({
          path: "/home",
        });
      } catch (error) {
        this.emailForm.emailCode=""
        console.log(error.message);
      }
    },

    //账号密码登录
    codeLogin() {
      this.showEmailForm = false;
      this.isShow = true;
      this.getCaptcha();
    },
  },
};
</script>

<style scoped >
* {
  margin: 0;
  padding: 0;
  --primary-color: #4460f1;
  --white-color: #ffffff;

  --light-text-color: #9398b3;
  --light-bg-color: #f2f4ff;
  --dark-color: #999;

  --background-color: #fcfcff;
}

*,
::before::after {
  box-sizing: border-box;
}

body {
  font-family: "Noto Sans SC", sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.8;
  color: var(--dark-color);
  background-color: var(--background-color);
  user-select: none;
  -webkit-user-drag: none;
}

a {
  text-decoration: none;
  color: inherit;
  -webkit-tap-highlight-color: transparent;
}

ul {
  list-style: none;
}

h1 {
  font-size: 3em;
  font-weight: 700;
  line-height: normal;
  color: black;
}

.site {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.container {
  max-width: 1000px;
  width: 100%;
  padding: 0 30px;
  margin: 0 auto;
}

.login {
  display: flex;
  flex-wrap: wrap;
}

.hero {
  flex: 1 0 66.6666%;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 70px 0;
}

.hero::before {
  content: "";
  position: absolute;
  top: 15%;
  left: 0;
  width: 330px;
  height: 120px;
  background: linear-gradient(to right, var(--primary-color), #c471ed, #f64f59);
  z-index: -1;
  filter: blur(70px);
}

.hero a {
  font-weight: 500;
  color: var(--primary-color);
  transition: color 0.3s;
}

.hero a:hover,
form .password a:hover {
  color: var(--dark-color);
  text-decoration: underline;
}

.main {
  flex: 1 0 33.3333%;
  z-index: 3;
}

.main form {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.main form p {
  position: relative;
}

form input {
  font: inherit;
  font-size: 14px;
  width: 100%;
  border: 0;
  outline: 0;
  padding: 0 20px;
  line-height: 50px;
  border-radius: 10px;
  /*修复input 加入padding之后大小变化的问题*/
  box-sizing: border-box;
}

input::placeholder {
  color: var(--dark-color);
  font-family: "Noto Sans SC", sans-serif;
  font-size: inherit;
}

form input:not(.submit) {
  background-color: var(--light-bg-color);
}

form .password i {
  position: absolute;
  top: calc(60px / 2);
  right: 20px;
  margin-top: -8px;
  line-height: 1;
  color: var(--light-text-color);
  cursor: pointer;
}

form .password a {
  font-size: 13px;
  color: var(--light-text-color);
  float: right;
  margin: 5px 20px 0 0;
}

form input.submit {
  font-weight: 700;
  font-size: 21px;
  color: var(--white-color);
  background-color: var(--primary-color);
  box-shadow: var(--primary-color) 0 20px 30px -10px;
  cursor: pointer;
  transition: box-shadow 0.3s;
}

form input.submit:hover {
  box-shadow: var(--primary-color) 0 10px 30px -10px;
}

.separator {
  position: relative;
  margin: 50px 0 30px;
}

.separator::before {
  content: "";
  position: absolute;
  top: 50%;
  width: 100%;
  height: 1px;
  background-color: var(--light-text-color);
  opacity: 0.3;
  z-index: 1;
}

.separator p {
  font-size: 14px;
  width: fit-content;
  padding: 0 10px;
  color: var(--light-text-color);
  background-color: var(--background-color);
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.options ul {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.options ul li a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 10px;
  background-color: var(--white-color);
  box-shadow: var(--light-text-color) 0 10px 20px -10px;
  transition: all 0.3s ease-out;
}

.options ul li a:hover {
  color: var(--white-color);
  box-shadow: none;
}
/*用STEAM PSN XBOX替换原先APPLE GOOGLE FACEBOOK图标*/
.options ul li:nth-child(1) a:hover {
  background-color: rgb(103, 105, 107);
}

.options ul li:nth-child(2) a:hover {
  background-color: #9ea2a7;
}

.options ul li:nth-child(3) a:hover {
  background-color: #d1d8df;
}

.options ul li:nth-child(4) a:hover {
  background-color: #d1d8df;
}

/* 第三方登陆图标 */
.image {
  width: 30px;
  margin-top: 5px;
}

/* 验证码 */
.code {
  display: flex;
  justify-content: space-between;
}
.codeInput {
  width: 56%;
  line-height: 50px;
}
.codeImage {
  width: 40%;
  height: 46px;
}

/* 二维码 */
.qrcode {
  position: relative;
  height: 284px;
}
.findPassword {
  position: absolute;
  top: 63px;
  right: 15px;
}

/* //登录背景特效 */
.login-bg {
  height: 100%;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  /* background-image: url("../../assets/images/loginbg.jpg"); */
  opacity: 0.9;
  position: fixed;
  z-index: 2;
}
.flexPosition {
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: -38px;
  left: 84px;
}

/* email验证码 */
.emailInput {
  width: 70%;
  line-height: 50px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.emailCode {
  background-color: #f2f4ff;
  width: 30%;
  height: 50px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  cursor: pointer;
  border-left: 1px solid #dadcdf;
}
.emailCode:hover {
  background-color: #ccd3de;
}
</style>