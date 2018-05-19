//Player Fox's Comrade
// prefab constructor function
var size = 64;
var adj = false;
var CHAR;
var SAR;
var CTMP;
var RPCT;

function BFF(game, key, tintColor) {
        // call to Phaser.Sprite // new Sprite(game, x, y, key, frame)
        Phaser.Sprite.call(this, game, size * 3, size * 4, key);
        // add custom properties
        cursors = game.input.keyboard.createCursorKeys();

        // put some physics on it
        game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;
        this.health = 10;
        this.CHAR = 5;
        this.CTMP = 0
        this.RPCT = 0;
        this.tint = 0xE8AA14;
}
// explicitly define prefab's prototype (Phaser.Sprite) and constructor (Player)
BFF.prototype = Object.create(Phaser.Sprite.prototype);
BFF.prototype.constructor = BFF;

// override Phaser.Sprite update (Enemy update function)
BFF.prototype.update = function() {
    
    //If the BFF and player are overlapped
        if( this.y == player.y && this.x == player.x){
            if(player.y == size * 4) {
                if (player.x == size * 4) {
                    this.x -= size;
                } else {
                    this.x += size;
                }
            } else {
                this.y += size;
            }
        }
    if(player.x == (this.x + size) || player.x == (this.x - size) ){
        if (player.y == this.y) {
            this.adj = true;
        }else
            this.adj = false;
    }else if (player.y == (this.y + size) || player.y == (this.y - size) ){
        if (player.x == this.x) {
            this.adj = true;
        }else {
            this.adj = false;
        }
    }else {
        this.adj = false;
    }

    if(this.adj == true && player.EXH <=7) {
        if (bKey.justPressed() ) {
            player.EXH += 3;
            //play audio
            var bark = game.add.audio('boostSound');
            bark.play('',0,1,false)
        }
	}
    
}