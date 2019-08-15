var LoadState = function(game) {
    var progressText;
    this.init = function() {
        var spriteLoad = game.add.image(game.world.centerX, game.world.centerY, 'loading');
        spriteLoad.anchor = {x:0.5, y:0.5};
        progressText = game.add.text(game.world.centerX, game.world.centerY + 30, '0%', {fill:'#fff', fontSize:'16px'});
        progressText.anchor = {x:0.5, y:0.5};
    };

    this.preload = function() {
        // game.load.image('background', 'assets/background.png');
        // game.load.spritesheet('options', 'assets/options.png', 105, 43, 3);
        
        // 三大场景：主界面、游戏界面、结束界面
        // 事件:    当资源加载完成时
        // 行为:    显示进度百分比
        // 注解:    progress即加载进度
        game.load.onFileComplete.add(function(progress) {
            progressText.text = progress + '%';
        });
    };

    this.create = function() {
        if (progressText.text == '100%') {
            game.state.start('menu');
        }
    }
}