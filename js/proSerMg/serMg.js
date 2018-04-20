/**
 * Created by master on 2018/4/9.
 */
//var serIp="http://172.16.0.111:2037";
var serIp="http://218.17.39.178:16010";
var parkId="8969878f1f1149e6a7afae38636c0abc";
//报修详情
$("body").on('click',"#tab_serMg .table td .detail",function(){
    $("#tab_serMg .zTab").css("display","none");
    $("#tab_serMg .proDetails").css("display","block");
    var ids=$(this).parents("tr").attr("ids");
    $("#tab_serMg .proDetails .detail .toAssign .send").attr("ids",ids);
    var datas=$(this).parents("tr").attr("datas");
    datas=JSON.parse(datas);
    var arr=JSON.parse(datas.urls);
    var id="#tab_serMg .proDetails .detail";
    $(id+" .nickName span").text(datas.nickName);
    $(id+" .cellPhone span").text(datas.cellPhone);
    $(id+" .proType span").text(datas.type);
    $(id+" .coordinate span").text(datas.coordinate);
    $(id+" .proTime span").text(datas.time);
    $(id+" .dealTime span").text(datas.dealTime);
    $(id+" .remark span").text(datas.remark);
    var spans="";
    for(var i=0;i<arr.length;i++){
        spans+='<span></span>';
    }
    $(id+" .caption .imgs").html(spans);
    var imgSpan=$(id+" .caption .imgs").find("span");
    for(var j=0;j<imgSpan.length;j++){
        imgSpan.eq(j).css("background-image","url("+arr[j]+")");
    }
    //如果已指派
    if(!$(this).siblings("a").hasClass("send")){
        var proName=$(this).siblings("span").attr("datas");
        var dTime=$(this).siblings("span").attr("dTime");
        $(id+" .toAssign").css("display","none");
        $(id+" .assigned").css("display","block");
        $(id+" .assigned .propertyName span").text(proName);
        $(id+" .assigned .dTime span").text(dTime);
    }else{
        $(id+" .toAssign").css("display","block");
        $(id+" .assigned").css("display","none");
    }
});
//详情页返回
$("body").on('click',"#tab_serMg .proDetails .lines .return,#taskAssigned .modal-body dd .determine",function(){
    $("#tab_serMg .zTab").css("display","block");
    $("#tab_serMg .proDetails").css("display","none");
    //动作完成后再查询
    serMgTable();
});
//任务指派确定
$("body").on('click',"#taskAssigned .modal-footer .determine",function(){
    $("#taskAssigned .modal-body dd .designated").text("");
    var ids=$(this).attr("ids");
    if($(this).attr("datas")){
        var datas=$(this).attr("datas");
        datas=JSON.parse(datas);
        var senddata="parkId="+datas.parkId+"&id="+ids+"&propertyId="+datas.propertyId+"&propertyName="+datas.nickName+
            "&position="+datas.position;
        $.ajax({
            type: "get",
            url: serIp + "/property/taskAssignments?"+senddata,
            dataType: "json",
            success: function (data) {
                $("#taskAssigned .modal-body dl").css("display","block");
                $("#taskAssigned .modal-body .taskResend").css("display","none");
                $("#taskAssigned .modal-footer").css("display","none");
                $("#taskAssigned .modal-body dd .designated").text(datas.nickName);
            },
            error: function () {
                console.log("指派对象不成功")
            }
        });
        //动作完成后再查询
        //serMgTable();
    }
    removeDatas();
});
$("body").on('click',"#taskAssigned .modal-footer .cancel",function(){
    removeDatas();
});
//取消自定义属性datas
function removeDatas(){
    $("#taskAssigned .modal-footer .determine").removeAttr("datas");
    $("#taskAssigned .modal-footer .determine").attr("ids","");
    $("#taskAssigned .property a span").text("请选择");
    $("#taskAssigned .choiced").html("");
}
//任务指派
$("body").on('click',"#tab_serMg .table td .send",function(){
    var ids=$(this).parents("tr").attr("ids");
    $("#taskAssigned .modal-footer .determine").attr("ids",ids);
});
$("body").on('click',"#tab_serMg .proDetails .toAssign .send",function(){
    var ids=$(this).attr("ids");
    $("#taskAssigned .modal-footer .determine").attr("ids",ids);
});
$("body").on('click',"#tab_serMg .table td .send,#tab_serMg .proDetails .toAssign .send",function(){
    $("#taskAssigned .modal-body dl").css("display","none");
    $("#taskAssigned .modal-body .taskResend").css("display","block");
    $("#taskAssigned .modal-footer").css("display","block");
    $.ajax({
        type: "get",
        url: serIp + "/parkUserPermission/parkUserList?parkId="+parkId+"&type=2",
        dataType: "json",
        success: function (data) {
            var lis="";
            $.each(data.responseList,function(i,item){
                if(item.addInfo.nickName){
                    var datas={
                        propertyId:item.id,
                        parkId:parkId,
                        position:item.addInfo.position,
                        nickName:item.addInfo.nickName
                    };
                    lis+='<li><a datas=\''+JSON.stringify(datas)+'\'>'+checknull(item.addInfo.position)+' - '+
                        checknull(item.addInfo.nickName)+'</a></li>';
                }
            });
            $("#taskAssigned .modal-body .property-menu").html(lis);
        },
        error: function () {
            console.log("property message get is error")
        }
    });
});
//已选对象删除
$("body").on('click',"#taskAssigned .modal-body .choiced a",function(){
    $(this).parent().remove();
});
//报修管理查询
$("body").on("click",".proSerMg>a",function(){
    serMgTable();
});
$("body").on("click",".proSerMg .serMg",function(){
    serMgTable();
});
serMgTable();
function serMgTable(){
    var url="/property/propertyApplicationList/8969878f1f1149e6a7afae38636c0abc&";
    serMgTableUrl(url);
}
//根据路径查询报修详情
function serMgTableUrl(url){
    $.ajax({
        type: "get",
        url: serIp+url,
        dataType: "json",
        success: function (data) {
            var html="";
            $.each(data.responseList,function(i,item){
                if(item.addInfo.type=="五金类" || item.addInfo.type=="土建类"|| item.addInfo.type=="水电类"|| item.addInfo.type=="弱电类"|| item.addInfo.type=="强电类"){
                    var datas={
                        cellPhone:item.addInfo.cellPhone,
                        coordinate:item.addInfo.coordinate,
                        nickName:item.addInfo.nickName,
                        remark:item.addInfo.remark,
                        dealTime:item.addInfo.time,
                        urls:item.addInfo.urls,
                        time:item.time,
                        type:item.type
                    };
                    var states;
                    if(item.addInfo.stage!==undefined){
                        states=item.addInfo.stage;
                    }else{
                        states="";
                    }
                    html+='<tr ids="'+checknull(item.id)+'" datas=\''+JSON.stringify(datas)+'\'><td>'+
                        checknull(item.addInfo.nickName)+'</td><td>'+checknull(item.addInfo.cellPhone)+'</td><td>'+
                        checknull(item.addInfo.type)+'</td><td>'+checknull(item.addInfo.coordinate)+'</td><td>'+
                        checknull(item.time)+'</td><td>'+checknull(item.addInfo.time)+'</td><td>'+states+'</td>' +
                        '<td><a class="detail" data-toggle="modal" data-target="#detailSerMg">详情</a>';
                    if(item.addInfo.propertyId==undefined){
                        html+='<a class="send" data-toggle="modal" data-target="#taskAssigned">任务指派</a></td></tr>';
                    }else{
                        html+='<span datas="'+checknull(item.addInfo.propertyName)+'" dTime="'+checknull(item.addInfo.designateTime)+'">' +
                            '已指派</span></td></tr>';
                    }
                }
            });
            $("#tab_serMg .tables tbody").html(html);
            tableForPages("#tab_serMg",8);
        },
        error: function () {
            console.log("error！");
        }
    });
}
//联系方式模糊查询
$("body").on("click","#tab_serMg .zTab .lines .search",function(){
   var value=$(this).siblings("input").val();
    if(value==""){
        serMgTable();
    }else{
        var url="/property/propertyApplicationList/8969878f1f1149e6a7afae38636c0abc&"+value;
        serMgTableUrl(url);
    }

});

