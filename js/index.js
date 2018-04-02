///**
// * Created by master on 2018/3/30.
// */
document.getElementsByTagName('html')[0].style.fontSize=document.body.clientWidth/100 +'px';

var headerHeight=parseFloat($(".topHeader").css("height"));
var screenHeight=window.innerHeight;
var rem=document.body.clientWidth/100;
var secHeight=screenHeight-headerHeight+"px";
$(".left_aside").css("height",secHeight);
$(".right_aside").css("height",secHeight);
//一级菜单，二级菜单选中增加class
$(".left_aside .nav_tab li").on('click',function(){
    $('#all_paging').css('display','none');
    $(this).addClass("active").siblings().removeClass("active");
});
//一级菜单，有二级菜单下跳转到指定内容项
$(".left_aside>.nav_tab>li").on('click',function(){
    $('#all_paging').css('display','none');
    $(".left_aside .nav_tab li").removeClass("active");
    $(this).addClass("active");
    var index=$(this).index();
    $(".right_aside>.tab-content>div").eq(index).addClass("active").siblings().removeClass("active");
    $(this).siblings("li").children("ul").removeClass("in");
    if($(this).children("ul").hasClass("in")){
        $(this).children("a").find("span.pull-right").removeClass("glyphicon-menu-up").addClass("glyphicon-menu-down");
    }else{
        $(this).children("a").find("span.pull-right").removeClass("glyphicon-menu-down").addClass("glyphicon-menu-up");
    }
});
$(".tablist_third>ul>li").on('click', function () {
    $('#all_paging').css('display','none');
});

//1.物业报修管理
// 1.报修管理
$("#tab_serMg").load("navhtml/proSerMg/serMg.html");

//2.信息管理
// 1.排班信息管理
$("#tab_schedulInfo").load("navhtml/infoMg/schedulInfo.html");
// 2.巡逻信息管理
$("#tab_patrolInfo").load("navhtml/infoMg/patrolInfo.html");
// 3.打卡信息管理
$("#tab_clockInfo").load("navhtml/infoMg/clockInfo.html");
// 4.请假信息管理
$("#tab_forInfo").load("navhtml/infoMg/forInfo.html");
// 5.出差信息管理
$("#tab_businessInfo").load("navhtml/infoMg/businessInfo.html");

//3.通讯录管理
// 1.通讯录
$("#tab_addressBook").load("navhtml/addressBookMg/addressBook.html");

//4.权限管理
// 1.运维管理员管理
$("#tab_operaMg").load("navhtml/rightsMg/operaMg.html");
// 2.物业App用户管理
$("#tab_proAppMg").load("navhtml/rightsMg/proAppMg.html");

