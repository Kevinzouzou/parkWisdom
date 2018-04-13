/**
 * Created by master on 2018/4/12.
 */
var tabHeight=parseFloat($(".pull-right>.tab-content").css("height"));
$("#tree").css("height",tabHeight-5.2*rem);

//通讯录查询
$("body").on("click",".addressBookMg>a",function(){
    addressBookTable();
});
$("body").on("click",".addressBook",function(){
    addressBookTable();
});
function addressBookTable(){
    addressBookAjax();
}
function addressBookAjax(){
    var url="/manage-services/contacts/contactsList/"+parkId;
    $.ajax({
        type: "get",
        url: serIp+url,
        dataType: "json",
        success: function (data) {
            var html="";
            $.each(data.responseList,function(i,item){
                html+='<tr ids="'+checknull(item.id)+'"><td>'+checknull(item.contactPersonName)+'</td><td>'+
                    checknull(item.addInfo.position)+'</td><td>'+checknull(item.addInfo.department)+'</td><td>'+
                    checknull(item.contactCellPhoneNumber)+'</td><td>' +
                    '<a class="transfer" data-toggle="modal" data-target="#">转移成员</a>' +
                    '<a class="delete" data-toggle="modal" data-target="#bookDelete">删除</a></td></tr>';
            });
            $("#tab_addressBook .tables tbody").html(html);
            addIds("#tab_addressBook","#bookDelete",".delete");
        },
        error: function () {
            console.log("error！");
        }
    });
}
//添加自定义属性ids
function addIds(id,modalId,modalBtn){
    $(id+" .tables tbody td a").on('click',function(){
        var ids=$(this).parent().parent().attr("ids");
        $(modalId+" "+modalBtn).attr("ids",ids);
    });
}
//通讯录 删除
$("#bookDelete .delete").on('click',function(){
    var ids=$(this).attr("ids");
    $.ajax({
        type: "delete",
        url: serIp+"/manage-services/contacts/deleteContacts/"+ids,
        dataType: "json",
        success: function (data) {
            addressBookAjax();
        },
        error: function () {
            console.log("error！");
        }
    });
});
