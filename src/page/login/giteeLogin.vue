<template>
  <div class="bodybox">页面跳转中...</div>
</template> 

<script>
import { giteeCallback } from "@/api/login";
import { setToken } from "@/utils/auth"; //存储token
export default {
  name: "giteeLogin",
  data() {
    return {};
  },
  created() {
    this.giteeCallback();
  },
  methods: {
    async giteeCallback() {
      const data = {
        code: this.$route.query.code,
        state: this.$route.query.state,
      };
      const res = await giteeCallback(data);
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
