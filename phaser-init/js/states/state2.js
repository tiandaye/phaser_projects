var State2 = function(game) {

    var w = null
    var h = null

    var img2_1=null
    var img2_2=null

    this.preload = function() {

      w = game.width
      h = game.height

      img2_1=game.add.sprite(0,h*.5,'img2_1')
      img2_1.width=w
      img2_1.height=h*.5
      img2_1.anchor.set(0,1)
      game.add.tween(img2_1).to({ y:h }, 2000, Phaser.Easing.Linear.In, true, 500, -1, true)

      img2_2=game.add.sprite(0,h*.5,'img2_2')
      img2_2.width=w
      img2_2.height=h*.5
      game.add.tween(img2_2).to({ y:0 }, 2000, Phaser.Easing.Linear.In, true, 500, -1, true)

    }

    this.create = function() {

    }

}
