var game = new Phaser.Game(240, 400, Phaser.CANVAS, 'game');

var upKey;

var score = 0;

game.myStates = {};

// 进度条场景, 一般是对游戏进行一些设置
game.myStates.boot = {
    preload: function() {
        game.load.image('loading', 'assets/preloader.gif');

        // 在pc端就不处理
        if (!game.device.desktop) {
            // 适配不同分辨率的手机(EXACT_FIT:填充整个屏幕会被拉伸, SHOW_ALL:长宽比不变, 第三种:自定义)
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        }
    },
    create: function() {
        game.state.start('load');
    }
};

// 加载场景, 一般是用来加载资源
game.myStates.load = {
    preload: function() {
        // 进度条(加载资源的策略)
        // var preloadSprite = game.add.sprite(10, game.height / 2, 'loading');
        // // 设置聚酯用
        var preloadSprite = game.add.sprite(game.width / 2 - 220 / 2, game.height / 2 - 19 / 2, 'loading');
        game.load.setPreloadSprite(preloadSprite);
        // 这里加载了三种类型的资源, 分别是:音频, 图片, 序列帧
        game.load.image('background', 'assets/bg.jpg');
        game.load.image('copyright', 'assets/copyright.png');
        game.load.spritesheet('myplane', 'assets/myplane.png', 40, 40, 4);
        game.load.spritesheet('startbutton', 'assets/startbutton.png', 100, 40, 2);
        game.load.spritesheet('replaybutton', 'assets/replaybutton.png', 80, 30, 2);
        game.load.spritesheet('sharebutton', 'assets/sharebutton.png', 80, 30, 2);
        game.load.image('mybullet', 'assets/mybullet.png');
        game.load.image('bullet', 'assets/bullet.png');
        game.load.image('enemy1', 'assets/enemy1.png');
        game.load.image('enemy2', 'assets/enemy2.png');
        game.load.image('enemy3', 'assets/enemy3.png');
        game.load.spritesheet('explode1', 'assets/explode1.png', 20, 20, 3);
        game.load.spritesheet('explode2', 'assets/explode2.png', 30, 30, 3);
        game.load.spritesheet('explode3', 'assets/explode3.png', 50, 50, 3);
        game.load.spritesheet('myexplode', 'assets/myexplode.png', 40, 40, 3);
        game.load.image('award', 'assets/award.png');
        game.load.audio('normalback', 'assets/normalback.mp3');
        game.load.audio('playback', 'assets/playback.mp3');
        game.load.audio('fashe', 'assets/fashe.mp3');
        game.load.audio('crash1', 'assets/crash1.mp3');
        game.load.audio('crash2', 'assets/crash2.mp3');
        game.load.audio('crash3', 'assets/crash3.mp3');
        game.load.audio('ao', 'assets/ao.mp3');
        game.load.audio('pi', 'assets/pi.mp3');
        game.load.audio('deng', 'assets/deng.mp3');
        // // 可以自定义进度条
        // game.load.onFileComplete.add(function(process) {
        //     console.log(process);
        // });
    },
    create: function() {
        // game.state.start('start');
        game.state.start('play');
    }
}

// 开始场景, 游戏开始界面
game.myStates.start = {
    create: function() {
        // 显示背景, 也可以使用image, game.add.image
        game.add.sprite(0, 0, 'background');
        // 显示底部版权信息, (240 - 216) /2
        game.add.image(12, game.height - 16, 'copyright');

        /**
         * 会动的飞机
         */
        var myplane = game.add.sprite(100, 100, 'myplane');
        // 添加逐帧动画, 名字随便取
        myplane.animations.add('fly');
        // 参数1:名字, 参数2:频率, 参数3:是否循环
        myplane.animations.play('fly', 10, true);

        /**
         * 开始按钮
         * 参数4:回调函数
         * 参数5:上下文
         * 参数6:鼠标滑过的帧
         * 参数7:鼠标离开
         * 参数8:鼠标按下
         * 参数9:鼠标上弹
         */
        game.add.button(70, 200, 'startbutton', this.onStartClick, this, 1, 1, 0, 1);
    },
    onStartClick: function() {
        // console.log('click');
        // 跳到游戏场景
        game.state.start('play');
    }
}

