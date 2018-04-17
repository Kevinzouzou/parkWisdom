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
//一级菜单、二级菜单选中添加class
$(".left_aside .nav_tab li").on('click',function(){
    $('#all_paging').css('display','none');
    $(this).addClass("active").siblings().removeClass("active");
});
//一级菜单，有二级菜单下跳转到指定内容项
$(".left_aside>.nav_tab>li").on('click',function(){
    $(".left_aside .nav_tab li").removeClass("active");
    $(this).addClass("active");
    var index=$(this).index();
    $(".right_aside>.tab-content>div").eq(index).addClass("active").siblings().removeClass("active");
    $(this).siblings("li").children("ul").removeClass("in");
    if($(this).children("ul").hasClass("in")){
        $(this).children("a").find("span.pull-right").removeClass("glyphicon-menu-up").addClass("glyphicon-menu-down");
    }else{
        $(".left_aside>.nav_tab>li span.pull-right").removeClass("glyphicon-menu-up").addClass("glyphicon-menu-down");
        $(this).children("a").find("span.pull-right").removeClass("glyphicon-menu-down").addClass("glyphicon-menu-up");
        $(this).children("ul").children("li:first-child").addClass("active");
        $(".right_aside>.tab-content>div").eq(index).children("div.tab-content").children("div:first-child").addClass("active").siblings().removeClass("active");
    }
});
$(".tablist_third>ul>li").on('click', function () {
    $('#all_paging').css('display','none');
});

//1.物业报修管理
// 1.报修管理
$("#tab_serMg").load("navhtml/proSerMg/serMg.html");

//2.信息管理
//// 1.排班信息管理
//$("#tab_schedulInfo").load("navhtml/infoMg/schedulInfo.html");
//// 2.巡逻信息管理
//$("#tab_patrolInfo").load("navhtml/infoMg/patrolInfo.html");
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

//下拉组件，选中填充
function selectDropdownMenu(class1,class2){
    $("body").on('click',class1+">li>a",function(){
        if($(this).attr("ids") || $(this).attr("datas")){
            var ids=$(this).attr("ids");
            var datas=$(this).attr("datas");
            $(this).parent().parent().siblings(class2).attr("ids",ids).attr("datas",datas).find("span").text($(this).html());
            //$("#taskAssigned .choiced .thePerson span").text($(this).html());
            $("#taskAssigned .choiced").html('<div class="thePerson"><span>'+$(this).html()+'</span><a>X</a></div>');
            $("#taskAssigned .modal-footer .determine").attr("datas",datas);

        }else{
            $(this).parent().parent().siblings(class2).find("span").text($(this).html());
        }
    });
}
selectDropdownMenu(".dropdown-menu",".dropdown-toggle");

//校验是否为空
function checknull(str){
    if(str=='null'||str==null){
        return "";
    }
    return str;
}
//日期插件
$('.pull-right').on('click', '.calendar', function(){ //
    $(this).datetimepicker({
        format: 'yyyy-mm-dd',
        minView:'month',
        language: 'zh-CN',
        autoclose:true,
        //startDate:new Date(),
        //endDate:new Date(),
        pickerPosition:'bottom-right'//相对位置
    });
});
$('.pull-right').on('mousedown', '.calendar', function(){ //就改这一行就可以了
    plugTime(this);
});
function plugTime(dom) {
    $(dom).datetimepicker({
        format: 'yyyy-mm-dd',
        minView:'month',
        language: 'zh-CN',
        autoclose:true,
        //startDate:new Date(),
        //endDate:new Date(),
        pickerPosition:'bottom-right'//相对位置
    });
    $(dom).click();
    $(dom).blur();
}
//获取当日时间，格式YYYY/MM/DD
function getNowFormatDate(date) {
    //var date = new Date();
    var seperator1 = "/";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
        //+ " " + date.getHours() + seperator2 + date.getMinutes()
        //+ seperator2 + date.getSeconds();
    return currentdate;
}
//获取当前月的第一天
function getCurrentMonthFirst(){
    var date=new Date();
    date.setDate(1);
    return date;
}
//获取当前月的最后一天
function getCurrentMonthLast(){
    var date=new Date();
    var currentMonth=date.getMonth();
    var nextMonth=++currentMonth;
    var nextMonthFirstDay=new Date(date.getFullYear(),nextMonth,1);
    var oneDay=1000*60*60*24;
    return new Date(nextMonthFirstDay-oneDay);
}

//table 分页显示
function tableForPages(id,pageSize){
    var numberItems =parseFloat($(id+" table tbody tr").length);  //获取对象里面，数据的数量
    var nowPage=0;
    if(numberItems<=pageSize){
        $(id+" .pages").css("display","none");
    }else{
        $(id+" .pages").css("display","block");
        var pageCount = Math.ceil(numberItems/pageSize);  //计算页面显示的数量
        $(id+" table tbody").children().css('display', 'none').slice(0,pageSize).css('display', '');
        var html= '<div class="pagination"></div><div class="pagination-detail"><span class="page-size">共'+
            pageCount+'页</span></div>';
        $(id+" .pages").html(html);
        var val=parseFloat($(id+" .pages .pagination-detail input").val());
        $(id+" .pages .pagination").pagination({
            totalData:numberItems,
            showData:pageSize,
            items_per_page:pageSize,
            num_edge_entries:2,
            num_display_entries:4,
            current_page: 0,   //当前页索引
            link_to: "?id=__id__",  //分页的js中会自动把"__id__"替换为当前的数。0　
            coping:true,
            keepShowPN:true,
            jump:true,
            jumpBtnCls:'jump'
        });

        $(id+" .pages .pagination").on('click',function(){
            var pageNow=$(id+" .pages .pagination .active").text();
            $(id+" .pages .thePage").html(pageNow);
            var end_on=pageNow*pageSize;
            var start_from=end_on-pageSize;
            $(id+" table tbody").children().css('display', 'none').slice(start_from, end_on).css('display', '');
        });
        $(id+" .pages .pagination-detail input").on('blur',function(){
            var th=parseFloat($(this).val());
            if(th>pageCount){
                alert("跳转的页数不能大于总页数！");
            }
        });
    }
}

