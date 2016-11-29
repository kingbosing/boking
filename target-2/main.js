(function () {

    // div.addEventListener('contextmenu',function (event) {
    //     event.preventDefault();/*阻止事件默认行为*/
    // });
    // function divClickedHandler(event) {
    //         div.removeEventListener("click",divClickedHandler);
    //         div.style.background=yellow;
    //     }
    // // var div=document.getElementById("div");
    // div.onclick=function (event) {
    //     div.style.background=yellow;
    // };
    var div=document.getElementById("div");
    var colors=["red","yellow","blue"];
    var index=0;
    div.addEventListener("click",function (event) {
        index++;
        if(index>=colors.length){
            index=0;
        }
        event.target.style.background=colors[index];
    });
   
    
    

})();