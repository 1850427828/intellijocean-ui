<template>
  <div class="bodybox">
    <img class="bgbox" src="../../assets/images/loginbg.jpg" />
    <div id="loginDiv">
      <div id="form" name="loginForm">
        <h1 id="loginMsg" style="margin-bottom: 15px">LOGIN IN</h1>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="90px"
          class="demo-ruleForm"
        >
          <el-form-item label="Username:" prop="username">
            <input class="same" v-model="ruleForm.username" type="text" />
          </el-form-item>

          <el-form-item label="Password:" prop="password">
            <input class="same" v-model="ruleForm.password" type="password" />
          </el-form-item>
          <el-form-item label="验证码:" prop="code">
            <div class="flex">
              <input class="same" v-model="ruleForm.code" type="text" />
              <el-image
                :src="'data:image/jpg;base64,' + img"
                @click="getCaptcha()"
                style="width: 80px; height: 34px"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div>
          </el-form-item>
        </el-form>

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
          <div @click="wechatLogin()">
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
import { login, getCaptcha, giteeLogin, wechatLogin } from "@/api/login";
import { setToken } from "@/utils/auth"; //存储token
export default {
  name: "login",
  data() {
    return {
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
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
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
        console.log(res);
        this.img = res.data.img;
        this.ruleForm.uuid = res.data.uuid;
      } catch (error) {
        console.log(error.message);
      }
    },

    //登录按钮
    async submitForm() {
      try {
        const res = await login(this.ruleForm);
        this.$message.success("登陆成功");
        setToken(res.data);
        // localStorage.setItem("userId", res.data.id);
        this.$router.push({
          path: "/home",
        });
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
        //   // window.open(res.data.codeUrl, "_blank");
        // } else {
        //   this.$message.error(res.message);
        // }
      } catch (error) {
        console.log(error.message);
      }
    },

    async wechatLogin() {
      try {
        const res = await wechatLogin();
        console.log(res);
        window.location.href = res.data;

        // if (res.code == 200) {
        //   console.log(res);
        //   this.$message.success("登陆成功");
        //   setToken(res.data);
        //   this.$router.push({
        //     path: "/home",
        //   });
        //   // window.open(res.data.codeUrl, "_blank");
        // } else {
        //   this.$message.error(res.message);
        // }
      } catch (error) {
        console.log(error.message);
      }
    },
  },
};
</script>

<style scoped >
.third-party-login {
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

.same {
  width: 232px;
  height: 35px;
  border-radius: 5px;
  border-style: hidden;
  background-color: rgba(216, 191, 216, 0.7);
  outline: none;
  color: #fff;
  padding-left: 10px;
  margin: 0 15px;
}

.el-form-item {
  margin-bottom: 25px;
}
:deep .el-form-item__label {
  color: #fff;
}

.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
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