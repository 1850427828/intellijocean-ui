<template>
    <div class="Header">
        <div class="Header-top"> 
       
            <button class="btn" @click="logout()">Logout
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
        <div class="Header-bottom"></div>
    </div>
</template>

<script>
import { removeToken } from '@/utils/auth'   //清楚token
export default {
    name:'Header',
    components:{
    },
    data() {
        return {
            
        };
    },
    created() {
        
    },
    mounted() {
        
    },
    methods: {
        logout(){
            removeToken()
            this.$router.push('/login')
        }
    },
}
</script>
<style scoped>
.Header-top{
    height: 50px;
    overflow: hidden;
    position: relative;
    /* background: #edc4c4; */
    -webkit-box-shadow: 0 1px 4px rgba(0,21,41,.08);
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
}

.Header-bottom{
    height: 20px;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #d8dce5;
    -webkit-box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
}


/* 炫酷按钮 */
.btn {
    padding: 10px 20px;
    color: #edc4e9;
    position: relative;
    top: 15%;
    left : 91%;
    overflow: hidden;
    text-transform: uppercase;
    letter-spacing: 2px;
    /* right: 10px; */
}

.btn:hover {
    border-radius: 5px;
    color: #fff;
    background: #edc4e9;
    /* background: #03e9f4; */
    box-shadow: 0 0 5px 0 #edc4e9,0 0 25px 0 #edc4e9,0 0 50px 0 #edc4e9,0 0 100px 0 #edc4e9;
    transition: all 1s linear;
}

.btn>span {
    position: absolute;
}
.btn>span:nth-child(1) {
    width: 100%;
    height: 2px;
    background: -webkit-linear-gradient(left, transparent, #edc4e9);
    left: -100%;
    top: 0px;
    animation: line1 1s linear infinite;
}
@keyframes line1 {
    50%,100% {left: 100%;}
}
.btn>span:nth-child(2) {
    width: 2px;
    height: 100%;
    background: -webkit-linear-gradient(top, transparent, #edc4e9);
    right: 0px;
    top: -100%;
    animation: line2 1s 0.25s linear infinite;
}
@keyframes line2 {
    50%,100% {top: 100%;}
}
.btn>span:nth-child(3) {
    width: 100%;
    height: 2px;
    background: -webkit-linear-gradient(left, #edc4e9, transparent);
    left: 100%;
    bottom: 0px;
    animation: line3 1s 0.75s linear infinite;
}
@keyframes line3 {
    50%,100% {left: -100%;}
}
.btn>span:nth-child(4) {
   width: 2px;
   height: 100%;
   background: -webkit-linear-gradient(top, transparent, #edc4e9);
   left: 0px;
   top: 100%;
   animation: line4 1s 1s linear infinite;
}
@keyframes line4 {
    50%,100% {top: -100%;}
}
</style>