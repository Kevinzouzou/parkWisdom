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
    rightsOperaMgTableUrl("#tab_operaMg",3,"operaMgDelete","changeState","modifyUser");
}
//修改
modifyRights("#modifyUser","rightsOperaMgTable");
//查询角色
searchRole("#tab_operaMg .lines .adds","#addUser .modal-body .roleAuthor-menu");
//新增运营用户
addUser("#addUser",3,"rightsOperaMgTable");
//用户 删除
userDelete("#operaMgDelete","rightsOperaMgTable");
//修改状态
changeState("#tab_operaMg","#changeState","rightsOperaMgTable");

//物业App用户管理
$("body").on("click",".rightsMg .proAppMg",function(){
    rightsAppMgTable();
});
function rightsAppMgTable(){
    rightsOperaMgTableUrl("#tab_proAppMg",2,"AppDelete","changeAppState","modifyAppUser");
}
//查询角色
searchRole("#tab_proAppMg .lines .adds","#addAppUser .modal-body .roleAuthor-menu");
//新增App用户
addUser("#addAppUser",2,"rightsAppMgTable");
//删除App用户
userDelete("#AppDelete","rightsAppMgTable");
//修改状态
changeState("#tab_proAppMg","#changeAppState","rightsAppMgTable");
//修改
modifyRights("#modifyAppUser","rightsAppMgTable");

//修改状态
function changeState(id,changeId,fnName){
    $("body").on("click",id+" td .startDisable",function(){
        var state=$(this).attr("state");
        $(changeId+" .determine").attr("state",state);
    });
    $("body").on("click",changeId+" .determine",function(){
        var state=$(this).attr("state");
        state=state==1?0:1;
        var ids=$(this).attr("ids");
        $.ajax({
            type: "put",
            url: serIp+"/parkUserPermission/modifyParkUserState?id="+ids+"&state="+state,
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
    })
}
//用户删除
function userDelete(deleteId,fnName){
    $("body").on('click',deleteId+" .delete",function(){
        var ids=$(this).attr("ids");
        $.ajax({
            type: "delete",
            url: serIp+"/parkUserPermission/deleteUser/"+ids,
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
//新增用户
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
            url: serIp+"/parkUserPermission/addParkUser",
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
//角色查询
function searchRole(btnId,menuId){
    $("body").on('click',btnId,function(){
        $.ajax({
            type: "get",
            url: serIp + "/parkUserPermission/parkRoleList?parkId="+parkId,
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
//修改用户
function modifyRights(modifyId,fnName){
    $("body").on("click",modifyId+" .determine",function(){
        var ids=$(this).attr("ids");
        var name=$(modifyId+" .name input").val();
        var position=$(modifyId+" .position input").val();
        var department=$(modifyId+" .department input").val();
        var phone=$(modifyId+" .phone input").val();
        $.ajax({
            type: "put",
            url: serIp+"/parkUserPermission/modifyParkUserInfo?id="+ids+"&nickName="+name+
            "&phone="+phone+"&department="+department+"&position="+position,
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
//查询用户列表
function rightsOperaMgTableUrl(id,type,deleteId,changeId,modifyId){
    $.ajax({
        type: "get",
        url: serIp+"/parkUserPermission/parkUserList?parkId="+parkId+"&type="+type,
        dataType: "json",
        success: function (data) {
            var html="";
            $.each(data.responseList,function(i,item){
                html+='<tr ids="'+checknull(item.id)+'"><td>'+checknull(item.addInfo.nickName)+'</td><td>'+
                    checknull(item.addInfo.position)+'</td><td>'+checknull(item.addInfo.department)+'</td>' +
                    '<td>'+checknull(item.phone)+'</td><td>'+checknull(item.addInfo.roleName)+'</td>' +
                    '<td><a class="modify" data-toggle="modal" data-target="#'+modifyId+'">修改</a>';
                if(item.addInfo.state==undefined || item.addInfo.roleName=="超级管理员"){
                    html+='<a class="delete" data-toggle="modal" data-target="#'+deleteId+'">删除</a></td></tr>';
                }else if(item.addInfo.state==1){
                    html+='<a state="'+checknull(item.addInfo.state)+'" class="startDisable" data-toggle="modal" data-target="#'+changeId+'">禁用</a>' +
                        '<a class="delete" data-toggle="modal" data-target="#'+deleteId+'">删除</a></td></tr>';
                }else if(item.addInfo.state==0){
                    html+='<a state="'+checknull(item.addInfo.state)+'" class="startDisable" data-toggle="modal" data-target="#'+changeId+'">启用</a>' +
                        '<a class="delete" data-toggle="modal" data-target="#'+deleteId+'">删除</a></td></tr>';
                }
            });
            $(id+" .tables tbody").html(html);
            addIds(id,"#"+modifyId,".determine");//修改
            addIds(id,"#"+changeId,".determine");//修改状态
            addIds(id,"#"+deleteId,".delete");//删除
            rightsMgModify(id,"#"+modifyId);//修改自动赋值
            tableForPages(id,8);
        },
        error: function () {
            console.log("error！");
        }
    });
}
//修改时自动赋值
function rightsMgModify(id,modifyId){
    $("body").on("click",id+" tbody td .modify",function(){
        $(modifyId+" .name input").val($(this).parents("tr").children("td:first-child").text());
        $(modifyId+" .position input").val($(this).parents("tr").children("td:nth-child(2)").text());
        $(modifyId+" .department input").val($(this).parents("tr").children("td:nth-child(3)").text());
        $(modifyId+" .phone input").val($(this).parents("tr").children("td:nth-child(4)").text());
    })
}


