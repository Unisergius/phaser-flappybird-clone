import { Scene } from 'phaser';

export class Game extends Scene
{

    constructor ()
    {
        super('Game');
    }

    preload ()
    {
        this.load.setPath('assets');
        this.load.image('background', 'bg.png');
        this.load.image('player', 'bird.png');
        this.load.image('pipe', 'pipe.png');
        this.load.audio('jump', 'jump.wav');
        this.pressKey = null;

    }

    create ()
    {
        this.add.image(512, 389, 'background');
        this.platforms = this.physics.add.staticGroup();
        this.pipes = this.add.group();
        this.timer = this.time.addEvent(
            { 
                delay: 1500, 
                callback: this.addRowOfPipes, 
                callbackScope: this, 
                loop: true 
            });
            
        this.score = 0;
        this.labelScore = this.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });

        this.physics.world.setBounds(0,0,1024,768);
        this.player = this.physics.add.sprite(500, 370, 'player');

        this.player.body.gravity.y = 1000;

    }

    update ()
    {
        // replace active pointer with spacebar
        if (this.input.keyboard.addKey('SPACE').isDown)
        {
            this.player.body.velocity.y = -350;
            if(this.pressKey === false) {
                this.sound.play('jump');
                this.pressKey = true;
            }
        } else {
            this.pressKey = false;
        }
        if (this.player.y < 0 || this.player.y > 768)
        {
            this.restartGame();
        }

        this.physics.world.on('collide', this.hitPipe);
        this.physics.collide(this.player, this.pipes, this.hitPipe, null, this);
    }

    restartGame ()
    {
        this.scene.start('Game');
    }

    addOnePipe (x, y)
    {
        var pipe = this.add.sprite(x, y, 'pipe');
        this.pipes.add(pipe);
        this.physics.world.enable(pipe);
        pipe.body.velocity.x = -200;
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    }

    addRowOfPipes ()
    {
        var hole = Math.floor(Math.random() * 5) + 1;
        for (var i = 0; i < 14; i++)
        {
            if (i != hole && i != hole + 1 && i != hole - 1)
            {
                this.addOnePipe(1024, i * 60 + 20);
            }
        }
        this.score += 1;
        this.labelScore.text = this.score;
    }

    hitPipe ()
    {
        this.restartGame();
    }

    render ()
    {
        this.game.debug.body(this.player);
    }


}
