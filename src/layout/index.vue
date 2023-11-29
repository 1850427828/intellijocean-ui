<template>
    <div>
        <SideNav></SideNav>
        <div class="main">
            <Header></Header>
            <div class="contain-main">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/layout/Header'
import SideNav from '@/layout/SideNav'
export default {
    components:{
        Header,
        SideNav,
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
        
    },
}
</script>
<style scoped>
.main{
    height: 100%;
    margin-left: 200px;
}
.contain-main{
    padding: 20px;
}
</style>