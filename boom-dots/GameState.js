var GameState = function(game) {
    var enemy;
    var player
    var oBfire = false;
    var oBplayer = false;
    var oBenemy = false;
    var textScore;
    var speed = 6;
    var score = 0;
    var topScore = 0;
    this.create = function() {
        // 开启物理引擎
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // 文本
        textScore = game.add.text(0, 0, 'Score:' + score + '-Best:' + topScore, {fill:'#fff', fontSize:16});

        // 游戏场景的创建
        // 创建两个球
        var width = 50;
        var height = 50;
        enemy = game.add.bitmapData(width, height);
        enemy.circle(25, 25, 25, 'gray');
        enemy = game.add.sprite(game.world.centerX - width / 2, height / 2, enemy);
        // 开启物理属性
        game.physics.arcade.enable(enemy);
        enemy.update = function() {
            this.x += speed;
            if (this.x + this.width >= game.width) {
                speed = -speed;
            }

            if (this.x <= 0) {
                speed = -speed;
            }

            if (oBenemy) {
                this.y = game.rnd.between(height / 2, height * 4);
                oBenemy = false;
            }
        };

        player = game.add.bitmapData(width, height);
        player.circle(25, 25, 25 / 1.5, 'gray');
        player = game.add.sprite(game.world.centerX - width / 2, game.height - height * 2, player);
        // 开启物理属性
        game.physics.arcade.enable(player);
        // 添加鼠标按下事件
        player.inputEnabled = true;
        player.events.onInputDown.add(function() {
            oBfire = true;
            console.log('点击');
        }, this);
        player.update = function() {
            // 点击小球, 将其发射出去
            if (oBfire) {
                this.y -= 10;
                // 给我方小球添加判断
                if (this.y + this.height <= 0) {
                    localStorage.setItem("topScore", Math.max(score.topScore));
                    game.state.start('game');
                    oBfire = false;
                    score = 0;
                }
            }

            if (oBplayer) {
                this.y = game.height - height * 2;
                oBplayer = false;
            }
        };
    }
    this.update = function() {
        // 游戏逻辑实现

        // 两球的碰撞检测
        game.physics.arcade.collide(player, enemy, function() {
            oBfire = false;
            oBplayer = true;
            oBenemy = true;
            score++;
            textScore.setText('Score:' + score + '-Best:' + topScore);
            speed = game.rnd.between(3, 7);
        }, null, this);
    }
}