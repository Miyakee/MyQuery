/**
 * Created by Miyakee on 2015/10/27.
 * It's  comic collection which use js ,didn't con
 */

/**
 * 颜色透明度变化
 * @returns {{change: }}
 */

function filter(){
    var timer=null;
    function change(obj,alpha,time){
        var opa= obj.currentStyle?obj.currentStyle.opacity:window.getComputedStyle(obj,null).opacity;
        speed=parseInt(alpha-opa*100)*100/time;
        clearInterval(timer);
        var t,op;
        timer=setInterval(function(){
             op=obj.currentStyle?obj.currentStyle.opacity:window.getComputedStyle(obj,null).opacity;
             t=op*100;
            console.log(t);
            if((alpha>=t&&speed>0)||(alpha<=t&&speed<0)){
                obj.style.opacity=(t+speed)/100;
                obj.style.filter='alpha(opacity.'+(t+speed/100)+')';
            }else{
                clearInterval(timer);
            }
        },30);

    }
    return {
        change: function (obj, alpha, time) {
            change(obj, alpha, time);
        }
}
}
/**
 * 通过这个函数获取样式
 * @param obj 对象
 * @param style 希望获得的样式
 * @returns {*}
 */
function getStyle(obj,style){
    var attr=obj.currentStyle?obj.currentStyle[style]:window.getComputedStyle(obj,null)[style];
    return attr;
}
/**
 *
 * @param obj
 * @param time
 * @param attr 运动的方式
 * @param type 0=减速
 * @constructor
 */
var timer = null;

function Action(obj,time,all,type,func){
var flag=true;
        clearInterval(timer);
        timer = setInterval(function () {
            for(var attr in all ) {
                var aimX = all[attr];
                var now = parseInt(getStyle(obj, aimX));
                var dis = aimX - now;
                var speed = (dis * 30) / time;
                //var speed=10;
                if (type == 0) {
                    if (speed < 0) {
                        speed = Math.floor((aimX - parseInt(getStyle(obj, attr))) * 30 / time);
                    } else {
                        speed = Math.ceil((aimX - parseInt(getStyle(obj, attr))) * 30 / time);
                    }
                }else{
                    if (speed < 0) {
                        speed = -5;
                    } else {
                        speed = 5;
                    }
                }

                if (speed >= 0 && parseInt(getStyle(obj, attr)) < aimX || speed <= 0 && parseInt(getStyle(obj, attr)) > aimX) {
                    obj.style[attr] = parseInt(getStyle(obj, attr)) + speed + "px";
                    flag=false;
                } else {
                    if(flag==true){
                    clearInterval(timer);
                    if (func) {
                        func();
                    }}
                }
            }}, 30
        );


}
//
///**
// * 直线运动
// */
//function Straight(){
//    /**
//     *
//     * @param obj
//     * @param aimX
//     * @param time
//     * @param type=0 表示减速运动 type=1 表示平均速度
//     */
//    function xWay(obj,aimX,time,type){
//    var timer=null;
//    var now=obj.offsetLeft;
//    var dis=aimX-now ;
//    var speed=(dis*30)/time;
//
//        setInterval(function(){
//            clearInterval(timer);
//                if(speed>=0&&obj.offsetLeft<aimX||speed<=0&& obj.offsetLeft>aimX){
//                    obj.style.left=obj.offsetLeft+speed +"px";
//                    if(type==0){
//                        if(speed<0){
//                        speed=Math.floor((aimX-obj.offsetLeft)*30/time);
//                        }else{
//                            speed=Math.ceil((aimX-obj.offsetLeft)*30/time);
//                        }
//                    }
//            }
//        },30
//    );
//
//    }
//
//    function yWay(obj,aimY,time,type){
//        var timer=null;
//        var now=obj.offsetTop;
//        var dis=aimY-now ;
//        var speed=(dis*30)/time;
//
//        setInterval(function() {
//                    clearInterval(timer);
//                if(speed >= 0 && obj.offsetTop < aimY || speed <= 0 && obj.offsetTop > aimY){
//                    obj.style.top = obj.offsetTop + speed + "px";
//                    console.log(speed);
//                    if (type == 0) {
//                        if(speed<0){
//                            speed=Math.floor((aimY-obj.offsetTop)*30/time);
//                            console.log(1);
//
//                        }else{
//                            console.log(2);
//
//                            speed=Math.ceil((aimY-obj.offsetTop)*30/time);
//                        }
//                     }
//                }
//            },30
//        );
//    }
//
//
//
//    return{
//        xWay:function(obj,aimX,time,type){
//            xWay(obj,aimX,time,type);
//        },
//        yWay:function(obj,aimY,time,type){
//            yWay(obj,aimY,time,type);
//        }
//    }
//}