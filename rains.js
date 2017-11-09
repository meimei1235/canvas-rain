var can = document.querySelector("#mycanvas");
var context = can.getContext("2d");
var w = can.width = window.innerWidth;
var h = can.height = window.innerHeight;

window.onresize = function() {
    w = can.width = window.innerWidth;
    h = can.height = window.innerHeight;
};
//定义雨类
class Rain{
//        初始化雨类
    init() {
        this.x = random(0, w);     //初始横坐标
        this.y = 0;                //初始纵坐标
        this.v = random(4,6);      //雨滴下落速度
        this.h = random(0.8*h, 0.9*h);  //雨滴下落的高度
        this.r = 1;              //雨滴的初始半径
        this.vr = 1;             //雨滴的半径增大速度
        this.a = 1;              //透明度
        this.va = 0.95;          //透明度变化速度
//            console.log(this);
    };
    draw() {
        if (this.y > this.h) {
            context.beginPath();
            context.strokeStyle = "rgba(0,255,255,"+this.a+")";
            context.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
            context.stroke();
        }else{
            context.fillStyle = "#3ff";
            context.fillRect(this.x, this.y, 3, 30);

        }
        this.update();
    };
    update() {
        if (this.y < this.h) {
            this.y += this.v;
        }else {
            if (this.a > 0.03) {
                this.r += this.vr;
                if (this.r > 50) {
                    this.a *= this.va;
                }
            }else {
                this.init();
            }

        }

    };

}

function random(min, max) {
    return Math.random()*(max - min) + min;
}

function getRains(num) {
    var rains = [];
    for (var i = 0; i < num; i++) {
        setTimeout(function () {
            var rain = new Rain();
            rain.init();
            rains.push(rain);
        }, 200 * i);
    }
    return rains;
}

function move(rains) {
    setInterval(function () {
        context.fillStyle = "rgba(0,0,0,0.1)";
        context.fillRect(0, 0, w, h);
        for (var i = 0, len = rains.length; i < len; i++) {
            rains[i].draw();
        }
    }, 1000 / 60);
}

var rains = getRains(50);
move(rains);
