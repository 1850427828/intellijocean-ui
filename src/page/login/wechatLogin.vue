
<template>
  <div class="bodybox">页面跳转中...</div>
</template> 

<script>
import { wechatCallback } from "@/api/login";
import { setToken } from "@/utils/auth"; //存储token
export default {
  name: "giteeLogin",
  data() {
    return {};
  },
  created() {
    this.wechatCallback();
  },
  methods: {
    async wechatCallback() {
      const data = {
        appid: this.$route.query.appid,
        redirect_rui: this.$route.query.redirect_rui,
        response_type: this.$route.query.response_type,
        scope: this.$route.query.scope,
        stase: this.$route.query.stase,
      };
      const res = await wechatCallback(data);
      if (res.code == 200) {
        console.log(res);
        this.$message.success("登陆成功");
        setToken(res.data);
        this.$router.push({
          path: "/home",
        });
      }
    },
  },
};
</script>
  

<style scoped ></style>
