var Preload = function(game) {
    var baseURI = localStorage.baseURI
    var tool = new utils()
    var w = null
    var h = null
    var start_bg = null
    var loading = null
    this.init = function() {
        //获取画布的宽高，即Ratio倍屏幕宽高
        w = game.width
        h = game.height
        //动画组，方便统一处理多个对象的动画
        group=game.add.group()
        //将$('.main')元素隐藏
        $('.main').hide()
        //由于start_bg跟$('.mian')界面一致，用户是看不出$('.mian')隐藏start_bg显示这个过程的
        //创建sprite对象，第一个参数是画布x坐标（距离画布左边缘多远），第二个参数是画布y坐标（距离画布上边缘多远），第三个参数是构建对象的资源
        start_bg = game.add.sprite(0, 0, 'start_bg')
        //将start_bg宽高设置全屏
        tool.setFull(start_bg)
        //创建文本对象，前面两个参数跟sprite等同，第三个参数是文本内容，第四个参数是文本样式
        loading=game.add.text(w*.5, h*.5, '0%',
            {
                fontSize:60,
                fill:'#ffffff'
            })
        //锚点位置（相对自身），第一个参数是相对自身左移多少（.5是左移自身宽度的50%），第二个参数是相对自身上移多少（.5是上移自身高度的50%）
        loading.anchor.set(.5, .5)
        //loading最后的位置是相对画布居中
        //loading的补间动画，from（从怎样的状态转变到默认状态），to（从默认状态转变到怎样的状态），这里用的是from
        //第一个参数：一个js对象，包含着需要进行动画的属性，{ alpha: 0 }表示透明度为0
        //第二个参数：动画的持续时间
        //第三个参数：动画过程函数，默认为匀速动画Phaser.Easing.Linear.None
        //第四个参数：是否自动开始
        //第五个参数：动画开始前的延迟时间，单位是毫秒
        //第六个参数：动画重复的次数，如果需要动画永远循环，则把该值设为 Number.MAX_VALUE
        //第七个参数：是否自动反转
        game.add.tween(loading).from({ alpha: 0 }, 500, null, true, 0, 0, false)
    }
    this.preload = function() {
        game.load.crossOrign = true
        //加载帧图片，第一个参数是创建sprite对象时所需要的资源标识，第二个参数是图片所在路径，第三个参数是标识图片xml文件
        game.load.atlasXML('sprites', baseURI + '/img/sprites.png',baseURI + '/img/sprites.xml')

        game.load.image('next', baseURI + '/img/next.png')
        game.load.image('img2_1', baseURI + '/img/2_1.jpg')
        game.load.image('img2_2', baseURI + '/img/2_2.jpg')
        //这个方法是文件加载过程，返回的progeress是完成的进度，0~100
        game.load.onFileComplete.add(function(progeress) {
            loading.setText(progeress + '%')
        })
        //所有文件都完成加载时会调用这个方法，我们可以在调用这个方法的时候跳转到下一个场景
        game.load.onLoadComplete.add(function() {
            game.state.start('State1')
        })
    }
    this.create = function() {}
    this.update = function() {}
}
