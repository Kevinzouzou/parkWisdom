/**
 * Created by master on 2018/4/12.
 */
//打卡信息查询
$("body").on("click",".infoMg>a",function(){
    clockInfoTable();
});
$("body").on("click",".clockInfo",function(){
    clockInfoTable();
});
function clockInfoTable(){
    var data="parkId="+parkId+"&year=2018&pageNum=1&pageSize=100";
    clockInfoAjax(data);
}
function clockInfoAjax(data){
    var url="/message/userSignList?";
    $.ajax({
        type: "get",
        url: serIp+url+data,
        dataType: "json",
        success: function (data) {
            var html="";
            $.each(data.responseList,function(i,item){
                var signTime=checknull(item.signTime);
                var timeBefore=signTime.substring(0,10);
                var timeAfter=signTime.substring(11);
                html+='<tr><td>'+checknull(item.addInfo.propertyUserName)+'</td><td>'+checknull(item.addInfo.position)+'</td>' +
                    '<td></td><td>'+timeBefore+'</td><td>'+timeAfter+'</td><td></td><td></td><td></td><td></td></tr>';
            });
            $("#tab_clockInfo .tables tbody").html(html);
            tableForPages("#tab_clockInfo",7);
        },
        error: function () {
            console.log("error！");
        }
    });
}
//当日考勤
$("body").on("click","#tab_clockInfo .lines .dayCheck",function(){
    var start=getNowFormatDate(new Date())+" 00:00:00";
    var end=getNowFormatDate(new Date())+" 23:59:59";
    var data="parkId="+parkId+"&year=2018&startTime="+start+"&endTime=" + end+
        "&pageNum=1&pageSize=7";
    clockInfoAjax(data);
});
//月考勤表
$("body").on("click","#tab_clockInfo .lines .monthCheck",function(){
    var start=getNowFormatDate(getCurrentMonthFirst())+" 00:00:00";
    var end=getNowFormatDate(getCurrentMonthLast())+" 23:59:59";
    var data="parkId=8969878f1f1149e6a7afae38636c0abc&year=2018&startTime="+start+"&endTime=" + end+
        "&pageNum=1&pageSize=7";
    clockInfoAjax(data);
});
//筛选
$("body").on("click","#tab_clockInfo .lines .screening",function(){
    var start=$(this).siblings("input.startTime").val().replace(/-/g,"/")+" 00:00:00";
    var end=$(this).siblings("input.endTime").val().replace(/-/g,"/")+" 23:59:59";
    var data="parkId=8969878f1f1149e6a7afae38636c0abc&year=2018&startTime="+start+"&endTime=" + end+
        "&pageNum=1&pageSize=7";
    clockInfoAjax(data);
});

//请假信息查询
$("body").on("click",".forInfo",function(){
    askingForTable();
});
function askingForTable(){
    var data="parkId="+parkId+"&type=请假";
    askingForAjax(data);
}
function askingForAjax(data){
    var url="/message/approvalInfoList?";
    $.ajax({
        type: "get",
        url: serIp+url+data,
        dataType: "json",
        success: function (data) {
            var html="";
            $.each(data.responseList,function(i,item){
                var datas={
                  approverName:item.addInfo.approverName,
                  copyToName:item.addInfo.copyToName,
                  leaveType:item.addInfo.leaveType,
                  applyInfo:item.addInfo.applyInfo
                };
                html+='<tr datas=\''+JSON.stringify(datas)+'\'><td>'+checknull(item.addInfo.parkUserName)+'</td><td>'+checknull(item.addInfo.position)+'</td>' +
                    '<td>'+checknull(item.addInfo.leaveType)+'</td><td>'+checknull(item.startTime)+'</td>' +
                    '<td>'+checknull(item.endTime)+'</td><td>'+checknull(item.duration)+'</td><td>'+checknull(item.time)+'</td>' +
                    '<td><a class="detail" data-toggle="modal" data-target="#askingFor">详情</a></td></tr>';
            });
            $("#tab_forInfo .tables tbody").html(html);
            $("#tab_forInfo .lines .askings").text(data.responseList.length);
            tableForPages("#tab_forInfo",7);
            //forInfoDetail();
        },
        error: function () {
            console.log("error！");
        }
    });
}
//请假详情
$("body").on("click","#tab_forInfo .table td .detail",function(){
    var datas=$(this).parents("tr").attr("datas");
    datas=JSON.parse(datas);
    var id="#askingFor";
    $(id+" .approver span").text(datas.approverName);
    $(id+" .copyTo span").text(datas.copyToName);
    $(id+" .leaveType span").text(datas.leaveType);
    $(id+" .applyInfo span").text(datas.applyInfo);
});
//当日请假
$("body").on("click","#tab_forInfo .lines .dayApply",function(){
    var start=getNowFormatDate(new Date())+" 00:00:00";
    var end=getNowFormatDate(new Date())+" 23:59:59";
    var data="parkId="+parkId+"&type=请假"+"&startTime="+start+"&endTime=" + end;
    askingForAjax(data);
});

