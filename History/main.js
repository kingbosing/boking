/**
 * Created by Administrator on 2016/8/10 0010.
 */
(function () {
    window.onhashchange = function (event) {
        changePage();
    };
    function  changePage() {

        var hashObj={};

        var hashString=location.hash;
        if(hashString&&hashString!=''){
            var kvStrs=location.hash.substr(1).split('&');
            for (var i=0;i<kvStrs.length;i++){
                var kv=kvStrs[i].split('=');
                hashObj[kv[0]]=kv[1];
            }

        }
        switch (hashObj.page){
            case '2':
                container.innerHTML='<img src=12.jpg>';
                break;
            case '3':
                container.innerHTML='';
                break;
            default:
                container.innerHTML=' <h1> hello</h1>';
                break;

        }
    }





       

})();