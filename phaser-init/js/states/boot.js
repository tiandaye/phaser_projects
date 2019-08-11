var Boot = function(game) {
    var baseURI = localStorage.baseURI
    this.init = function() {
        //game.device.desktop判断是WAP端还是PC端，true为PC端，false为WAP端
        if (!game.device.desktop) {
            //设置游戏背景色
            game.stage.backgroundColor = '#282C34'
            //鼠标指针对象，由于WAP端没有鼠标，因此设置为1（即为null）
            game.input.maxPointers = 1
            //缩放控制，这里将画布（canvas）拉伸至填满父容器（即#game-container），不保持比例
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
            //启用时，显示画布（canvas）将在父容器中水平对齐
            game.scale.pageAlignHorizontally = true
            //启用时，显示画布（canvas）将在父容器中垂直对齐
            game.scale.pageAlignVertically = true
            //强制游戏只能以一个方向运行，这里设置游戏仅能在纵向模式运行（true），无法再横向模式运行（false）
            game.scale.forceOrientation(false, true)
            //当forceOrientation设置只能纵向模式运行，把手机横向摆放就会调用enterIncorrectOrientation这个方法
            game.scale.enterIncorrectOrientation.add(enterIncorrectOrientation, this)
            //当forceOrientation设置只能纵向模式运行，把手机横向摆放就会调用enterIncorrectOrientation这个方法，重新将手机纵向摆放就会调用leaveIncorrectOrientation这个方法
            game.scale.leaveIncorrectOrientation.add(leaveIncorrectOrientation, this)
        }else{
            game.scale.pageAlignHorizontally = true
            game.scale.pageAlignVertically = true
            // 防止浏览器失去焦点后动画暂停，如果考虑到计算机性能可以设置为false
            game.stage.disableVisibilityChange = true
        }

    }
    this.preload = function() {
        //设置图片支持跨域请求
        game.load.crossOrign = true
        //加载预加载界面所需的资源，可以看到图片跟$('.main')界面一致，第一个参数是创建sprite对象时所需要的资源标识，第二个参数是资源所在路径
        game.load.image('start_bg', baseURI + '/img/bg.png')

    }
    this.create = function() {
        //跳转到下一个场景
        game.state.start('Preload')
    }

    function enterIncorrectOrientation() {
        alert('请将手机纵向摆放')
    }

    function leaveIncorrectOrientation() {
        alert('已经将手机纵向摆放')
    }

}