// 游戏场景, 游戏主界面
game.myStates.play = {
    create: function() {
        // 开启ARCADE物理引擎
        game.physics.startSystem(Phaser.Physics.ARCADE);

        /**
         * 瓦片精灵, 实现滚动的背景
         */
        var bg = game.add.tileSprite(0, 0, game.width, game.height, 'background');
        // 滚动效果, 参数1:水平方向滚动, 参数2:垂直方向滚动
        bg.autoScroll(0, 20);

        /**
         * 会动的飞机
         */
        this.myplane = game.add.sprite(100, 100, 'myplane');
        // 添加逐帧动画, 名字随便取
        this.myplane.animations.add('fly');
        // 参数1:名字, 参数2:频率, 参数3:是否循环
        this.myplane.animations.play('fly', 10, true);
        // 飞机开启物理引擎, 开启之后才有body属性
        game.physics.arcade.enable(this.myplane);
        // 不能拖到游戏外面(游戏边界碰撞)
        this.myplane.body.collideWorldBounds = true;

        // 飞机飞到底部的渐变动画, 从上往下. 参数1:要渐变的属性, 参数2:持续时长, 参数3:效果, 参数4:自动开始
        var tween = game.add.tween(this.myplane).to({ y: game.height - 40 }, 1000, Phaser.Easing.Quintic.InOut, true);
        // 到达底部回调
        tween.onComplete.add(this.onStart, this);

        // /**
        //  * todo 加一个敌机
        //  */
        // this.enemy = game.add.sprite(100, 10, 'enemy1');
        // // 物理属性打开
        // game.physics.arcade.enable(this.enemy);
    },
    update: function() {
        if (this.myplane.myStartFire) {
            // 我机发射子弹
            this.myPlaneFire();
            // 敌机产生
            this.generateEnemy();
            // 敌机发射子弹
            this.enemyFire();
            // 我方子弹和敌机碰撞检测
            // collide用这个函数会将物理往上弹
            game.physics.arcade.overlap(this.myBullets, this.enemys, this.hitEnemy, null, this);

            // 敌方子弹与我方飞机碰撞
            game.physics.arcade.overlap(this.enemyBullets, this.myplane, this.hitPlane, null, this);
        }

        // // 打印子弹数
        // console.log(this.myBullets ? this.myBullets.length : 0);
    },
    hitPlane: function(myplan, bullet) {
        myplan.kill();
        bullet.kill();

        // 爆炸效果(可以考虑使用对象池)
        var explode = game.add.sprite(myplan.x, myplan.y, 'myexplode');
        var anim = explode.animations.add('explode');
        anim.play(30, false, false);

        // 把explode destory掉
        anim.onComplete.addOnce(function() {
            explode.destroy();
            // 调到结束界面
            game.state.start('over');
        });
    },
    hitEnemy: function(bullet, enemy) {
        enemy.life -= 1;
        if (enemy.life <= 0) {
            enemy.kill();

            // 爆炸效果(可以考虑使用对象池)
            var explode = game.add.sprite(enemy.x, enemy.y, 'explode' + enemy.index);
            explode.anchor.setTo(0.5, 0.5);
            var anim = explode.animations.add('explode');
            anim.play(30, false, false);

            // 把explode destory掉
            anim.onComplete.addOnce(function() {
                explode.destroy();
            });
        }
        bullet.kill();
    },
    collisionHandler: function(bullet, enemy) {
        // console.log(arguments);
        // console.log('collisionHandler');
        enemy.kill();
        bullet.kill();
    },
    onStart: function() {
        /**
         * 我方飞机可拖拽
         */
        // 启动输入系统
        this.myplane.inputEnabled = true;
        // 允许拖拽, 参数1默认为false, 为true表示拖拽的时候鼠标位于精灵中心
        this.myplane.input.enableDrag();
        // 标记可以发射子弹, 为true再发射子弹
        this.myplane.myStartFire = true;
        // 最后一次发射子弹的时间(让子弹有间隔)
        this.myplane.lastBulletTime = 0;

        /**
         * 我方飞机的子弹组
         */
        // 创建一个子弹的组
        this.myBullets = game.add.group();
        // // 开启物理引擎
        // this.myBullets.enableBody = true;
        // // // 测试添加很多子弹
        // // this.myBullets.createMultiple(50000, 'mybullet');
        // // 创建一个子弹的对象池
        // this.myBullets.createMultiple(5, 'mybullet');
        // // 检测边界碰撞
        // this.myBullets.setAll('checkWorldBounds', true);
        // // 飞出边界kill掉变为non-existing child.
        // this.myBullets.setAll('outOfBoundsKill', true);

        // 显示分数
        var style = { font: "16px Arial", fill: "#ff0000" };
        var text = game.add.text(0, 0, "Score: 0", style);

        /**
         * 敌方飞机组
         */
        this.enemys = game.add.group();
        this.enemys.lastEnemyTime = 0;

        /**
         * 敌方子弹组
         */
        this.enemyBullets = game.add.group();
    },
    myPlaneFire: function() {
        // 或者 game.time.now
        var now = new Date().getTime();
        // this.myplane.alive 还存活, 避免我方飞机没了还发射子弹
        if (this.myplane.alive && (now - this.myplane.lastBulletTime) > 200) {
            // // 相当于new了一个bullet
            // var myBullet = game.add.sprite(this.myplane.x + 15, this.myplane.y - 7, 'mybullet');
            // // game.physics.arcade.enable(sprite);写法一样
            // game.physics.enable(myBullet, Phaser.Physics.ARCADE);
            // // 开启物理引擎后就有body属性
            // myBullet.body.velocity.y = -200;
            // this.myplane.lastBulletTime = now;

            // // 将子弹加到组里面去
            // this.myBullets.add(myBullet);

            // /**
            //  * 对象池的写法
            //  */
            // // 参数1:false表示拿不在游戏界面的子弹(If true, find the first existing child; otherwise find the first non-existing child.)
            // var myBullet = this.myBullets.getFirstExists(false, false, this.myplane.x + 15, this.myplane.y - 7);
            // if (myBullet) {
            //     game.physics.enable(myBullet, Phaser.Physics.ARCADE);
            //     // // 设置子弹位置(可以将这一步骤放到getFirstExists函数)
            //     // myBullet.reset(this.myplane.x + 15, this.myplane.y - 7);
            //     // 开启物理引擎后就有body属性
            //     myBullet.body.velocity.y = -200;
            //     this.myplane.lastBulletTime = now;
            // } else {
            //     console.log('不存在子弹了');
            // }

            /**
             * 对象池的写法, 不估算对象池需要多少子弹(时间间隔随便改都不需要预先设置对象池的大小)
             */
            // 从group中获取一个对象(参数2为true表示没有则创建)
            var myBullet = this.myBullets.getFirstExists(false, false, this.myplane.x + 15, this.myplane.y - 7);
            // 如果获取到子弹
            if (myBullet) {
                // // 设置子弹位置(可以将这一步骤放到getFirstExists函数)
                // myBullet.reset(this.myplane.x + 15, this.myplane.y - 7);
            } else {
                // 如果获取不到子弹则创建一个
                myBullet = game.add.sprite(this.myplane.x + 15, this.myplane.y - 7, 'mybullet');
                // 检测边界碰撞(让子弹可以回收)
                myBullet.checkWorldBounds = true;
                // 飞出边界kill掉变为non-existing child.(让子弹可以回收)
                myBullet.outOfBoundsKill = true;

                // 把子弹加入到子弹组里面
                this.myBullets.addChild(myBullet);

                // 开启物理引擎(这句话要是放上面, 子弹和敌机碰撞不会kill)
                game.physics.enable(myBullet, Phaser.Physics.ARCADE);
            }
            myBullet.body.velocity.y = -200;
            this.myplane.lastBulletTime = now;
        }
    },
    generateEnemy: function() {
        var now = game.time.now;
        if (now - this.enemys.lastEnemyTime > 1000) {
            // 取一个随机数
            var enemyIndex = game.rnd.integerInRange(1, 3);
            var key = 'enemy' + enemyIndex;
            // 获得图片尺寸
            var width = game.cache.getImage(key).width;
            var x = game.rnd.integerInRange(width / 2, game.width - width / 2);
            var y = 0;
            console.log(key, width, x, y);
            // 参数2为true表示没有则创建
            var enemy = this.enemys.getFirstExists(false, true, x, y, key);
            // 设置自定义属性
            enemy.lastFireTime = 0; // 子弹最后发射的时间
            enemy.width = width; // 飞机的宽度
            enemy.index = enemyIndex; // 爆炸的图片根据这个来

            // 让子弹的速度不一样
            if (enemyIndex == 1) {
                enemy.bulletV = 40;
                enemy.bulletTime = 4000;
                enemy.life = 2;
            } else if (enemyIndex == 2) {
                enemy.bulletV = 80;
                enemy.bulletTime = 2000;
                enemy.life = 3;
            } else {
                enemy.bulletV = 120;
                enemy.bulletTime = 1000;
                enemy.life = 5;
            }

            // 锚点(设置按钮的中心点)
            enemy.anchor.setTo(0.5, 0.5);
            // 检测边界碰撞(让敌机可以回收)
            enemy.checkWorldBounds = true;
            // 飞出边界kill掉变为non-existing child.(让敌机可以回收)
            enemy.outOfBoundsKill = true;
            // 开启物理引擎
            game.physics.arcade.enable(enemy);
            // 飞机往下飞
            enemy.body.velocity.y = 20;
            // 因为飞机的大小不一样, body还是用之前的所有有问题
            enemy.body.setSize(width, width);

            this.enemys.lastEnemyTime = now;
        }
    },
    enemyFire: function() {
        var now = game.time.now;
        this.enemys.forEachAlive(function(enemy) {
            if (now - enemy.lastFireTime > enemy.bulletTime) {
                // 敌机发射子弹
                var bullet = this.enemyBullets.getFirstExists(false, true, enemy.x, enemy.y + enemy.width / 2, 'bullet');
                bullet.anchor.setTo(0.5, 0.5);
                bullet.outOfBoundsKill = true;
                bullet.checkWorldBounds = true;
                game.physics.arcade.enable(bullet);
                bullet.body.velocity.y = enemy.bulletV;

                // 飞机最后发射子弹的时间
                enemy.lastFireTime = now;
            }
        }, this);
        console.log('敌机子弹:' + this.enemyBullets.length);
    },
    render: function() {
        // // render基本拿来调试用
        // if (this.enemys) {
        //     this.enemys.forEachAlive(function(enemy) {
        //         game.debug.body(enemy);
        //     });
        // }
    }
}

