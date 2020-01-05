window.onload = function () {
    timeVision();
    setInterval('timeVision()', 1000);
    countDownnSet();
}


function timeVision() {
    var vWeek, vWeek_s;
    vWeek = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    var date = new Date();
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    hours = date.getHours();
    minutes = date.getMinutes();
    seconds = date.getSeconds();
    vWeek_s = date.getDay();
    document.getElementById("time").innerHTML = year + "年" + month + "月" + day + "日" + "\t" + hours + ":" + minutes + ":" + seconds + "\t" + vWeek[vWeek_s];
    console.log("1");
};
// 倒数时间计算器
function countDownnSet() {
    var date1 = new Date()
    var date2 = new Date('2020/01/22 00:00:00')

    var s1 = date1.getTime(), s2 = date2.getTime();
    var total = (s2 - s1) / 1000;


    var day = parseInt(total / (24 * 60 * 60));//计算整数天数
    var afterDay = total - day * 24 * 60 * 60;//取得算出天数后剩余的秒数
    var hour = parseInt(afterDay / (60 * 60));//计算整数小时数
    var afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60;//取得算出小时数后剩余的秒数
    var min = parseInt(afterHour / 60);//计算整数分
    var afterMin = total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60;//取得算出分后剩余的秒数

    console.log(day, hour, min);
    var dom = document.getElementById("countDown");
    dom.childNodes[1].innerText = day;
}

