import { MessageBox } from 'element-ui';  //弹框
import router from "@/router/index"       //引入路由

export const messageBoxConfirm = () => {
    MessageBox.confirm('登录已过期，是否重新登陆?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        router.push("/login");
    }).catch(() => {
        this.$message({
            type: 'info',
            message: '已取消登录'
        });
    });
}
