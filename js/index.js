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
//һ���˵��������˵�ѡ������class
$(".left_aside .nav_tab li").on('click',function(){
    $('#all_paging').css('display','none');
    $(this).addClass("active").siblings().removeClass("active");
});
//һ���˵����ж����˵�����ת��ָ��������
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

//1.��ҵ���޹���
// 1.���޹���
$("#tab_serMg").load("navhtml/proSerMg/serMg.html");

//2.��Ϣ����
// 1.�Ű���Ϣ����
$("#tab_schedulInfo").load("navhtml/infoMg/schedulInfo.html");
// 2.Ѳ����Ϣ����
$("#tab_patrolInfo").load("navhtml/infoMg/patrolInfo.html");
// 3.����Ϣ����
$("#tab_clockInfo").load("navhtml/infoMg/clockInfo.html");
// 4.�����Ϣ����
$("#tab_forInfo").load("navhtml/infoMg/forInfo.html");
// 5.������Ϣ����
$("#tab_businessInfo").load("navhtml/infoMg/businessInfo.html");

//3.ͨѶ¼����
// 1.ͨѶ¼
$("#tab_addressBook").load("navhtml/addressBookMg/addressBook.html");

//4.Ȩ�޹���
// 1.��ά����Ա����
$("#tab_operaMg").load("navhtml/rightsMg/operaMg.html");
// 2.��ҵApp�û�����
$("#tab_proAppMg").load("navhtml/rightsMg/proAppMg.html");

