<template>
  <div class="bodybox">
    <img class="bgbox" src="../../assets/images/loginbg.jpg" />
    <div id="loginDiv">
      <div id="form" name="loginForm" v-loading.fullscreen.lock="loginLoading">
        <h1 id="loginMsg">LOGIN IN</h1>
        <p>
          Username:<input
            id="username"
            v-model="ruleForm.username"
            type="text"
          />
        </p>
        <p>
          Password:&nbsp;<input
            id="password"
            v-model="ruleForm.password"
            type="password"
          />
        </p>
        <p></p>
        <p>
          验证码:&nbsp;<input
            id="username"
            type="text"
            v-model="ruleForm.code"
          />
          <el-image :src="'data:image/jpg;base64,'+img" @click="getCaptcha()">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </p>
        <div id="subDiv">
          <button
            @click="submitForm()"
            class="button"
            style="margin-right: 30px"
          >
            login
          </button>
          <button @click="resetForm()" class="button">reset</button>
        </div>
        <div class="third-party-login">
          <div @click="giteeLogin()">
            <img src="~@/assets/images/gitee.png" alt="" />
          </div>
          <div @click="giteeLogin()">
            <img src="~@/assets/images/QQ.png" alt="" />
          </div>
          <div @click="giteeLogin()">
            <img src="~@/assets/images/WeChart.png" alt="" />
          </div>
          <div @click="giteeLogin()">
            <img src="~@/assets/images/WeiBo.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 

<script>
import { reqSubmitLogin, getCaptcha } from "@/api/login";
import { setToken } from "@/utils/auth"; //存储token
export default {
  name: "login",
  data() {
    return {
      loginLoading: false,
      ruleForm: {
        username: "hqh2",
        password: "123456",
        code: "",
        uuid: "",
      },
      img: "", //验证码图片
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },

  mounted() {
    this.getCaptcha();
  },
  methods: {
    //获取验证码
    async getCaptcha() {
      try {
        const res = await getCaptcha();
        if (res.code == 200) {
          console.log(res);
          this.img = res.data.img;
          this.ruleForm.uuid = res.data.uuid;
        } else {
          this.$message.error(res.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    },
    
    //登录按钮
    async submitForm() {
      this.loginLoading = true;
      try {
        const res = await reqSubmitLogin(this.ruleForm);
        if (res.code == 200) {
          this.$message.success("登陆成功");
          setToken(res.data);
          // localStorage.setItem("userId", res.data.id);
          this.$router.push({
            path: "/home",
          });
        } else {
          this.$message.error(res.message);
        }
        this.loginLoading = false;
      } catch (error) {
        console.log(error.message);
      }
    },

    //重置按钮
    resetForm() {
      this.ruleForm = {};
    },

    //第三方登录：gitee
    async giteeLogin() {
      try {
        const res = await reqGiteeLogin();
        console.log(res);
        if (res.code == 200) {
          // localStorage.setItem('state',res.data.state)
          window.open(res.data.codeUrl, "_blank");
        } else {
          this.$message.error(res.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    },
  },
};
</script>

<style scoped >
.third-party-login {
  /* background: #97e7b2; */
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
  border-top: 1px solid #999;
  padding: 12px 20px 0 20px;
}
.third-party-login img {
  width: 25px;
}

* {
  margin: 0;
  padding: 0;
}

.bodybox {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bgbox {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -99;
}

#loginDiv {
  margin-bottom: 2%;
  padding-top: 23px;
  padding-bottom: 20px;
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(75, 81, 95, 0.4);
  box-shadow: inset 0px 0px 10px rgba(255, 255, 255, 0.5),
    0px 0px 15px rgba(75, 75, 75, 0.3);
  border-radius: 5px;
}

#name_trip {
  margin-left: 50px;
  color: red;
}

p {
  margin-top: 30px;
  margin-left: 20px;
  color: azure;
  font-size: 16px;
}

#remember {
  margin-left: 15px;
  border-radius: 5px;
  border-style: hidden;
  background-color: rgba(216, 191, 216, 0.5);
  outline: none;
  padding-left: 10px;
  height: 20px;
  width: 20px;
}

#username {
  width: 200px;
  margin-left: 15px;
  border-radius: 5px;
  border-style: hidden;
  height: 30px;
  background-color: rgba(216, 191, 216, 0.7);
  outline: none;
  color: #fff;
  padding-left: 10px;
}

#password {
  width: 202px;
  margin-left: 15px;
  border-radius: 5px;
  border-style: hidden;
  height: 30px;
  background-color: rgba(216, 191, 216, 0.7);
  outline: none;
  color: #ffffff;
  padding-left: 10px;
}

.button {
  border-color: cornsilk;
  background-color: rgba(100, 149, 237, 0.7);
  color: aliceblue;
  border-style: hidden;
  border-radius: 5px;
  width: 100px;
  height: 31px;
  font-size: 16px;
  margin-right: 5px;
}

#subDiv {
  text-align: center;
  margin-top: 15px;
}

#loginMsg {
  text-align: center;
  color: aliceblue;
}

#errorMsg {
  text-align: center;
  color: red;
}
</style>

@/api/login@/api/login/login