/* global Phaser */

import { Scene } from "phaser";

export class Start extends Scene {

    constructor() {
        super('Start');
    }

    preload() {
        this.load.setPath('assets');
        this.load.image('background', 'bg.png');
    }

    create() {
        this.add.image(512, 384, 'background');
        this.add.text(512, 490, 'Flappy Bird\nPress key to start', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);
    }
  
    update() {
      /**
       * Proceed to the next state once the user has clicked on the screen.
       */
      if (this.input.activePointer.isDown) {
        this.scene.start('Game');
      }
    }
  }