
<template>
    <div class="bodybox">
        <img class="bgbox" src="../../assets/images/loginbg.jpg" />
        <div id="loginDiv">
            <div id="form" name="loginForm" v-loading.fullscreen.lock="loginLoading">
                <h1 id="loginMsg">LOGIN IN</h1>
                <p></p>
                <div id="subDiv">
                    <button @click="submitForm('loginForm')" class="button" style="margin-right: 30px;">login</button>
                    <button @click="resetForm('loginForm')" class="button">reset</button>
                </div>
                <div class="third-party-login">
                    <button @click="Login()">使用账号密码登录</button>
                </div>
            </div>
        </div>
    </div>
</template> 

<script>
import requests from '@/utils/request';
export default {
    name: "giteeLogin",
    data() {
        return {
            loginLoading: false,
            ruleForm: {
                phone:"",
                code:"",
                state:""
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.loginLoading = true
            this.ruleForm.code = this.$route.query.code;
            this.ruleForm.state = this.$route.query.state
            // this.ruleForm.state=localStorage.getItem("state")
            requests.post("/user/giteeLogin", this.ruleForm
            ).then(res => {
                if (res.code == 201) {
                    this.$message.success("登陆成功")
                    localStorage.setItem('token', res.data)
                    this.loginLoading = false
                    this.$router.push({
                        path: '/index/home',
                    })
                } else {
                    this.$message.error(res.message);
                    this.loginLoading = false
                }
            })

        },
        resetForm(formName) {
            this.ruleForm = {}
        },

        Login() {
            this.$router.push({
                path: '/login',
            })
        },
    },

   


}
</script>
  

<style scoped >
.third-party-login{
  /* background: #97e7b2; */
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
  border-top: 1px solid #999;
  padding: 12px 20px 0 20px;
}
.third-party-login img{
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

@/api/request@/utils/request