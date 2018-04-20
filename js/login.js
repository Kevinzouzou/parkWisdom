/**
 * Created by master on 2018/4/17.
 */
//按回车键等同于登陆按钮触发事件
$(document).keyup(function (event) {
    if(event.keyCode==13){
        $('#login').trigger("click");
    }
});