function utils(game) {
    //扩展方法：保持图片宽高比的前提下缩放图片
    this.setSize = function(sprite, param, len) {
        if (param === 'height') {
            var precent = len / sprite.height
            sprite.height = len
            sprite.width = sprite.width * precent
        } else {
            var precent = len / sprite.width
            sprite.width = len
            sprite.height = sprite.height * precent
        }
    }
    //扩展方法：将图片拉伸至满屏，不保持宽高比
    this.setFull = function(obj) {
        var Ratio = window.devicePixelRatio
        var w = document.documentElement.clientWidth || document.body.clientWidth
        var h = document.documentElement.clientHeight || document.body.clientHeight

        var ww = Ratio * w
        var hh = Ratio * h
        obj.width = ww
        obj.height = hh
    }
}
// 动画特效
/*
 Back
 Bounce
 Circular
 Cubic
 Elastic
 Exponential
 Linear
 Quadratic
 Quartic
 Quintic
 Sinusoidal
 */
