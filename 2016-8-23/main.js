/**
 * Created by Administrator on 2016/8/24 0024.
 */
(function () {
    var box = document.getElementById("box");
    function getMoreBall(Num) {
        for (var i=0;i<Num;i++) {
            var createBall = new boking.CreateBall();
            box.appendChild(createBall.getHtmlNode());
        }
    }
    getMoreBall(100);

})();
