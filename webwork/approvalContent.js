/**
 * Created by Administrator on 2017/3/9.
 */

    //获取子页面的值：
var fileIDs, photoIDs, videoIDs;
function NewArr(a, b, c) {
    photoIDs = a.toString();
    videoIDs = b.toString();
    fileIDs = c.toString();
}
//接收TYPEID:
var strs;
function Receive() {
    var url = location.search;
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split(/[=&&]/);
        //console.log(strs);
        typeID = strs[1];
        //复制与重发：
        if (strs.length == 4) {
            //标题变化：
            if (strs[2] == "DataId") {//复制
                $(".changeTitile").html('<a href="/ApplyApproval/Apply">我的申请&gt;</a><a href="javascript:history.go(-1);">' + $(".changeTitile").html().split('</a>')[2] + '&gt;</a>复制');
            } else {//重发
                $(".changeTitile").html('<a href="/ApplyApproval/Apply">我的申请&gt;</a><a href="javascript:history.go(-1);">' + $(".changeTitile").html().split('</a>')[2] + '&gt;</a>重发');
            }
            var DataId = strs[3];
            copyFun(DataId);
        }
    }
}



$(function () {


    var strI='',Ftype='';
    var applyRequestId='';

    // //审批意见状态
    var ideaState = true;

   /**************动态创建的dom*****************/
    /*
    *  初始网页
    */
    function createApplyContent(data) {

        // 审批类型
        var Theme;
        if(data.TypeName=='合同'){
            Theme='合同审批'
        }else if(data.TypeName=='通用'){
            Theme='通用审批'
        }else{
            Theme=data.TypeName;
        }
        $('<span></span>').text(Theme).appendTo($('.apply-Content header'));

        // 按钮模板以及审批状态
        buttonBox(data);

        //个人信息
        personalData(data);

        //审批内容
        applyContentInfo(data);

        //    语音
        videoIfo(data);


        //    文件
        FileInfomation(data);

       // 总用时间
         useTime(data);

        //审批流程
        $('<p><span>'+ data.Items[0].ApplyDepartmentName+'</span> </p>').appendTo($('.dropDownList'));
        applyOpinion(data.Items[0].Flows)

    }


    /*****************内容模块**********************/
    /*
    *   个人信息
    */
    function personalData(data) {

        var FaceUrl=data.Creator.FaceURL;
        var faceUrl = window.imgapiurl + FaceUrl.format(50, 50, "c").trim();

        $('.applyContentLogo').append(`

              <i style="background: url(${faceUrl})"></i>
              <b>${data.Creator.Nick}</b>
              <br>
              <span>${data.DepartmentName}-${data.Creator.MastJobName}</span>
        `);

        // var logo=$('.applyContentLogo');
        // var face=$('<i></i>').appendTo(logo);
        // face.css('background',"url("+ faceUrl+")");
        // $('<b></b>').text(data.Creator.Nick).appendTo(logo);
        // $('<br>').appendTo(logo);
        // $('<span></span>').text(data.DepartmentName+'-'+data.Creator.MastJobName).appendTo(logo);
    }

    /*
    * 审批内容
    */
    function applyContentInfo(data) {

        var beginTime=data.SendDateTime;

        $('.applyContentInfo-com').append(`
            <label>审批编号：<span>${data.RequestSerialNumber}</span></label>  
            <br>
            <label>申请时间：<span>${TimeTransform(beginTime) }</span></label>
        `)


        var infoDif=$('.applyContentInfo-dif');

        if(data.ApprovalContent==""){
            var Data=''
        }else{
            var Data=eval('(' + data.ApprovalContent + ')');
        }
        switch (data.TypeId){
            case 'UzCP':   //       请假
                $('<div> ' +
                    '<label>请假类型：</label><span>'+LeaveType(Data['Leave'].Type)+'</span><br>' +
                    ' <label>开始时间：</label><span>'+Data['Leave'].Start+'</span><br> ' +
                    '<label>结束时间：</label><span>'+Data['Leave'].End+'</span><br> ' +
                    '<label>请假天数：</label><span>'+Data['Leave'].Days+'</span><br> ' +
                    '<label>请假事由：</label><span>'+Data['Leave'].Reason+'</span><br> ' +
                    '</div>').appendTo(infoDif);
                break;

            case "UzCn":    //通用
                $('<div> ' +
                    '<label>申请标题：</label><span>'+ Data['General'].Title+'</span><br> ' +
                    '<label>申请内容：</label><span>'+ Data['General'].Content+'</span><br> ' +
                    '</div>').appendTo(infoDif);
                break;

            case "UzCE":  //合同

                $('<div style="overflow: hidden"> ' +
                    '<label>合同编号：<span>'+ Data['ConTract'].Number+'</span></label>' +
                    '<label>合同类别：<span>'+ Data['ConTract'].Category+'</span></label>' +
                    '</div>').appendTo(infoDif);
                //合同审批中 三方以上使用
                // console.log(Data)
                for(a in Data['ConTract'].ContractContents){
                    var thisData=(Data['ConTract'].ContractContents)[a];
                    var Phone,Email,Fax;
                    Phone=thisData.Phone?thisData.Phone: Phone='(空)';
                    Email=thisData.Email?thisData.Email: Email='(空)';
                    Fax=thisData.Fax?thisData.Fax: Fax='(空)';

                    $('<div class="ContractPath"><br>' +
                        '<label style="color:#323232">'+thisData.SubContractors+'</label><br> ' +
                        '<label>单位名称：</label><span>'+thisData.Organization+'</span><br> ' +
                        '<label>经办部门：</label><span>'+thisData.Department+'</span><br>' +
                        '<label>经 &nbsp;办&nbsp;人：</label><span>'+thisData.Managers+'</span> ' +
                        '<label>电 &nbsp;&nbsp;&nbsp;&nbsp; 话：</label><span>'+Phone+'</span><br> ' +
                        '<label>邮 &nbsp;&nbsp;&nbsp;&nbsp; 件：</label><span>'+Email+'</span><br>' +
                        '<label>传 &nbsp;&nbsp;&nbsp;&nbsp; 真：</label><span>'+Fax+'</span> ' +
                        '</div>').appendTo(infoDif);
                }
                $('<div><br> ' +
                    '<label>合同内容：</label><span>'+ Data['ConTract'].Content+'</span><br> ' +
                    '</div>').appendTo(infoDif);

                break;

            case "UzC7":  //报销
                $('<div> <label>报销总额：</label><span>400</span><br> </div>').appendTo(infoDif);
                for( a in Data['ReimBursed']){
                    var thisData=(Data['ReimBursed'])[a];
                    var Num=parseInt(a)+1;
                    $('<div><br> ' +
                        '<label>报销明细（'+ Num+'）</label><br> ' +
                        '<label class="applyContentInfo-dif-size">报销金额：<span>'+ thisData.Amount+'</span></label><br> ' +
                        '<label class="applyContentInfo-dif-size">报销类别：<span>'+ thisData.Categories+'</span></label><br> ' +
                        '<label class="applyContentInfo-dif-size">费用明细：</label><span>'+ thisData.Details+'</span><br> ' +
                        '</div>').appendTo(infoDif);
                }
                break;

            case "UzCz": //物品领用

                var Remark=Data['MaterialRequisition'].Remark?Data['MaterialRequisition'].Remark:'(空)';
                $(' <label>备注：</label><span>'+Remark +'</span><br><br>').appendTo(infoDif);
                for(a in Data['MaterialRequisition'].List){
                    var num=parseInt(a)+1;
                    var thisData=(Data['MaterialRequisition'].List)[a];
                    $('<div> ' +
                        '<label>物品明细（'+num +'）</label><br> ' +
                        '<label class="applyContentInfo-dif-size">物品名称：<span>'+ thisData.Name+'<tb style="float:right">数量：'+ thisData.Count+'</tb></span></label> ' + '<br> ' +
                        '<label class="applyContentInfo-dif-size">物品用途：<span>'+ thisData.Use+'</span></label><br> <br>' +
                        '</div>').appendTo(infoDif);
                }
                break;
        }

    }

    /*
     *  图片和文件展示
     */
    function FileInfo(data,FilePlace) {
        if(data.Photos){
            data.Images=data.Photos;
        }
        // console.log((data.Images[0]).URL);
        if(data.FileIDs.length||data.Images.length||data.VideoIDs.length){
            $('.applyContentFile').css('display','block');
            getFiles(data);
            getImages(data);
        }else{
            $('<span style="margin-left:-40px;">(空)</span>').appendTo($(FilePlace));
            // getFiles(data);
            // getImages(data);
        }

        function getFileAndImg(item) {
            sureFtype(item);
            var li=$('<li  class="applyContentFile-img"></li>').appendTo($(FilePlace));
            $(strI).appendTo(li);

            $('<span> ' +
                '<span class="applyContentFile-img-name">'+ item.Name+'</span> <br>' +
                ' <span class="applyContentFile-img-size">'+ returnFileSize((item.size))+'</span> ' +
                '</span>').appendTo(li);

            if(Ftype=='img'){
                var Url=item.Url;
                $('<span> <b class="applyContentFile-img-img" data-toggle="modal" data-target=".viewBigPic" href="'+Url+'"></b> </span>').appendTo(li);

            }else{
                var Src = window.bigfileurl + item.Url + item.Name;
                $('<span> <b class="applyContentFile-img-download" href="'+Src+'"></b> </span>').appendTo(li);
            }
        }

        /*
         *  图片放大和文件下载
         */
        $('.applyContentFile-img-download').click(function (e) {
            window.open($(e.target).attr('href'))
        });
        $('.applyContentFile-img-img').click(function (e) {
            var ImgUrl=$(e.target).attr('href');
            $('.viewBigPic .imgContent').text('');
            $('<img>').attr('src',window.imgapiurl + ImgUrl.format(10000, 10000, "c").trim()).appendTo($('.viewBigPic .imgContent'))
        })

        //文件类型
        function getFiles(data) {
            for (var a = 0; a < data.FileIDs.length; a++) {
                var item = {
                    Name: data.FileIDs[a].FileName,
                    size: data.FileIDs[a].Size,
                    Url: data.FileIDs[a].SaveUrl
                };
                getFileAndImg(item);

            }
        }
        // 图片类型
        function getImages(data) {
            for(var i=0;i<data.Images.length;i++ ){
                var item={
                    Name:data.Images[i].FileName,
                    size:data.Images[i].Size,
                    Url:data.Images[i].URL
                };
                getFileAndImg(item);
            }
        }
    }

    /*
    * 语音
     */
    function videoIfo(data) {

        var video=data.Voices;
        if(video.length){
            for(var i=0;i<video.length;i++){
                var url='../../images/demo.mp3';
                createVideo(url,'apply'+i,'.applyContentVoice .video');
            }
        }else{
            $('<span>(空)</span> ').appendTo($('.applyContentVoice .video'))
        }
    }

    /*
    * 文件内容
    */
    function FileInfomation(data){
        FileInfo(data,'.applyContentFile-ul');
    }

    /*
    *  开关盒（抄送人，复制，撤销。。的模板套用）
    */
    function buttonBox(data) {

        // console.log(data)
        switch (data.StatusValue) {

            case 7:   //'同意并转交'
                $('.applyContentState').addClass('applyContentState-pass');
                $('<div> ' +
                    '<button class="button-sm button-whiteBoard copPeople" >抄送人<div class="copPeopleList-s"></div><div class="copPeopleList-d"></div></button></div>').appendTo($('.applyUseType'));
                break;
            case 5://  '同意并通过'
                $('.applyContentState').addClass('applyContentState-pass');
                $('<div> ' +
                    '<button class="button-sm button-whiteBoard copPeople" >抄送人<div class="copPeopleList-s"></div><div class="copPeopleList-d"></div></button></div>').appendTo($('.applyUseType'));
                break;
            case 2:  //拒绝
                $('.applyContentState').addClass('applyContentState-no');
                break;
            case 1: //审核中
                $('.applyContentState').addClass(' ');
                $('<div> ' +
                    '<button class="button-sm button-whiteBoard agreeAndPass" >同意并通过</button>' +
                    ' <button class="button-sm button-whiteBoard agreeAndSend">同意并转交</button>' +
                    '<button class="button-sm button-whiteBoard approvalRefuse" >拒绝</button> </div>').appendTo($('.applyUseType'));
                break;
        }



        //抄送人

        if(data.ExecutProfileInfo){
            copPeople();
            copPeopleList(data.ExecutProfileInfo);
        }

        agreeAndPass();
        agreeAndSend();
        approvalRefuse()
    }

    /*
     *  审核总用时间
     */
    function useTime(data) {


        var time=data.TimeSpan;
        $('.applyUseTime label span').text(getTime(time))
    }

    /*
     *   抄送人列表
     */

    function copPeopleList(ExecutProfileInfo) {
        var moreList=$('#viewCopPeopleList ul');
        var list=$('.copPeopleList-content ul');

        function getListData() {
            for(var i=0;i<ExecutProfileInfo.length;i++){
                createCopList(ExecutProfileInfo[i]);
                createMoreCopList(ExecutProfileInfo[i]);
            }
        }
        if(ExecutProfileInfo.length<6){
            $('#getMoreList').css('display','none');
            getListData()
        }else {
            $('#getMoreList').css('display','block');
            getListData()
        }

        function createCopList(data) {
            var url=window.imgapiurl+data.FaceUrl.format(40, 40, "c").trim();
            var li=$('<li></li>').appendTo(list);
            $('<b></b>').css('background',"url("+ url+")center").appendTo(li);
            $('<span>'+ data.ExecutProfileName+'</span>').appendTo(li);
        }

        function createMoreCopList(data) {

            var url=window.imgapiurl+data.FaceUrl.format(40, 40, "c").trim();
            var li=$(' <li></li>').appendTo(moreList);
            $('<b></b>').css('background',"url("+ url+")center").appendTo(li);
            $('<span>'+ data.ExecutProfileName+'</span>').appendTo(li);
        }

    }



    /*
     * 审批的意见
     */
    function idContent(data) {

        var Status='';
        switch ((data.Status)){
            case 5:
                Status='<span style="color:#5cd85c">通过</span>';
                break;
            case 2:
                Status='<span style="color:#f23d3d">已被拒绝</span>';
                break;
        }

        $('.apply-opinion-content-ideaContent-c').text('');
        $('<p  class="apply-opinion-content-ideaContent-c-p">审批意见 <span class="icon iconfont icon-cha removeIdeaContent"></span></p>').appendTo($('.apply-opinion-content-ideaContent-c'));
        $('<div class="apply-opinion-content-ideaContent-c1"></div>').appendTo($('.apply-opinion-content-ideaContent-c'));
        $('<div class="apply-opinion-content-ideaContent-c2"></div>').appendTo($('.apply-opinion-content-ideaContent-c'));

        $('<div class="applyContentVoice"></div>').appendTo($('.apply-opinion-content-ideaContent-c'));
        $('<div class="applyContentFile"></div>').appendTo($('.apply-opinion-content-ideaContent-c'));


        $('<div class=""> ' +
            '<i class="face"></i> ' +
            '<span>用时：'+getTime(data.TimeSpan)+'</span>' +
            ' <label> <an >'+data.CommneterName+'</an> <br> ' +
            '<span style=" float:left" >'+ Status+'</span> </label> </div>').appendTo($('.apply-opinion-content-ideaContent-c1'));



        var FaceUrl=data.CommenterFaceFormatUrl;
        var faceUrl = window.imgapiurl + FaceUrl.format(40, 40, "c").trim();
        var face=$('.apply-opinion-content-ideaContent-c1 .face');
        face.css('background',"url("+ faceUrl+")");

        $('<div>' +
            ' <label>审批意见：</label><br> ' +
            '<p>'+ data.Comment+' </p> ' +
            '</div>').appendTo($('.apply-opinion-content-ideaContent-c2'));



        $('<div>  ' +
            '<div>语音：</div> ' +
            '<div class="approvalContentVoice_content"> <ul class="video"></ul> </div> ' +
            '</div>').appendTo($('.apply-opinion-content-ideaContent-c .applyContentVoice'));
        /*
         *   审批语音！
         */
        var video=data.Voices;
        if(video.length){
            for(var i=0;i<2;i++){
                createVideo('../../images/demo.mp3','approval'+i,'.approvalContentVoice_content .video');
            }
        }else{
            $('<span>(空)</span>').appendTo($('.approvalContentVoice_content .video'))
        }


        $('<div>' +
            '<div>文件：</div> ' +
            '<ul class="approvalContentFile-ul"></ul></div>').appendTo($('.apply-opinion-content-ideaContent-c .applyContentFile'));
        FileInfo(data,'.approvalContentFile-ul');


    }





    /*
    *   同意并通过--的--意见栏
    */
    function agreeAndPassContents() {

        $('.apply-opinion-content-ideaContent ').html('');
        var content;
        content=`
            <div class="apply-opinion-content-ideaContent-c row  contentForm">
                <p class="apply-opinion-content-ideaContent-c-p">同意并通过 <span class="icon iconfont icon-cha removeIdeaContent"></span></p>
                <div class="apply-opinion-content-ideaContent-c2">
                    <label>审批意见：</label><br>
                    <textarea style="height:162px;width: 320px; color:#4d4d4d" placeholder="请输入审批意见 " class="form-control textarea-mandatory"></textarea> 
                    <span class="wrong" style="height:14px"></span> 
                 </div>
                 
                <div class="form-barBig" style="">
                    <span style="position: absolute">上传文件：</span>
                    <div style="width:300px; height: 40px;float:right;display:none;background-color:lightpink;"> </div>
                    <iframe name="testLoad" id="testLoad" src="../ApplyApproval/ApprovalUploadBigFileInfo" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes" style="width:300px; height: 40px;float:right;display:inline-block;"></iframe>
                    <div class="clear"></div> 
                </div>
                <div class="form-barBig CcPeople">
                    <span>抄&nbsp; 送&nbsp; 人：</span>
                    <span class="copyFun" data-toggle="modal" data-target=".addCopy">添加抄送</span>
                    <ul class="copyList"></ul> 
                    <div class="clear"></div> 
                 </div>
            
            </div>
            <p class="approvalOpinionBtn"><button id="btn-submitLeave" class="button-sm button-confirm">确认</button></p>
        `;
        $('.apply-opinion-content-ideaContent ').append(content);





        $('#ChoosePeople').click(function () {
            $('.approvalList li').trigger('click');
        });



        //textarae:
        $(document).on("focus", ".apply-opinion-content-ideaContent-c2 textarea", function () {
            $(this).next().html("");
        });
        //textarea必填
        $(document).on("blur", ".textarea-mandatory", function () {
            if ($(this).val() == "") {
                $(this).next().html("不能为空");
            }
        });

        $("#btn-submitLeave").click(function () {

            //抄送人：
            DuplicaterIds = [];
            for (var j = 0; j < $(".cope-popup ul li").length; j++) {
                DuplicaterIds.push($(".cope-popup ul li")[j].id);
            }


            var Remark=$(".apply-opinion-content-ideaContent-c2 textarea").val();

            if(Remark==''){
                $('.textarea-mandatory').next().html("不能为空");
            }else{

            $.ajax({
                data: {
                    ApplyRequestId:applyRequestId,
                    "Remark": Remark,
                    "FileIDs": fileIDs,
                    "PhotoIDs": photoIDs,
                    "VideoIDs": videoIDs,
                    "ExecutProfileId":DuplicaterIds
                },
                url: "/ApplyApproval/AgreeAndPass",
                type: "Post",
                success: function (data) {
                    console.log(data);
                    if (data != null) {
                        if (data.successful) {
                            var Id = data.Data;
                            window.location.href = "/ApplyApproval/ApprovalContent?id=" + Id;
                            window.location.target = "mainframe";
                        }
                    }
                }
            });
        }
        })

    }

    /*
     *   同意并转交--的--意见栏
     */
    function agreeAndSendContents() {

        $('.apply-opinion-content-ideaContent ').html('');
        var content;
        content=`
             <div class="apply-opinion-content-ideaContent-c row  contentForm">
                <p class="apply-opinion-content-ideaContent-c-p">同意并转交 <span class="icon iconfont icon-cha removeIdeaContent"></span></p>
                <div class="apply-opinion-content-ideaContent-c2">
                    <label>审批意见：</label><br>
                    <textarea style="height:162px;width: 320px; color:#4d4d4d" placeholder="请输入审批意见 " class="form-control textarea-mandatory"></textarea> 
                    <span class="wrong" style="height:14px"></span> 
                 </div>
                 
                <div class="form-barBig" style="">
                    <span style="position: absolute">上传文件：</span>
                    <div style="width:300px; height: 40px;float:right;display:none;background-color:lightpink;"> </div>
                    <iframe name="testLoad" id="testLoad" src="../ApplyApproval/ApprovalUploadBigFileInfo" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes" style="width:300px; height: 40px;float:right;display:inline-block;"></iframe>
                    <div class="clear"></div> 
                </div>
                <div class="form-barBig ReferredPeople">
                    <span>转&nbsp; 交&nbsp; 人：</span><nb id="ChoosePeople" style="color:#f99740">选择转交人</nb>
                    <ul class="approvalList"></ul> 
                    <div class="clear"></div> 
                    <span class="wrong"></span> 
                </div>
            
            </div>
            <p class="approvalOpinionBtn"><button id="btn-submitLeave" class="button-sm button-confirm">确认</button></p>        
        `;
        $('.apply-opinion-content-ideaContent ').append(content);


        // var content=$(' <div class="apply-opinion-content-ideaContent-c row  contentForm"></div>').appendTo($('.apply-opinion-content-ideaContent'));
        // $('<p class="approvalOpinionBtn"><button id="btn-submitLeave" class="button-sm button-confirm">确认</button></p>').appendTo($('.apply-opinion-content-ideaContent'));
        //
        //
        // $('<div class="apply-opinion-content-ideaContent-c2"> ' +
        //     '<label >审批意见：</label><br> ' +
        //     '<textarea style="height:162px;width: 320px; color:#4d4d4d" placeholder="请输入审批意见 " class="form-control textarea-mandatory"></textarea> <span class="wrong" style="height:14px">' +
        //     '</span> </div>').appendTo($('.apply-opinion-content-ideaContent-c'));
        //
        // $('.apply-opinion-content-ideaContent-c2').before(' <p class="apply-opinion-content-ideaContent-c-p">同意并转交 <span class="icon iconfont icon-cha removeIdeaContent"></span></p>');
        //
        // $('<div class="form-barBig" style=""> ' +
        //     '<span style="position: absolute">上传文件：</span> ' +
        //     '<div style="width:300px; height: 40px;float:right;display:none;background-color:lightpink;"> </div> ' +
        //     '<iframe name="testLoad" id="testLoad" src="../ApplyApproval/ApprovalUploadBigFileInfo" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes" style="width:300px; height: 40px;float:right;display:inline-block;"></iframe>' +
        //     ' <div class="clear"></div> </div>').appendTo($('.apply-opinion-content-ideaContent-c'));
        //
        // $('<div class="form-barBig ReferredPeople"> ' +
        //     '<span>转&nbsp; 交&nbsp; 人：</span><nb id="ChoosePeople" style="color:#f99740">选择转交人</nb> ' +
        //     '<ul class="approvalList"></ul> <div class="clear"></div> <span class="wrong"></span> </div>').appendTo($('.apply-opinion-content-ideaContent-c'));




        $('#ChoosePeople').click(function () {
            $('.approvalList').next().next().html("");
            $('.approvalList li').trigger('click');
        });


        //textarae:
        $(document).on("focus", ".apply-opinion-content-ideaContent-c2 textarea", function () {
            $(this).next().html("");
        });
        //textarea必填
        $(document).on("blur", ".textarea-mandatory", function () {
            if ($(this).val() == "") {
                $(this).next().html("不能为空");
            }
        });



        $("#btn-submitLeave").click(function () {
            //审批人:
            var approvArr;
            for (var i = 0; i < $(".approvalList li").length; i++) {
                var DepartmentId;
                if ($(".approvalList li")[i].className == "") {
                    DepartmentId = "";
                } else {
                    DepartmentId = $(".approvalList li")[i].className;
                }
                approvArr = { "approvalDepartmentId": DepartmentId, "approvalProfileId": $(".approvalList li")[i].lastChild.id };

            }

            var Remark=$(".apply-opinion-content-ideaContent-c2 textarea").val();



            if(approvArr&&Remark){
                $.ajax({
                    data: {
                        ApplyRequestId:applyRequestId,
                        "Remark": Remark,
                        "FileIDs": fileIDs,
                        "PhotoIDs": photoIDs,
                        "VideoIDs": videoIDs,
                        "NextApprover": approvArr
                    },
                    url: "/ApplyApproval/AgreeAndNext",
                    type: "Post",
                    success: function (data) {
                        console.log(data)
                        if (data != null) {

                            if (data.successful) {

                                window.location.href = "/ApplyApproval/ApprovalContent?id=" + applyRequestId;
                                window.location.target = "mainframe";
                            }
                        }
                    }
                });
            }else if(Remark==''){
                $('.textarea-mandatory').next().html("不能为空");
            }else if(!approvArr){
                $('.approvalList').next().next().html("转交人不能为空");
            }


        })

    }

    /*
     *   拒接--的--意见栏
     */
    function approvalRefuseContents() {
        $('.apply-opinion-content-ideaContent ').html('');

        var content;
        content=`
             <div class="apply-opinion-content-ideaContent-c row  contentForm">
                <p class="apply-opinion-content-ideaContent-c-p">拒绝 <span class="icon iconfont icon-cha removeIdeaContent"></span></p>
                <div class="apply-opinion-content-ideaContent-c2">
                    <label>审批意见：</label><br>
                    <textarea style="height:162px;width: 320px; color:#4d4d4d" placeholder="请输入审批意见 " class="form-control textarea-mandatory"></textarea> 
                    <span class="wrong" style="height:14px"></span> 
                 </div>
                 
                <div class="form-barBig" style="">
                    <span style="position: absolute">上传文件：</span>
                    <div style="width:300px; height: 40px;float:right;display:none;background-color:lightpink;"> </div>
                    <iframe name="testLoad" id="testLoad" src="../ApplyApproval/ApprovalUploadBigFileInfo" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes" style="width:300px; height: 40px;float:right;display:inline-block;"></iframe>
                    <div class="clear"></div> 
                </div>         
            </div>
            <p class="approvalOpinionBtn"><button id="btn-submitLeave" class="button-sm button-confirm">确认</button></p>        
        `;
        $('.apply-opinion-content-ideaContent ').append(content);


        // var content=$(' <div class="apply-opinion-content-ideaContent-c row  contentForm"></div>').appendTo($('.apply-opinion-content-ideaContent'));
        // $('<p class="approvalOpinionBtn"><button id="btn-submitLeave" class="button-sm button-confirm">确认</button></p>').appendTo($('.apply-opinion-content-ideaContent'));
        //
        // $('<div class="apply-opinion-content-ideaContent-c2"> ' +
        //     '<label>审批意见：</label><br> ' +
        //     '<textarea style="height:162px;width: 320px; color:#4d4d4d" placeholder="请输入审批意见 " class="form-control textarea-mandatory"></textarea> <span class="wrong" style="height:14px">' +
        //     '</span> </div>').appendTo($('.apply-opinion-content-ideaContent-c'));
        //
        // $('.apply-opinion-content-ideaContent-c2').before(' <p class="apply-opinion-content-ideaContent-c-p">同意并转交 <span class="icon iconfont icon-cha removeIdeaContent"></span></p>');
        //
        // $('<div class="form-barBig" style=""> ' +
        //     '<span style="position: absolute">上传文件：</span> ' +
        //     '<div style="width:300px; height: 40px;float:right;display:none;background-color:lightpink;"> </div> ' +
        //     '<iframe name="testLoad" id="testLoad" src="../ApplyApproval/ApprovalUploadBigFileInfo" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes" style="width:300px; height: 40px;float:right;display:inline-block;"></iframe>' +
        //     ' <div class="clear"></div> </div>').appendTo($('.apply-opinion-content-ideaContent-c'));


        $('#ChoosePeople').click(function () {
            $('.approvalList li').trigger('click');
        });


        //textarae:
                $(document).on("focus", ".apply-opinion-content-ideaContent-c2 textarea", function () {
                    $(this).next().html("");
                })
        //textarea必填
                $(document).on("blur", ".textarea-mandatory", function () {
                    if ($(this).val() == "") {
                        $(this).next().html("不能为空");
                    }
                });



        $("#btn-submitLeave").click(function () {
            var Remark=$(".apply-opinion-content-ideaContent-c2 textarea").val();
           if(Remark==''){
               $('.textarea-mandatory').next().html("不能为空");

           }else{
            $.ajax({
                data: {
                    ApplyRequestId:applyRequestId,
                    "Remark": Remark,
                    "FileIDs": fileIDs,
                    "PhotoIDs": photoIDs,
                    "VideoIDs": videoIDs
                },
                url: "/ApplyApproval/ApprovalRefuse",
                type: "Post",
                success: function (data) {
                    if (data != null) {

                        if (data.successful) {

                            var Id = data.Data;
                            window.location.href = "/ApplyApproval/ApprovalContent?id=" + Id;
                            window.location.target = "mainframe";
                        }
                    }
                }
            });
            }
        })


    }

    /*
    *  审批 流程
    */
    function applyOpinion(data) {

        OpinionOne(data[0]);
        for(var i=1;i<data.length;i++){
            init(i);
            function init(i) {
                switch (i%2){
                    case 1:
                        OpinionTwo(data[i],i);
                        break;
                    case 0:
                        OpinionThree(data[i],i);
                        break;
                }
            }

        }

        function OpinionOne(data) {
            var time=data.TimeSpan;
            $(' <div class="apply-progress-1 progress-content"> ' +
                '<b ></b> ' +
                '<div class="apply-Content-footer-opinion"> ' +
                '   <i></i> ' +
                '   <div class="apply-opinion-time"> ' +
                '       <span class="glyphicon glyphicon-time " style="font-size: 16px"> </span>&nbsp;'+ TimeTransform(data.SubmitTime) +
                '   </div> ' +
                '   <div class="apply-opinion-content"> ' +
                '       <label class="apply-opinion-content-name">'+data.CommneterName+'-'+data.CommenterJobName+'</label> ' +
                '       <span class="apply-opinion-content-useTime">用时：'+ getTime(time)+'</span><br> ' +
                '       <label> <span class="apply-opinion-content-state"></span></label> ' +
                '       <a class="apply-opinion-content-idea">审批意见 <span class="Triangle-drop-out"></span></a> ' +
                '   </div> ' +
                '</div> </div>').appendTo('.apply-Content-footer-right-mid');

            var Status=data.Status;
            switch (Status){
                case 1:
                    $('.apply-progress-1 .apply-opinion-content-state').addClass('applyOning').text('审核中');
                    $('.apply-progress-1 .apply-opinion-content-idea').text('');
                    $('.apply-Content-footer-right-mid .apply-progress-1 b').css('background','#f99740');
                    break;
                case 2:
                    $('.apply-progress-1 .apply-opinion-content-state').addClass('applyNopass').text('拒绝');
                    $('.apply-Content-footer-right-mid .apply-progress-1 b').css('background','#f23d3d');
                    break;
                case 5:
                    $('.apply-progress-1 .apply-opinion-content-state').addClass('applyOk').text('成功');
                    break;
                case 4:
                    $('.apply-progress-1 .apply-opinion-content-state').addClass('applyOk').text('审核通过');
                    break;

            }


            var FaceUrl=data.CommenterFaceFormatUrl;
            var faceUrl = window.imgapiurl + FaceUrl.format(40, 40, "c").trim();
            var face=$('.apply-progress-1 .apply-Content-footer-opinion i');
            face.css('background',"url("+ faceUrl+")");

            $('.apply-progress-1 .apply-opinion-content-idea').click(function () {
                idContent(data);
                ideaContentShow();
                ideaContentHidden();
            })
        }

        function OpinionTwo(data,i) {
            var time=data.TimeSpan;
            $(' <div class="apply-progress-2 progress-content apply-progress'+i+'"> ' +
                '<b></b> ' +
                '<div class="apply-Content-footer-opinion"> ' +
                '   <i></i> ' +
                '   <div class="apply-opinion-time"> ' +
                '       <span class="glyphicon glyphicon-time " style="font-size: 16px"> </span>&nbsp;'+ TimeTransform(data.SubmitTime) +

                '   </div> ' +
                '   <div class="apply-opinion-content"> ' +
                '       <label class="apply-opinion-content-name">'+data.CommneterName+'-'+data.CommenterJobName+'</label> ' +
                '       <span class="apply-opinion-content-useTime">用时：'+ getTime(time)+'</span><br> ' +
                '       <label> <span class="apply-opinion-content-state"></span></label> ' +
                '       <a class="apply-opinion-content-idea">审批意见 <span class="Triangle-drop-out"></span></a> ' +
                '   </div> ' +
                '</div> </div>').appendTo('.apply-Content-footer-right-mid');


            var Status=data.Status;
            switch (Status){
                case 1:
                    $('.apply-progress'+i+' .apply-opinion-content-state').addClass('applyOning').text('审核中');
                    $('.apply-progress'+i+' .apply-opinion-content-idea').text('');
                    $('.apply-Content-footer-right-mid .apply-progress'+i+' b').css('background','#f99740');
                    break;
                case 2:
                    $('.apply-progress'+i+' .apply-opinion-content-state').addClass('applyNopass').text('拒绝');
                    $('.apply-Content-footer-right-mid .apply-progress'+i+' b').css('background','#f23d3d');
                    // $('.apply-progress-1 .apply-opinion-content-idea').text('');
                    // $('.apply-Content-footer-right-mid .apply-progress-1 b').css('background','#f99740');
                    break;
                case 5:
                    $('.apply-progress'+i+' .apply-opinion-content-state').addClass('applyOk').text('成功');

                    break;
                case 4:
                    $('.apply-progress'+i+' .apply-opinion-content-state').addClass('applyOk').text('审核通过');

                    break;

            }

            var FaceUrl=data.CommenterFaceFormatUrl;
            var faceUrl = window.imgapiurl + FaceUrl.format(40, 40, "c").trim();
            var face=$('.apply-progress'+i+' .apply-Content-footer-opinion i');
            face.css('background',"url("+ faceUrl+")");
            $('.apply-progress'+i+' .apply-opinion-content-idea').click(function () {
                idContent(data);
                ideaContentShow();
                ideaContentHidden();
            })
        }

        function OpinionThree(data,i) {
            var time=data.TimeSpan;
            $(' <div class="apply-progress-3 progress-content apply-progress'+i+'"> ' +
                '<b></b> ' +
                '<div class="apply-Content-footer-opinion"> ' +
                '   <i></i> ' +
                '   <div class="apply-opinion-time"> ' +
                '       <span class="glyphicon glyphicon-time " style="font-size: 16px"> </span>&nbsp;'+ TimeTransform(data.SubmitTime) +

                '   </div> ' +
                '   <div class="apply-opinion-content"> ' +
                '       <label class="apply-opinion-content-name">'+data.CommneterName+'-'+data.CommenterJobName+'</label> ' +
                '       <span class="apply-opinion-content-useTime">用时：'+ getTime(time)+'</span><br> ' +
                '       <label> <span class="apply-opinion-content-state">成功</span></label> ' +
                '       <a class="apply-opinion-content-idea">审批意见 <span class="Triangle-drop-out"></span></a> ' +
                '   </div> ' +
                '</div> </div>').appendTo('.apply-Content-footer-right-mid');


            var Status=data.Status;
            switch (Status){
                case 1:
                    $('.apply-progress'+i+' .apply-opinion-content-state').addClass('applyOning').text('审核中');
                    $('.apply-progress'+i+' .apply-opinion-content-idea').text('');
                    $('.apply-Content-footer-right-mid .apply-progress'+i+' b').css('background','#f99740');
                    break;
                case 2:
                    $('.apply-progress'+i+' .apply-opinion-content-state').addClass('applyNopass').text('拒绝');
                    $('.apply-Content-footer-right-mid .apply-progress'+i+' b').css('background','#f23d3d');
                    // $('.apply-progress-1 .apply-opinion-content-idea').text('');
                    // $('.apply-Content-footer-right-mid .apply-progress-1 b').css('background','#f99740');
                    break;
                case 5:
                    $('.apply-progress'+i+' .apply-opinion-content-state').addClass('applyOk').text('成功');

                    break;
                case 4:
                    $('.apply-progress'+i+' .apply-opinion-content-state').addClass('applyOk').text('审核通过');

                    break;

            }

            var FaceUrl=data.CommenterFaceFormatUrl;
            var faceUrl = window.imgapiurl + FaceUrl.format(40, 40, "c").trim();
            var face=$('.apply-progress'+i+' .apply-Content-footer-opinion i');
            face.css('background',"url("+ faceUrl+")");

            $('.apply-progress'+i+' .apply-opinion-content-idea').click(function () {
                idContent(data);
                ideaContentShow();
                ideaContentHidden();
            })
        }
    }

    /**************************************************************/
    /*
    * 同意并通过
    * agreeAndPass
     */
    function agreeAndPass() {
        $('.agreeAndPass').click(function () {

            agreeAndPassContents();
            ideaContentShow();
            ideaContentHidden()

        })
    }
    /*
     * 同意并转交
     *
     */
    function agreeAndSend() {
        $('.agreeAndSend').click(function () {

            agreeAndSendContents();
            ideaContentShow();
            ideaContentHidden()

        })
    }

    /*
     * 拒绝
     *
     */
    function approvalRefuse() {
        $('.approvalRefuse').click(function () {

            approvalRefuseContents();
            ideaContentShow();
            ideaContentHidden()

        })
    }

/***********************************************************/

    /*
     * 时间转换2
     * "/Date(1492572246000)/"-->2017-04-19 11:24:06
     */
    function TimeTransform(inTime) {
        var Time=parseInt(inTime.split('(')[1].split(')')[0]);
        if((new Date(Time)).getHours()<10){
            var hours='0'+(new Date(Time)).getHours();
        }else{
            hours=(new Date(Time)).getHours();
        }
        if((new Date(Time)).getMinutes()<10){
            var minutes='0'+(new Date(Time)).getMinutes();
        } else{
            minutes=(new Date(Time)).getMinutes();
        }
        if((new Date(Time)).getSeconds()<10){
            var seconds='0'+(new Date(Time)).getSeconds();
        } else{
            seconds=(new Date(Time)).getSeconds();
        }
        var theMonth=parseInt((new Date(Time)).getMonth())+1;
        var theDate=(new Date(Time)).getDate();
        if(theMonth<10){
            theMonth='0'+theMonth
        }
        if(theDate<10){
            theDate='0'+theDate;
        }
        var FTime=(new Date(Time)).getFullYear()+'-'+theMonth+'-'+theDate+' '+
            hours+':'+minutes+':'+seconds;

        return FTime;
    }

    /*
     *  时间转换3（分钟-）
     *  183分-->**分钟or**小时 or **天 。。。。
     */
    function getTime(time) {
        time=time.split('分')[0];
        var Time='';
        if(time<60){
            Time=time+'分钟'
        }else if(time<1440){

            Time=fomatFloat( (time/60), 1) +'小时';

        }else if(time<525600){
            Time=fomatFloat( (time/(60*24)), 1) +'天';
        }else{
            Time=fomatFloat(time/(60*24*365), 1) +'年';
        }
        return Time
    }

    /*
     *  数字小数点保留
     *  fomatFloat(原数字,保留小数点位数)
     */
    function fomatFloat(src,pos){
        return Math.round(src*Math.pow(10, pos))/Math.pow(10, pos);
    }

    /*
     *   请假类型转换
     */
    function LeaveType(twistStr) {
        var typeName;
        if (twistStr==1) {
            typeName = "年假";
        } else if (twistStr ==2 ) {
            typeName = "事假";
        } else if (twistStr == 3) {
            typeName = "病假";
        } else if (twistStr == 4) {
            typeName ="调休" ;
        } else if (twistStr == 5) {
            typeName ="婚假" ;
        } else if (twistStr ==6 ) {
            typeName ="产假" ;
        } else if (twistStr ==7 ) {
            typeName ="陪产假" ;
        } else if (twistStr ==8 ) {
            typeName = "路途假";
        } else if (twistStr ==9 ) {
            typeName = "其他";
        }
        return typeName;

    }


    /*
     *   文件大小转换
     */
    function returnFileSize(size) {
        var Fsize;
        var sizeNum = size / 1024;
        if (sizeNum == 0) {
            Fsize = "-";
        } else if (sizeNum > 0 && sizeNum < 999.9) {
            Fsize = (sizeNum).toFixed(1) + "KB";
        } else if (sizeNum > 999.999 && sizeNum < 1048576) {
            Fsize = ((sizeNum) / 1024).toFixed(1) + "MB";
        } else {
            Fsize = ((sizeNum) / 1048576).toFixed(1) + "GB";
        }
        return Fsize;
    }

    /*
     *   语音
     */
    function createVideo(videoUrl,n,thePlace) {

        var videoBg= $(' <li class="videoBg videoBg_'+n+'"> </li>').appendTo($(thePlace));
        var videoIn=$('<div class="videoIn"></div>').appendTo(videoBg);
        var videoLong=$(' <div class="videoLong"></div>').appendTo(videoBg);
        var id='video'+n;
        $('<video  src="'+ videoUrl+'" id="'+ id+'"></video>').addClass('ThisVideo').css('display','none').appendTo(videoBg);
        var myVideo=document.getElementById(id);
        var Long;
        myVideo.addEventListener("loadedmetadata", function(){
            Long=myVideo.duration;
            videoLong.text(Math.round(Long)+'"');
        });

        videoBg.click(function () {
            if (myVideo.paused){
                myVideo.play();
                var i=1,n=1;
                var theTime=setInterval(function () {
                    n++;
                    videoIn.css('backgroundPositionX','+=20px');
                    i++;
                    if(i>4){
                        i=1;
                        videoIn.css('backgroundPositionX','-60px');
                    }
                    if(n>videoLong*2||myVideo.paused){
                        clearInterval(theTime);
                        videoIn.css('backgroundPositionX','-60px');
                    }
                },500);
            }
            else{
                myVideo.pause();
                videoIn.css('backgroundPositionX','-60px');
            }
        })
    }

    /*
    *  通用ajax方法
    */
    function createAjax(data,url,type,successCallBack) {
        console.time('time2')
        $.ajax({
            data:data,
            url:url,
            type:type,
            dataType:'json',
            success:function (data) {
                console.timeEnd('time2')
                successCallBack(data)
            },
            error:function (error) {
                console.info(error)
            }
        });
    }

    // 网页请求
    function getData(id) {

        data={
            applyrequestId:id
        };
        url='/ApplyApproval/GetApprovalDetail';
        type='Get';
        successCallBack=function (data) {

            if(data.successful){

                createApplyContent(data.Data)

            }
        };

        createAjax(data,url,type,successCallBack)

    }

    /*
    *  抄送人显示隐藏
    */
    function copPeople() {
        var copeState = false;
        $('.copPeople').click(function () {

            if (!copeState) {
                $('.copPeopleList-s').css('display', 'block');
                $('.copPeopleList-d').css('display', 'block');
                $('.copPeopleList').css('display', 'block');
                copeState = !copeState;
            } else {
                $('.copPeopleList-s').css('display', 'none');
                $('.copPeopleList-d').css('display', 'none');
                $('.copPeopleList').css('display', 'none');
                copeState = !copeState;
            }
            $(document).click(function (e) {
                if(!($('.copPeople').is(e.target)||$('.copPeopleList').is(e.target))&& $('.copPeopleList').has(e.target).length === 0){
                    copeState = false;
                    $('.copPeopleList-s').css('display', 'none');
                    $('.copPeopleList-d').css('display', 'none');
                    $('.copPeopleList').css('display', 'none');
                }else if($('.copPeopleList-remove').is(e.target)){
                    copeState = false;
                    $('.copPeopleList-s').css('display', 'none');
                    $('.copPeopleList-d').css('display', 'none');
                    $('.copPeopleList').css('display', 'none');
                }
            })
        })
      
    }

    /*
    * 审批意见显示隐藏
    */
    function ideaContentShow() {
                if(ideaState){
                    ideaState=false;
                    $('.opinion-content-ideaContent').animate({
                        right:'0px'
                    })
                }

    }
    function ideaContentHidden() {
        $('.removeIdeaContent').click(function () {
            ideaState=true;
            $('.opinion-content-ideaContent').animate({
                right:'-360px'
            })
        })
    }


    /*
    * 匹配文件格式
    */
    function sureFtype(item) {
        var gzys = [
            //视频
            {
                "mp4": "video", "avi": "video", "3gp": "video", "rmvb": "video", "rm": "video", "wmv": "video", "mkv": "video", "mpeg": "video", "mpg": "video", "vob": "video",
                "mov": "video", "swf": "video", "flv": "video", "f4v": "video", "dat": "video", "VCD": "video", "drc": "video", "dsm": "video", "dsv": "video", "dsa": "video", "dss": "video",
                "ifo": "video", "d2v": "video", "fli": "video", "flc": "video", "lic": "video", "ivf": "video", "mpe": "video", "mtv": "video", "m1v": "video", "m2v": "video", "mpv2": "video",
                "mp2v": "video", "ts": "video", "tp": "video", "tpr": "video", "pva": "video", "pss": "video", "m4v": "video", "m4p": "video", "m4b": "video", "3gpp": "video", "3g2": "video",
                "3gp2": "video", "ogm": "video", "qt": "video", "amr": "video", "ratdvd": "video", "rt": "video", "rp": "video", "smi": "video", "smil": "video", "amv": "video", "dmv": "video",
                "navi": "video", "ra": "video", "ram": "video", "rpm": "video", "roq": "video", "smk": "video", "bik": "video", "wmp": "video", "wm": "video", "asf": "video", "asx": "video",
                "m3u": "video", "pls": "video", "wvx": "video", "wax": "video", "wmx": "video", "mpcpl": "video", "mpeg4": "video", "mpg4": "video", "mpg": "video", "mpeg1": "video",
                "mpg1": "video", "mpeg2": "video", "mpg2": "video", "mpeg4": "video", "mpg4": "video", "mp4": "video", "mpeg1": "video", "dat": "video", "mpeg2": "video"
            },
            //音乐
            {
                "mp3": "music", "wma": "music", "flac": "music", "aac": "music", "mmf": "music", "amr": "music", "m4a": "music", "m4r": "music",
                "Ogg": "music", "wav": "music", "wavpack": "music", "wave": "music", "au": "music", "CD": "music", "wav": "music", "wmv": "music",
                "ra": "music", "ogg": "music", "mpc": "music", "ape": "music", "ac3": "music", "mpa": "music", "mpc": "music", "mp2": "music",
                "m1a": "music", "m2a": "music", "mid": "music", "midi": "music", "rmi": "music", "mka": "music", "dts": "music", "cda": "music",
                "snd": "music", "aif": "music", "aifc": "music", "aiff": "music", "cda": "music", "ofr": "music", "realAudio": "music", "vqf": "music"
            },
            //word
            { "doc": "word", "docx": "word", "txt": "word", "pdf": "word" },
            //excle
            { "xls": "excle", "xlsx": "excle" },
            //ppt
            { "ppt": "ppt", "pptx": "ppt", "pps": "ppt", "ppsx": "ppt" },
            //压缩文件
            {
                "rar": "compressed", "zip": "compressed", "tar": "compressed", "cab": "compressed", "uue": "compressed", "jar": "compressed",
                "iso": "compressed", "z": "compressed", "7-zip": "compressed", "ace": "compressed", "lzh": "compressed", "arj": "compressed",
                "gzip": "compressed", "bz2": "compressed"
            },
            //img
            {
                "bmp": "img", "gif": "img", "jpeg": "img", "trff": "img", "png": "img", "svg": "img", "pcx": "img", "dxf": "img", "wmf": "img", "emf": "img",
                "lic": "img", "jpg": "img", "tga": "img"
            },
            //其他
        ];
        //console.log(gzys[1].mp3);
        var numLast = item.Name.split(/[.]/).length-1;
        var format = item.Name.split(/[.]/)[numLast];

        // console.log(item.Name);
        for (var i = 0; i < gzys.length; i++) {
            for (key in gzys[i]) {
                if (key == format) {
                    Ftype = gzys[i][key];
                }
            }
        }

        //图片处理
        String.prototype.format = function () {
            if (arguments.length == 0) return this;
            for (var s = this, i = 0; i < arguments.length; i++)
                s = s.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
            return s;
        };
        // console.log(Ftype);


        if (Ftype == "video") {//视频
            strI = '<i class="iconfont filetype" style="color: #fc9448;">&#xe691;</i>';
        } else if (Ftype == "music") {//音乐
            strI = '<i class="iconfont filetype" style="color: #f4be3a;">&#xe64d;</i>';
        } else if (Ftype == "word") {//word
            strI = '<i class="iconfont filetype" style="color: #6199f3;">&#xe642;</i>';
        } else if (Ftype == "excle") { //excle
            strI = '<i class="iconfont filetype" style="color: #4cca8e;">&#xe641;</i>';
        } else if (Ftype == "ppt") { //ppt
            strI = '<i class="iconfont filetype" style="color: #f25f60;">&#xe640;</i>';
        } else if (Ftype == "compressed") {//压缩文件
            strI = '<i class="iconfont filetype" style="color: #9b8ab7;">&#xe64c;</i>';
        } else if (Ftype == "img") {//img

            // var Src = window.bigfileurl + (item.Url);

            var Src = window.imgapiurl + (item.Url).format(30, 30, "c").trim();

            strI = '<img style="float:left;margin:5px 15px 0 0;" src="' + Src + '">';
        } else {
            strI = '<i class="iconfont filetype" style="color: #a1ae9a;">&#xe64b;</i>';
        }

        // console.info(strI)
    }



    /*
     *  获取url传的值
     */
    function GetRequest() {

        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
            }
        }
        applyRequestId=theRequest.id;


    }


    /*
     * 初始化
     */
    function initial() {

        //滚动条
        $('.apply-Content-footer-left').niceScroll({ styler: "fb", cursorcolor: "rgba(0, 0, 0, 0.25)", cursorwidth: '3', cursorborderradius: '0px', background: '#ffffff', spacebarenabled: false, cursorborder: '0' });

        $('.apply-opinion-content-ideaContent').niceScroll('.apply-opinion-content-ideaContent .apply-opinion-content-ideaContent-c',{ styler: "fb", cursorcolor: "rgba(0, 0, 0, 0.25)", cursorwidth: '3', cursorborderradius: '0px', background: '#ffffff', spacebarenabled: false, cursorborder: '0' });

        $('.apply-Content-footer-right-mid').niceScroll({ styler: "fb", cursorcolor: "rgba(0, 0, 0, 0.25)", cursorwidth: '3', cursorborderradius: '0px', background: '#ffffff', spacebarenabled: false, cursorborder: '0' });
        //模态框
        $(function () {
            $('[data-toggle="popover"]').popover()
        });

        //
        $('.dropdown-toggle').dropdown()

        //

        String.prototype.format = function () {
            if (arguments.length == 0) return this;
            var s;
            var i;
            for (s = this, i = 0; i < arguments.length; i++)
                s = s.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
            return s;
        };
    }


    function init() {

        GetRequest();
        initial();
        getData(applyRequestId);

    }
    init();

});
