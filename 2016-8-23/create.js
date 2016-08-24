/**
 * Created by Administrator on 2016/8/24 0024.
 */
window.boking = window.boking || {};

(function () {

    function CreateBall() {
        this._htmlNode = document.createElement("div");
    }

    var king=CreateBall.prototype;


    king.getHtmlNode=function () {
        this.startBall();
        this.BallStyle();
        this.MoveBall();
        this.ballColor();
        return this._htmlNode;
    };

    king.BallStyle=function () {
        this._htmlNode.style.width = "30px";
        this._htmlNode.style.height = "30px";

        this._htmlNode.style.borderRadius = "50%";
        this._htmlNode.style.position = "absolute";
    };

    king.ballColor=function () {
        var n=Math.floor(Math.random() *4)%4;
        switch (n){
            case 0:
               var col='green';
                break;
            case 1:
                var col='yellow';
                break;
            case 2:
                var col='blue';
                break;
            case 3:
                var col='red';
                break;
        }
        this._htmlNode.style.background = col;
    };

    king.startBall=function() {
        var X = Math.floor(Math.random() * 1480);
        var Y = Math.floor(Math.random() * 980);
        this._htmlNode.style.left = X + "px";
        this._htmlNode.style.top = Y + "px";
    };

    king.MoveBall=function () {
        var startX = parseInt(this._htmlNode.style.left);
        var startY = parseInt(this._htmlNode.style.top);
        var speedX;
        var speedY;
        while (true) {
            speedX = 10 - Math.floor(Math.random() * 21);
            speedY = 10 - Math.floor(Math.random() * 21);
            if (!(speedX==0&&speedY==0))
                break;
        }

        var id=setInterval(function () {
            startX+=speedX;
            startY+=speedY;
            this._htmlNode.style.left = startX + "px";
            this._htmlNode.style.top = startY + "px";
            if((startX <= 0 || startX >= 1480)|| (startY <= 0 || startY >= 980)){
                clearInterval(id);
                this._htmlNode.parentNode.removeChild(this._htmlNode);
            }
        }.bind(this), 20);
    };
    boking.CreateBall = CreateBall;
})();