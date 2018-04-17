/**
 * Created by master on 2018/4/17.
 */
//运维管理员管理查询
$("body").on("click",".rightsMg>a",function(){
    rightsOperaMgTable();
});
$("body").on("click",".rightsMg .operaMg",function(){
    rightsOperaMgTable();
});
function rightsOperaMgTable(){
    rightsOperaMgTableUrl("#tab_operaMg",3,"operaMgDelete");
}
//查询用户列表
function rightsOperaMgTableUrl(id,type,deleteId){
    $.ajax({
        type: "get",
        url: serIp+"/manage-services/parkUserPermission/parkUserList?parkId="+parkId+"&type="+type,
        dataType: "json",
        success: function (data) {
            var html="";
            $.each(data.responseList,function(i,item){
                html+='<tr ids="'+checknull(item.id)+'"><td>'+checknull(item.addInfo.nickName)+'</td><td>'+
                    checknull(item.addInfo.position)+'</td><td>'+checknull(item.addInfo.department)+'</td>' +
                    '<td>'+checknull(item.phone)+'</td><td>'+checknull(item.addInfo.roleName)+'</td>' +
                    '<td><a class="modify" data-toggle="modal" data-target="#">修改</a>';
                if(item.addInfo.state==undefined || item.addInfo.roleName=="超级管理员"){
                    html+='<a class="delete" data-toggle="modal" data-target="#'+deleteId+'">删除</a></td></tr>';
                }else if(item.addInfo.state==1){
                    html+='<a state="'+checknull(item.addInfo.state)+'" class="startDisable">启用</a>' +
                        '<a class="delete" data-toggle="modal" data-target="#'+deleteId+'">删除</a></td></tr>';
                }else if(item.addInfo.state==0){
                    html+='<a state="'+checknull(item.addInfo.state)+'" class="startDisable">禁用</a>' +
                        '<a class="delete" data-toggle="modal" data-target="#'+deleteId+'">删除</a></td></tr>';
                }
            });
            $(id+" .tables tbody").html(html);
            addIds(id,"#"+deleteId,".delete");
            tableForPages(id,8);
        },
        error: function () {
            console.log("error！");
        }
    });
}
//查询角色
searchRole("#tab_operaMg .lines .adds","#addUser .modal-body .roleAuthor-menu");
searchRole("#tab_proAppMg .lines .adds","#addAppUser .modal-body .roleAuthor-menu");
function searchRole(btnId,menuId){
    $("body").on('click',btnId,function(){
        $.ajax({
            type: "get",
            url: serIp + "/manage-services/parkUserPermission/parkRoleList?parkId="+parkId,
            dataType: "json",
            success: function (data) {
                var lis="";
                $.each(data.responseList,function(i,item){
                    lis+='<li><a ids="'+checknull(item.id)+'">'+checknull(item.name)+'</a></li>';
                });
                $(menuId).html(lis);
            },
            error: function () {
                console.log("message get is error")
            }
        });
    });
}

//新增运营用户
addUser("#addUser",3,"rightsOperaMgTable");
function addUser(id,type,fnName){
    $("body").on('click',id+" .determine",function(){
        var state;
        var name=$(id+" .name input").val();
        var position=$(id+" .position input").val();
        var department=$(id+" .department input").val();
        var phone=$(id+" .phone input").val();
        var password=$(id+" .password input").val();
        var roleId=$(id+" .roleAuthorTitle").attr("ids");
        if($(id+" .roleAuthorTitle>span").text()!=="超级管理员"){
            state=1;
        }
        var data={
            "parkId":parkId,
            "phone":phone,
            "password":password,
            "type":type,
            "addInfo":{
                "nickName":name,
                "roleId":roleId,
                "position":position,
                "department":department,
                "state":state
            }
        };
        $.ajax({
            type: "POST",
            url: serIp+"/manage-services/parkUserPermission/addParkUser",
            data:JSON.stringify(data),
            contentType: 'application/json',
            //dataType: "json",
            success: function (data) {
                if(data!==null){
                    if(fnName!==""){
                        eval(fnName).call(this);
                    }
                }
            },
            error: function () {
                console.log("error！");
            }
        });
        $(id+" input").val("");
        $(id+" .roleAuthorTitle").attr("ids","");
        $(id+" .roleAuthorTitle span").text("请选择");
    });
}
//用户 删除
userDelete("#operaMgDelete","rightsOperaMgTable");
function userDelete(deleteId,fnName){
    $("body").on('click',deleteId+" .delete",function(){
        var ids=$(this).attr("ids");
        $.ajax({
            type: "delete",
            url: serIp+"/manage-services/parkUserPermission/deleteUser/"+ids,
            dataType: "json",
            success: function (data) {
                if(data!==null){
                    if(fnName!==""){
                        eval(fnName).call(this);
                    }
                }
            },
            error: function () {
                console.log("error！");
            }
        });
    });
}

//物业App用户管理
$("body").on("click",".rightsMg .proAppMg",function(){
    rightsAppMgTable();
});
function rightsAppMgTable(){
    rightsOperaMgTableUrl("#tab_proAppMg",2,"AppDelete");
}
//新增App用户
addUser("#addAppUser",2,"rightsAppMgTable");
//删除App用户
userDelete("#AppDelete","rightsAppMgTable");
