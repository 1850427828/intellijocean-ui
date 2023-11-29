<template>
  <div>
    <header>
      <div class="top_container">
        <h1
          style="margin: 0; padding: 10px; font-size: 28px; text-align: center"
        >
          管理后台
        </h1>
      </div>
    </header>
    <div class="mydetail_container">
      <div class="mydetail_sidebar">
        <ul class="mydetail_menu" style="margin-top: 20px">
          <li>
            <a href="#">密码</a>
          </li>
        </ul>
        <div class="mydetail_logout">
          <button>退出登录</button>
        </div>
      </div>
      <div class="mydetail_content" style="overflow: hidden">
        <iframe></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      username:"长颈鹿",
      password:'',
      data:{},
    };
  },
  created() {},
  mounted() {
  },
  methods: {
    
  },
};
</script>

<style scoped>

.home_left-section,
.home_right-section {
    display: flex;
    justify-content: center;
    /*align-items: center;*/
    flex-grow: 1;
    height: 1000px;
}

.home_left-section {
    width: 80%;
    float: left;
}

.home_right-section {
    width: 20%;
    float: left;
}

.home_container {
    max-width: 800px;
    margin: 0 auto;
    border-radius: 5px;
    padding: 20px;
}

h1 {
    text-align: center;
    margin-bottom: 30px;
}

.home_info {
    display: flex;
    align-items: flex-start;
    margin-bottom: 40px;
}

.home_info img {
    width: 120px;
    height: 120px;
    margin-right: 20px;
    object-fit: cover;
}

.home_info-details {
    width: 800px;
    flex: 1;
}

.home_label {
    background-color: #f2f2f2;
    color: #666;
    padding: 5px 10px;
    border-radius: 5px;
    display: inline-block;
    margin-right: 5px;
}

.home_show-more {
    text-align: center;
    margin-top: 40px;
}

.home_show-more button {
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
}

.home_item-title {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 18px;
}

.home_info:not(:last-child) {
    margin-bottom: 20px;
}

/* Add a background color to the items */
.home_info {
    display: flex;
    align-items: flex-start;
    margin-bottom: 40px;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
}

/* Adjust the spacing to reveal the page's background color */
.home_container {
    padding: 20px 20px 0;
    margin: 0 auto;
}

/* Add margin between items */
.home_info:not(:last-child) {
    margin-bottom: 20px;
}


.home_profile {
    display: flex;
    align-items: center;
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
}

.home_profile img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 20px;
}

.home_name {
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 10px;
}

.home_other {
    font-size: 0.8em;
    margin-bottom: 10px;
}

.home_service-count {
    /*color: #999;*/
    font-size: 0.8em;
}
</style>