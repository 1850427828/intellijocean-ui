export function getNewTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1，并补零
    const date = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const currentTime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
    return currentTime;
}

export const setCreateTime =(time)=>{
    localStorage.setItem('CreateTime',time);
}

export const getCreateTime =()=>{
    return localStorage.getItem('CreateTime');
}

export const setUpdateTime =(time)=>{
    localStorage.setItem('UpdateTime',time);
}

export const getUpdateTime =()=>{
    return localStorage.getItem('UpdateTime');
}


//获取时间段
export function getTimePeriod() {
    const date = new Date()
    const hour = date.getHours();
    // console.log("现在时间是:" + hour + "点!")
    if (hour >= 0 && hour < 9) {
        return '早上好'
    }
    else if (hour >= 9 && hour < 12) {
        return '上午好'
    }
    else if (hour === 12) {
        return '中午好'
    }
    else if (hour > 12 && hour < 18) {
        return '下午好'
    } else {
        return '晚上好'
    }
}