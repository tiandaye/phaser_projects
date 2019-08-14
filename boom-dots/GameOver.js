var GameOver = function(game) {
    this.preload = function() {
        // 如果觉得默认字体太难看,也可以实现字体资源素材
        // game.load.bitmapFont('desyrel', './desyrel.png', './desyrel.xml');
        // game.load.image('restart', './restart.png');
    }

    this.create = function() {
        var topScore = localStorage.getItem('topScore') == null ? 0 : localStorage.getItem('topScore');
        var score = localStorage.getItem('score') == null ? 0 : localStorage.getItem('score');


        // 如果觉得默认字体太难看,也可以实现字体资源素材
        // this.title = game.add.bitmapText(0, 0, 'desyrel', 'boom dots', 64);
        // 创建的文本对象默认黑底黑字,所以需要修改样式
        // this.title.x = (game.width - this.title.width) / 2;
        // this.title.y = this.title.height / 2;

        // this.topScore = game.add.bitmapText(0, 0, 'desyrel', topScore, 64);
        // this.topScore.x = (game.width - this.title.width) / 2;
        // this.topScore.y = this.title.height / 3;

        // this.score = game.add.bitmapText(0, 0, 'desyrel', 'score:' + score, 64);
        // this.score.x = (game.width - this.title.width) / 2;
        // this.score.y = this.title.height / 2;

        this.reStartBtn = game.add.button(0, 0, 'restart', this.reStart);
        this.reStartBtn.x = (game.width - this.title.width) / 2;
        this.score.y = this.title.height / 3 * 2.3;
    }

    this.reStart = function() {
        game.state.start('game');
    }
}