//月请假表
$("body").on("click","#tab_forInfo .lines .monthApply",function(){
    var start=getNowFormatDate(getCurrentMonthFirst())+" 00:00:00";
    var end=getNowFormatDate(getCurrentMonthLast())+" 23:59:59";
    var data="parkId="+parkId+"&type=请假"+"&startTime="+start+"&endTime=" + end;
    askingForAjax(data);
});
//筛选
$("body").on("click","#tab_forInfo .lines .screening",function(){
    var start=$(this).siblings("input.startTime").val().replace(/-/g,"/")+" 00:00:00";
    var end=$(this).siblings("input.endTime").val().replace(/-/g,"/")+" 23:59:59";
    var data="parkId="+parkId+"&type=请假"+"&startTime="+start+"&endTime=" + end;
    askingForAjax(data);
});

//出差信息查询
$("body").on("click",".businessInfo",function(){
    businessInfoTable();
});
function businessInfoTable(){
    var data="parkId="+parkId+"&type=出差";
    businessInfoAjax(data);
}
function businessInfoAjax(data){
    var url="/message/approvalInfoList?";
    $.ajax({
        type: "get",
        url: serIp+url+data,
        dataType: "json",
        success: function (data) {
            var html="";
            $.each(data.responseList,function(i,item){
                var datas={
                    //approverName:item.addInfo.approverName,
                    //copyToName:item.addInfo.copyToName,
                    applyInfo:item.addInfo.applyInfo,
                    address:item.addInfo.address
                };
                html+='<tr datas=\''+JSON.stringify(datas)+'\'><td>'+checknull(item.addInfo.parkUserName)+'</td><td>'+checknull(item.addInfo.position)+'</td>' +
                    '<td>'+checknull(item.addInfo.address)+'</td><td>'+checknull(item.startTime)+'</td>' +
                    '<td>'+checknull(item.endTime)+'</td><td>'+checknull(item.duration)+'</td><td>'+checknull(item.time)+'</td>' +
                    '<td><a class="detail" data-toggle="modal" data-target="#businessFor">详情</a></td></tr>';
            });
            $("#tab_businessInfo .tables tbody").html(html);
            $("#tab_businessInfo .lines .business").text(data.responseList.length);
            tableForPages("#tab_businessInfo",7);
        },
        error: function () {
            console.log("error！");
        }
    });
}
//出差详情
$("body").on("click","#tab_businessInfo .table td .detail",function(){
    var datas=$(this).parents("tr").attr("datas");
    datas=JSON.parse(datas);
    var id="#businessFor";
    //$(id+" .approver span").text(datas.approverName);
    //$(id+" .copyTo span").text(datas.copyToName);
    $(id+" .address span").text(datas.address);
    $(id+" .applyInfo span").text(datas.applyInfo);
});
//当日出差
$("body").on("click","#tab_businessInfo .lines .dayBusiness",function(){
    var start=getNowFormatDate(new Date())+" 00:00:00";
    var end=getNowFormatDate(new Date())+" 23:59:59";
    var data="parkId="+parkId+"&type=出差"+"&startTime="+start+"&endTime=" + end;
    businessInfoAjax(data);
});
//月出差表
$("body").on("click","#tab_businessInfo .lines .monthBusiness",function(){
    var start=getNowFormatDate(getCurrentMonthFirst())+" 00:00:00";
    var end=getNowFormatDate(getCurrentMonthLast())+" 23:59:59";
    var data="parkId="+parkId+"&type=出差"+"&startTime="+start+"&endTime=" + end;
    businessInfoAjax(data);
});
//筛选
$("body").on("click","#tab_businessInfo .lines .screening",function(){
    var start=$(this).siblings("input.startTime").val().replace(/-/g,"/")+" 00:00:00";
    var end=$(this).siblings("input.endTime").val().replace(/-/g,"/")+" 23:59:59";
    var data="parkId="+parkId+"&type=出差"+"&startTime="+start+"&endTime=" + end;
    businessInfoAjax(data);
});




