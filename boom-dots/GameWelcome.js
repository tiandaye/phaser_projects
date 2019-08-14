var GameWelcome = function(game) {
    this.preload = function() {
        // 如果觉得默认字体太难看,也可以实现字体资源素材
        // game.load.bitmapFont('desyrel', './desyrel.png', './desyrel.xml');
        // 游戏一般都有帮助说明和游戏开始两个按钮,我们在欢迎界面加上
        game.load.image('help', './help.png');
        game.load.image('start', './start.png');
    }

    this.create = function() {
        // 如果觉得默认字体太难看,也可以实现字体资源素材
        // this.title = game.add.bitmapText(0, 0, 'desyrel', 'boom dots', 64);
        this.title = game.add.text(0, 0, 'Boom Dots');
        // 创建的文本对象默认黑底黑字,所以需要修改样式
        this.title.fill = 'white';
        this.title.x = (game.width - this.title.width) / 2;
        this.title.y = this.title.height * 2;

        // help按钮
        this.help = game.add.button(0, 0, 'help', this.help);
        // this.help.x = (game.width - this.help.width) / 2;
        // this.help.y = this.help.height * 5;

        // start按钮
        this.start = game.add.button(0, 0, 'start', this.start);
        // this.start.x = (game.width - this.start.width) / 2;
        // this.start.y = this.start.height * 6;
    }

    this.help = function() {
        // alert('help');
        this.textHelp = game.add.text(0, 0, '点击小球射向大球');
        this.textHelp.fill = 'orange';
        this.textHelp.x = (game.width - this.textHelp.width) / 2;
        this.textHelp.y = game.height / 3;
        this.textHelp.scale.setTo(0);

        // 缓动动画从无到有, 再从有到无.
        this.tween = game.add.tween(this.textHelp.scale).to({x:1, y:1}, 2000, Phaser.Easing.Elastic.Out, true);
        game.time.events.add(Phaser.Timer.SECOND * 2, function() {
            this.tween = game.add.tween(this.textHelp.scale).to({x:0, y:0}, 2000, Phaser.Easing.Elastic.Out, true);
        }, this);
    }

    this.start = function() {
        game.state.start('game');
    }
}