// 游戏结束场景
game.myStates.over = {
    create: function() {
        // 显示背景, 也可以使用image, game.add.image
        game.add.sprite(0, 0, 'background');
        // 显示底部版权信息, (240 - 216) /2
        game.add.image(12, game.height - 16, 'copyright');

        /**
         * 会动的飞机
         */
        var myplane = game.add.sprite(100, 100, 'myplane');
        // 添加逐帧动画, 名字随便取
        myplane.animations.add('fly');
        // 参数1:名字, 参数2:频率, 参数3:是否循环
        myplane.animations.play('fly', 10, true);

        /**
         * 居中文本
         */
        var style = { font: "bold 32px Arial", fill: "#ff0000", boundsAlignH: "center", boundsAlignV: "middle" };
        text = game.add.text(0, 0, "Score:" + score, style);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        // x:0 y:100 width:800 height:100
        text.setTextBounds(0, 0, game.width, game.height);

        /**
         * 分享和重来按钮
         */
        game.add.button(30, 300, 'replaybutton', this.onRePlayClick, this, 0, 0, 1);
        game.add.button(130, 300, 'sharebutton', this.onShareClick, this, 0, 0, 1);
    },
    onRePlayClick: function() {
        game.state.start('play');
    },
    onShareClick: function() {

    }
};

// 将场景添加到游戏里面
game.state.add('boot', game.myStates.boot);
game.state.add('load', game.myStates.load);
game.state.add('start', game.myStates.start);
game.state.add('play', game.myStates.play);
game.state.add('over', game.myStates.over);
game.state.start('boot');