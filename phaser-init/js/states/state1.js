var State1 = function(game) {

    var baseURI = localStorage.baseURI

    var tool = new utils()
    var w = null
    var h = null
    
    var next=null
    var sprites=null
    var group=null

    this.preload = function() {

      w = game.width
      h = game.height

      //动画组，方便统一处理多个对象的动画
      group=game.add.group()

      //第四个参数是没有加入动画时静态展示第几帧图片
      sprites=game.add.sprite(w*.5,h*.6,'sprites',0)
      tool.setSize(sprites,'width',w*.5)
      sprites.anchor.set(.5,1)
      //给sprite对象添加一个新动画，第一个参数是动画名称
      sprites.animations.add('run')
      //播放动画，第一个参数是动画名称，第二个参数是播放的速率，第三个参数是是否循环
      sprites.animations.play('run',4,true)
      
      
      //将start_bg加入动画组
      group.add(sprites)

      next=game.add.sprite(w*.5,h*.8,'next')
      tool.setSize(next,'width',w*.3)
      next.anchor.set(.5,.5)
      game.add.tween(next).to({ width:next.width+20,height:next.height+20 }, 500, Phaser.Easing.Linear.In, true, 0, -1, true)

      group.add(next)

      //默认情况下，游戏对象不会处理任何事件，所以我们需要让它可以处理事件
      next.inputEnabled = true

      //当对next对象点击手指放开的时候触发
      next.events.onInputUp.add(function() {

        //onComplete方法是补间动画完成后的回调，我们可以在跳转到下一个场景的时候做一些用户体验比较良好的当前场景的退场动画
        game.add.tween(group).to({ alpha: 0 }, 500, Phaser.Easing.Linear.In, true, 0, 0, false).onComplete.add(function() {
            game.state.start('State2')
        })
        
      })

    }

}
