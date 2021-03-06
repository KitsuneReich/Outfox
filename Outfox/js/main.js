var game = new Phaser.Game(640, 480, Phaser.AUTO, 'phaser-window');
var player;
var enemygroup;
var enemy, enemy2;
var BFF;
var adjacency;
var colors = [0x1BE7FF, 0x6EEB83, 0xE4FF1A, 0xE8AA14, 0xE8AA14];
//Turn on/off debug info
var debug = false;
var menuText;
var firstMusic;
var logoSound;
var startScene = 0;
var panelTime = 4;
var scene;
var scenes = [{key:"BFF00"},{key:"BFF01"},{key:"BFF01"},{key:"BFF02"},{key:"BFF03"},{key:"BFF05"},{key:"BFF06"},{key:"BFF07"},{key:"BFF08"},{key:"BFF09"},{key:"BFF09"},{key:"BFF12"},{key:"BFF11"}];
var talkText;
var logImg;
//Array for credits: Who to display as recruited
var freeFox = [false,false,false];
var namePC = '';
var gameLog;
var displayText;




var Preloader = function(game){};
Preloader.prototype = {
        preload: function(){
            console.log('Preloader: preload');
            //ASSET LOADS
            game.load.path = 'assets/img/';
            //Load the tilemap data (key, url, data, format)
            this.load.tilemap('level', 'outfox.json', null, Phaser.Tilemap.TILED_JSON);
            //Load tilemap spritesheet (key, url, frameWidth, frameHeight)
            this.load.image('tilesheet','outfox.png',64,64);
            this.load.spritesheet('player', 's_fox_sheet04.png', 64, 64);
            this.load.spritesheet('BFF', 's_fox_sheet.png',64,64);
            this.load.spritesheet('enemy', 's_fox_sheet01.png',64,64);
            this.load.spritesheet('enemy2', 's_fox_sheet03.png',64,64);
            this.load.image('s_interfaceR_edge', 's_interfaceR_edge.png');
            this.load.image('cursor', 's_active.png');
            //Load Sprite Atlas
            this.load.atlas('atlas','emoji.png','emoji.json');
            this.load.atlas('UI','ui.png','ui.json');
            
            this.load.image('CCGlogo', 'CCGLogo.png');
            this.load.image('OFlogo', 's_Outfox_logo.png');
            this.load.image('BFF00', 's_BFF00.png');
            this.load.image('BFF01', 's_BFF01.png');
            this.load.image('BFF02', 's_BFF02.png');
            this.load.image('BFF03', 's_BFF03.png');
            this.load.image('BFF04', 's_BFF04.png');
            this.load.image('BFF05', 's_BFF05.png');
            this.load.image('BFF06', 's_BFF06.png');
            this.load.image('BFF07', 's_BFF07.png');
            this.load.image('BFF08', 's_BFF08.png');
            this.load.image('BFF09', 's_BFF09.png');
            this.load.image('BFF10', 's_BFF10.png');
            this.load.image('BFF11', 's_BFF11.png');
            this.load.image('BFF12', 's_BFF12.png');
            this.load.image('BFF12', 'Mockup.png');
            this.load.image('logImg', 's_BFFlog.png');
            this.load.image('Congrats', 's_congrats.png');
            this.load.image('fox00', 's_congrats00.png');
            this.load.image('fox01', 's_congrats01.png');
            this.load.image('fox02', 's_congrats02.png');
            this.load.image('fox03', 's_congrats03.png');
            this.load.image('fox04', 's_congrats04.png');
            this.load.image('barGreen', 's_freed.png');
            this.load.image('barRed', 's_stayed.png');


            
            //MUSIC
            game.load.path = 'assets/audio/';
            // songs and sounds obtained from freesound.org
            // fox sounds from Courtney Hunts fox videos
            game.load.audio('bgMusic',['BGMusic.mp3']);
            game.load.audio('logoSound',['logoSound.mp3']);
            game.load.audio('charSound',['gekkering01.mp3']);
            game.load.audio('sarSound',['fox_alert.mp3']);
            game.load.audio('boostSound',['vixensScream.mp3']);
            game.load.audio('birdGuitar',['birdguitar.mp3']);
            game.load.audio('uhOh',['uhoh.mp3']);
            game.load.audio('cage',['cage.mp3']);
            game.load.audio('piano',['pianoloop.mp3']);
            game.load.audio('BFF',['BFF.mp3']);
            game.load.audio('slam',['cageslam.mp3']);
            game.load.audio('chains',['chains.mp3']);
            game.load.audio('chew',['chewing.mp3']);
            game.load.audio('drink',['drinking.mp3']);
            game.load.audio('earshake',['earshake.mp3']);
            game.load.audio('growlNo',['growlNo.mp3']);
            game.load.audio('hmph',['hmph.mp3']);
            game.load.audio('sleeping',['sleeping.mp3']);
            game.load.audio('sniff',['sniffing.mp3']);
            game.load.audio('yawn',['yawn.mp3']);
            game.load.audio('gekker',['gekkering02.mp3']);
            game.load.audio('up',['UpSound.mp3']);
            game.load.audio('down',['DownSound.mp3']);
            game.load.audio('select',['select.mp3']);

        },
        create: function(){
                console.log('Preloader: create');
        },
        update: function(){
                console.log('Preloader: Update');
                this.state.start('logoScreen');
        },
}

var logoScreen = function(game) {};
logoScreen.prototype = {
        preload: function(){
            console.log('logoScreen: preload');
            
        },create: function() {
            console.log('logoScreen: create');
            var CCGLogo = game.add.sprite(0,0, 'CCGlogo');
            setBgColorById('main-page','#880700');
           


            CCGLogo.anchor.setTo(0, 0);
            CCGLogo.alpha = 0;

            game.add.tween(CCGLogo).to( { alpha: 1 }, 1500, Phaser.Easing.Linear.None, true);
            this.logoUp = game.add.audio('logoSound');
            game.time.events.add(1500, logoSound, this);
            game.time.events.add(3000, fadeOut, this);

            function logoSound() {
                this.logoUp.play('', 0, 0.3, false);
            }
            
            function fadeOut() {
                game.add.tween(CCGLogo).to( { alpha: 0 }, 1500, Phaser.Easing.Linear.None, true);
            }

            game.time.events.add(5250, changeState, this, 'MainMenu');
            
        },
        update: function(){
            if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) ){
                this.state.start('MainMenu');
            }

        },
}

function changeState(stateID) {
    game.state.start(stateID);
}

var MainMenu = function(game) {};
MainMenu.prototype = {
        preload: function(){
            console.log('MainMenu: preload');
            
        },
        create: function() {
            console.log('MainMenu: create');
            game.stage.backgroundColor = "#000000";
            var OFLogo = game.add.sprite(0,0, 'OFlogo');
            setBgColorById('main-page','#250001');

            OFLogo.anchor.setTo(0, 0);
            OFLogo.alpha = 0;

            game.add.tween(OFLogo).to( { alpha: 1 }, 1500, Phaser.Easing.Linear.None, true);

            function logoSound() {
                this.logoUp.play('', 0, 0.1, false);
            }
            
            // State change instructions and intro text -----------------------------------------------
            menuText = game.add.text(95, 320, 'Press space to start your adventure', { font: 'Fira Sans', fontSize: '28px', fill: '#270201' });
            menuText = game.add.text(80, 370, 'Press enter to see the Foxes Responsible', { font: 'Fira Sans', fontSize: '26px', fill: '#270201', wordWrapWidth: '640', wordWrap: 'false' });
            
        },
        update: function(){
                //console.log('MainMenu: Update');
            if(this.cache.isSoundDecoded('bgMusic') && game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) ){
                this.state.start('Prologue');
            }
            if(game.input.keyboard.justPressed(Phaser.Keyboard.ENTER) ){
                this.state.start('Credits');
            }
        },
}

var namePC = function(game) {};
namePC.prototype = {
        namePC: function(){
            console.log('logoScreen: namePC');
    
        },
}

// define Prologue state and methods
var Prologue = function(game) {};
Prologue.prototype = {
    init: function() {
        this.level = 1;
    },
    preload: function() {
        console.log('Prologue: preload');
        setBgColorById('main-page','#facade');
        setBgImageById('main-page','url("assets/img/prologueBG.png")');

        // Preload Assets -----------------------------------------------------

        // load a path to save us typing
        this.load.path = 'assets/img/'; 
        // load image assets
        this.load.images(['prolBorder', 'panel00', 'panel01', 'panel02', 'panel03', 'panel04', 'panel05', 'panel06', 'panel07'],
            ['prologueborder.png', 'prologueUpL.png', 'prologueUpMid.png', 'prologueUpR.png', 'prologueLowL.png', 'prologueLowMidTop.png', 'prologueLowMidL.png', 'prologueLowMidR.png', 'prologueLowR.png']);
    },
    create: function() {
        // create background image
        var proBG = game.add.sprite(0, 0, 'prolBorder');
        proBG.alpha = 0;

        // ease in background image
        game.add.tween(proBG).to( { alpha: 1 }, 1500, Phaser.Easing.Linear.None, true);
        console.log('Prologue: create');
        game.stage.backgroundColor = "#ffffff";
        console.log('level: ' + this.level);

        // Prologue narrative timed sounds
        this.logoUp = game.add.audio('birdGuitar');
        game.time.events.add(1500, playSound, this);
        function playSound() {this.logoUp.play('', 0, 1, false);}

        this.sleepUp = game.add.audio('sleeping');
        game.time.events.add(1300, sleepSound, this);
        function sleepSound() {this.sleepUp.play('', 0, 0.4, false);}

        this.yawnUp = game.add.audio('yawn');
        game.time.events.add(3750, yawnSound, this);
        function yawnSound() {this.yawnUp.play('', 0, 0.3, false);}

        this.drinkUp = game.add.audio('drink');
        game.time.events.add(7500, drinkSound, this);
        function drinkSound() {this.drinkUp.play('', 0, 1, false);}

        this.sniffUp = game.add.audio('sniff');
        game.time.events.add(10500, sniffSound, this);
        function sniffSound() {this.sniffUp.play('', 0, 0.5, false);}

        this.chewUp = game.add.audio('chew');
        game.time.events.add(15750, chewSound, this);
        function chewSound() {this.chewUp.play('', 0, 0.25, false);}

        this.chainsUp = game.add.audio('chains');
        game.time.events.add(20000, chainsSound, this);
        function chainsSound() {this.chainsUp.play('', 0, 0.5, false);}

        this.slamUp = game.add.audio('slam');
        game.time.events.add(20500, slamSound, this);
        function slamSound() {this.slamUp.play('', 0, 0.35, false);}

        this.cageDown = game.add.audio('uhOh');
        game.time.events.add(21500, cageSound, this);
        function cageSound() {this.cageDown.play('', 0, 0.5, false);}

        // Prologue comic panel fade in timing
        var panel00 = game.add.sprite(10, 10, 'panel00');
        var panel01 = game.add.sprite(101, 10, 'panel01');
        var panel02 = game.add.sprite(414, 10, 'panel02');
        var panel03 = game.add.sprite(10, 219, 'panel03');
        var panel04 = game.add.sprite(230, 219, 'panel04');
        var panel05 = game.add.sprite(102, 334, 'panel05');
        var panel06 = game.add.sprite(321, 334, 'panel06');
        var panel07 = game.add.sprite(414, 219, 'panel07');

        var panels = [panel00,panel01,panel02,panel03,panel04,panel05,panel06,panel07];

        var i = 0;
        panels.forEach(function(panel) {
            panel.alpha = 0;
            game.time.events.add(1000 + (i * 3000), fadePanel, this, panel);
            i++;

        });
        
        function fadePanel(panel) {
            game.add.tween(panel).to( { alpha: 1 }, 1500, Phaser.Easing.Linear.None, true);
        }

    },
    update: function() {
        // skip prologue
        if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            // pass this.level to next state
            game.state.start('BFFmeet');
        }
    }
}

var BFFmeet = function(game) {};
BFFmeet.prototype = {
        preload: function(){
            console.log('BFFmeet: preload');
            
        },
        create: function() {
            console.log('BFFmeet: create');
            // html css background call to change color
            setBgColorById('main-page','#000000');
            setBgImageById('main-page','');
            game.sound.stopAll();

            game.stage.backgroundColor = "#000000";
            
            //RESET FREEFOX
            freeFox = [false,false,false];
            //RESET ESCAPE ROUTE TEXT
            displayText = true;

            // establish a dialog component - Yi Yin's dialogue code
            var dialog=new Dialog(
            {x:108, y:315, width:435}, // the geo of the dialog box
            { font: 'Fira Sans', fontSize: '16px', fill: '#eed6c3', wordWrap: 'true', boundsAlignH: "left", boundsAlignV: "top" } // the style of the text
            );

            var controller=new DialogController(dialog);
            var perSec=20;
            controller.setList(
            [
                {        
                  text: "As your consciousness stirs, you repeatedly blink and paw gently at your eyes. Despite your best efforts, your sight struggles to adjust in the pitch black darkness.\n\n\n[ SPACE ]", // the text you want to play
                  lettersPerSec: perSec, // letters per second
                },
                {        
                    text: "Turning your head, your eyes squint taking in a faint, glowing, red light. \"Is that the sun beginning to rise?\nI must have wandered deeper within my den.\"\n\n\n[ SPACE ]", // the text you want to play
                    lettersPerSec: perSec, // letters per second
                },
                {        
                    text: "Attempting to disregard the atrophy you feel in your muscles, you stand. \n\* wham\! \*\nRising so suddenly, your ears had little time to warn you of the low ceiling you just made contact with.\n[ SPACE ]", // the text you want to play
                    lettersPerSec: perSec, // letters per second
                },
                {        
                    text: "Panicking from this unexpected sensation, you lunge forward, all four paws scurrying for your den entrance.\nTo your continued surprise, your body is met with more cold and unforgiving objects blocking your escape.\n\n[ SPACE ]", // the text you want to play
                    lettersPerSec: perSec, // letters per second
                },
                {        
                    text: "Shaking your head in an attempt to remain conscious from the impact, your eyes come into focus. The red light illuminates your \"den.\"\nFear welling up inside, you wimper, \"oh, no\! I\'m in a hunter\'s cage\!\"\n[ SPACE ]", // the text you want to play
                    lettersPerSec: perSec, // letters per second
                },
                {        
                    text: "Your pupils retract, deciphering another red light and accompanying hunter\'\s cage.\n\"Perhaps I'm not alone in this cold, strange place.\"\n\n\n[ SPACE ]", // the text you want to play
                    lettersPerSec: perSec, // letters per second
                },
                {        
                    text: "Pushing your snout as far as you can between the cage\'s bars, you gekker imploringly.\n\"Bright day! Is there another fox about?\"\nYour call echoes.\n\n[ SPACE ]", // the text you want to play
                    lettersPerSec: perSec, // letters per second
                },
                {        
                    text: "Perking up your ears and closing your eyes, you hold your breath, hopefully anticipating a reply...\nHowever, no sound is heard.\n\"Whatever shall I do now?\" you lament.\n\n[ SPACE ]", // the text you want to play
                    lettersPerSec: perSec, // letters per second
                },
                {        
                    text: "But wait! Was that a yawn you just heard?\n\"It can\'t possibly be morning catch yet. Who is making all that noise?\" gekkered a voice from the adjacent cage.\n\n\n[ SPACE ]", // the text you want to play
                    lettersPerSec: perSec, // letters per second

                },
                {        
                    text: "\"That would be me, Zerda, the beige fox,\" you respond.\n\n\"Beige fox? Rare to see such a fur mutation. Tod, the red fox here. Welcome to the Lab!\"\n\n[ SPACE ]", // the text you want to play
                    lettersPerSec: perSec, // letters per second
                },
                {        
                    text: "You inquire with a quiver in your voice, \"The Lab? Don't they perform horrible experiments on our kind here?\"\n\n\"I\'ll level with you kit,\" Tod barked soberly, \"they do. If you\'re smart, you\'ll stick with me. I\'ve got an escape plan.\"\n[ SPACE ]", // the text you want to play
                    lettersPerSec: perSec, // letters per second
                },
                {        
                    text: "Every day for a few hours, the humans allow us out into an observation area. One day, I discovered the perfect spot to dig. If you could help me convince the other foxes to join our efforts, perhaps we can make our way through!\nDon't rush your decision, sleep on it.\"\n[ SPACE ]", // the text you want to play
                    lettersPerSec: perSec, // letters per second
                },
                {        
                    text: "As you settle in to save up your strength for the next day, you contemplate Tod's offer.\n\"Can I, of all foxes, convince others to join me?\"\nThe red cage lights seem to dim as you drift off...\n\n[ PRESS ENTER TO START ]", // the text you want to play
                    lettersPerSec: perSec, // letters per second
                },


            ],
            function(){console.log("all text in the list has been played!")}
            );
        controller.playNext();

        _setupKeys(controller);

        // private functions
        function _setupKeys(controller){
            enterKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            enterKey.onUp.add(function(){
            console.log("Space pressed!");
            this.playNext();
        }, controller);
    }

        // sad piano music loop
        this.logoUp = game.add.audio('piano');
        game.time.events.add(1500, logoSound, this);
        function logoSound() {this.logoUp.play('', 0, 0.5, true);}
        
        },

        update: function(){
            // ENTER to skip BFFMeet narrative altogether
            if(this.cache.isSoundDecoded('bgMusic') && game.input.keyboard.justPressed(Phaser.Keyboard.ENTER) ){
                this.state.start('test');
            }
        },
}
// function to switch between background images for narrative scene
function switchScene(num) {
    console.log('Scene switch start. startScene: ' + startScene);
    // if on certain scenes, play sounds, change music, or set html css background color
    if (num == 1){
        this.hmphDown = game.add.audio('hmph');
        function hmphSound() {this.hmphDown.play('', 0, 0.1, false);}
        game.time.events.add(3750, hmphSound, this);
    }
    this.cageDown = game.add.audio('cage');
    if (num == 3){this.cageDown.play('', 0, 0.5, false);}
    if (num == 4){
        setBgColorById('main-page','#242323');
        this.shakeDown = game.add.audio('earshake');
        function shakeSound() {this.shakeDown.play('', 0, 0.3, false);}
        game.time.events.add(500, shakeSound, this);
        this.gekkerDown = game.add.audio('gekker');
        function gekkerSound() {this.gekkerDown.play('', 0, 0.7, false);}
        game.time.events.add(8750, gekkerSound, this);
    }
    if (num == 5){
        this.growlDown = game.add.audio('growlNo');
        function growlSound() {this.growlDown.play('', 0, 0.3, false);}
        game.time.events.add(4250, growlSound, this);
    }
    if (num == 6){
        this.growlDown = game.add.audio('boostSound');
        function growlSound() {this.growlDown.play('', 0, 0.3, false);}
        game.time.events.add(4500, growlSound, this);
    }
    if (num == 7){
        this.growlDown = game.add.audio('gekker');
        function growlSound() {this.growlDown.play('', 0, 0.7, false);}
        game.time.events.add(7000, growlSound, this);
    }
    if (num == 8) {
        setBgColorById('main-page','#615f5f');
        this.yawnUp = game.add.audio('yawn');
        game.time.events.add(0, yawnSound, this);
        function yawnSound() {this.yawnUp.play('', 0, 0.1, false);}
        this.growlDown = game.add.audio('charSound');
        function growlSound() {this.growlDown.play('', 0, 0.7, false);}
        game.time.events.add(3000, growlSound, this);
    }
    if (num == 9) {
        this.yawnUp = game.add.audio('boostSound');
        game.time.events.add(500, yawnSound, this);
        function yawnSound() {this.yawnUp.play('', 0, 0.3, false);}
        this.growlDown = game.add.audio('charSound');
        function growlSound() {this.growlDown.play('', 0, 0.7, false);}
        game.time.events.add(3250, growlSound, this);
    }
    if (num == 10) {
        this.yawnUp = game.add.audio('gekker');
        game.time.events.add(2500, yawnSound, this);
        function yawnSound() {this.yawnUp.play('', 0, 0.7, false);}
        this.growlDown = game.add.audio('growlNo');
        function growlSound() {this.growlDown.play('', 0, 0.35, false);}
        game.time.events.add(5500, growlSound, this);
    }
    if (num == 11) {
        this.yawnUp = game.add.audio('charSound');
        game.time.events.add(1500, yawnSound, this);
        function yawnSound() {this.yawnUp.play('', 0, 0.7, false);}
    }
    scene = game.add.sprite(0,0,scenes[num].key);
    scene.alpha = 0;
    game.add.tween(scene).to( { alpha: 1 }, 1500, Phaser.Easing.Linear.None, true);
    if (num == 12){
    } else {
        var talkText = game.add.text(320, 440, 'Press [ENTER] to skip narrative', { font: 'Fira Sans', fontSize: '16px', fill: '#eed6c3', wordWrapWidth: '440', wordWrap: 'true' });
    }
    startScene++;

}

var testState = function(game) {};
testState.prototype = {
	preload: function() {

        // TESTING OVERLAY GRAPHIC
        // load a path to save us typing
        this.load.path = 'assets/img/'; 
        // load image assets
        this.load.images(['tempLayout', 'grid'], ['tempLayout.png', 'tempGrid.png']);
        this.load.image('playField', 'playField.png', 0, 0);
    },

    create: function() {
        game.sound.stopAll();
        //Start physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = "#333333";
        setBgColorById('main-page','#250001');
        
        //MUSIC
        playMusic();

        // show temp layout image underneath game
        //game.add.sprite(0, 0, 'tempLayout');

        // show temp grid under the game
        //game.add.sprite(0, 0, 'grid');
        
        //TILEMAP SETUP
        //create new tilemap object
        /*map = this.game.add.tilemap('level');
        //add image to the map to be used as a tileset (tileset, key)
        //the tileset name is specified w/in the .json file and Tiled
        //Can have multiple tilesets in any one map
        map.addTilesetImage('landscape','tilesheet');
        map.setCollision(2);
        mapLayer = map.createLayer('Ground Level');*/
        //set the world size to match the size of the Tilemap Layer
        //mapLayer.resizeWorld();

        //GAMELOG SETUP
        var logStyle = {
        font: 'Fira Sans',
        fontSize: '12px',
        wordWrapWidth: '235',
        wordWrap: 'true',
        fill: '#edd6c2',
        }
        
        gameLog = game.add.text(203, 369, 'The foxes have been released into the observation area.', logStyle);
        gameLog.lineSpacing = '-6';
        add2Log('Instructions: [UP] or [DOWN] to hover over an Action button (paw print icon). [SPACE] to select. Further instructions will follow.', 3);


        game.add.sprite(0, 0, 'playField');
   
        //PLAYER SETUP
        //this.spawnPlayer();
        console.log('yo about to construct player');
        player = new Player(game, 'player'); 
        game.add.existing(player);
       	
        //ENEMY SETUP
        //gonna take enemy out of the group, now that the game ends when one is done
        enemygroup = game.add.group();
        //this.addEnemy(enemygroup);
        //    enemy = new Enemy(game, 'enemy', tintColor);
        //    game.add.existing(enemy);
        //    group.add(enemy);
        
        var tintColor = colors[game.rnd.between(0, colors.length-1)]; //for variety, which is the spiciest of meatballs
        //Enemy(game, x, y, key, name, char, sar, ego, type)
        enemy = new Enemy(game,(64 * 5), (64* 4), 'enemy', "Reynard", 4, 5, 4, "Sarcastic");
        game.add.existing(enemy);
        enemygroup.add(enemy);

        enemy2 = new Enemy(game,(64 * 2), (64* 2), 'enemy2', "Choco Fox", 6, 2, 1, "Charismatic");
        game.add.existing(enemy2);
        enemygroup.add(enemy2);
        
        //BFF SETUP
        console.log('yo about to construct BFF');
        BFF = new Bff(game, 'BFF');
        game.add.existing(BFF);

        console.log('yo about to construct move');
        movebutt = new moveButton(game, 'move');
        this.game.add.existing(movebutt);

		console.log('yo about to construct bark');
        barkbutt = new barkButton(game, 'bark');
        this.game.add.existing(barkbutt);

        console.log('yo about to construct face');
        facebutt = new faceButton(game, 'face');
        this.game.add.existing(facebutt);

        console.log('yo about to construct end');
        endbutt = new endButton(game, 'end');
        this.game.add.existing(endbutt);

        //UI SETUP
        game.add.sprite(0, 359, 'UI','s_stats');
        game.add.sprite(443, 359, 'UI','s_stats');
        game.add.sprite(0,350, 'UI', 's_title');
        game.add.sprite(353,350, 'UI', 's_title');
        playerUI = game.add.sprite(85,322,'UI','s_name');
        enemyUI = game.add.sprite(555, 322, 'UI','s_name');
        enemyUI.scale.x *= -1;
        enemyUI.visible = false;
        game.add.sprite(198, 349, 'UI','s_log');
        playerIcon = game.add.sprite(0, 290, 'UI','s_nar_NPC04');
        enemyIcon = game.add.sprite(645, 290, 'UI','s_Fox_NPC01')
        enemyIcon.scale.x *= -1;
        enemyIcon.visible = false;
        playerTarget = game.add.sprite(0, 450,'UI','s_activeFox');
        enemyTarget = game.add.sprite(550,450, 'UI', 's_noTarget');
        

        leftName = game.add.text(187, 335, 'PC Name', { font: 'Fira Sans', fontSize: '15px', fill: '#fff', fontWeight: '700' })
        
        
        rightName = game.add.text(380, 335, 'NPC Name', { font: 'Fira Sans', fontSize: '15px', fill: '#fff', fontWeight: '700' })
        rightName.visible = false;

        playerStats = game.add.text(105, 350, 'Convince other foxes to join your escape effort.\nUse the arrow keys to move.\nWhen adjacent to a fox:\nPress C to bark Charismatically!\nPress S to bark Sarcastically!\nWhen out of energy, join your Best Friend and hit B to replenish it!', {font: 'Fira Sans', fontSize: '13px', fill: '#fff', fontWeight: '700' });
        
        enemyStats = game.add.text(447, 350, 'Kon Kon!', { font: 'Fira Sans', fontSize: '13px', fill: '#fff', fontWeight: '700' })

        // TESTING OVERLAY GRAPHIC
        game.add.sprite(0, 0, 'prolBorder');



        function playMusic() {
            console.log('Playing music');
            this.firstMusic = game.add.audio('bgMusic');
            this.firstMusic.play('', 0, 0.1, true);    // ('marker', start position, volume (0-1), loop)
        }

    },

    //addEnemy: function(group){
    	//throwing out new enemies into the mix yo
    	
    //	enemy = new Enemy(game, 'enemy', tintColor);
    //	game.add.existing(enemy);
    //	group.add(enemy);
    //},	 

	update: function() {
		if(enemygroup.length == 0){
            if (freeFox[0] == true) {
                game.time.events.add(Phaser.Timer.SECOND * 3, function() {
                        firstMusic.stop();
                        game.state.start('Congrats')
                        });
            }else {
                game.time.events.add(Phaser.Timer.SECOND * 3, function() {
                        firstMusic.stop();
                        game.state.start('GameOver')
                        });
            }
		}
		//Checks if these two are adjacent, can be run on any two objects. Probably still way too centered on the player.
        //took it out of main, was causing issues lol nvm;
        isAdjacent(game, enemygroup, player);

        if(player.x == 512 && player.y == 256){
            if(displayText == true) {

                pressed = true;
                add2Log("Do you wish to dig through the hole and escape the laboratory? Press [SPACEBAR] to stay, [ENTER] to pass through.", 3);

                displayText = false;
            }
            if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
                player.x -= size;
                player.cursor.x = player.x;
                player.cursor.y = player.y;
                displayText = true;
                pressed = false;
            }
            if( game.input.keyboard.justPressed(Phaser.Keyboard.ENTER)) {
                if (freeFox[0] == true) {
                    game.time.events.add(Phaser.Timer.SECOND * 3, function() {
                                         firstMusic.stop();
                                         game.state.start('Congrats')
                                         });
                }else {
                    game.time.events.add(Phaser.Timer.SECOND * 3, function() {
                                         firstMusic.stop();
                                         game.state.start('GameOver')
                                         });
                }
            }
            
        }
        //isAdjacent(enemy, player);
        //isAdjacent(enemy2, player);
        //updates variables to what is in out settings, this is a really shitty place to update the health variable, lol one sec
        //never put things in here that govern a resource, as it will always put it to max, throw that into the constructor for said resource
        //ie, player.health = settings.playerhealth
        // player.CHAR = settings.playerCHAR;
        // enemy.CHAR = settings.enemyCHAR;
    },

    
    
    render: function () {
        if(debug == true) {
            game.debug.bodyInfo(enemy, 16, 16);
            game.debug.bodyInfo(player, 16, game.world.height - 50);
            game.debug.body(player);
            game.debug.body(enemy);
        }
    }
}



// define Congrats state and methods
var Congrats = function(game) {};
Congrats.prototype = {
    preload: function() {
        console.log('Congrats: preload');

    },
    create: function() {
        console.log('Congrats: create');
        game.stage.backgroundColor = "#270201";

        // create background image
        game.add.sprite(0, 0, 'Congrats');

        game.add.sprite(320, 135, 'barRed');
        game.add.sprite(320, 235, 'barRed');
        game.add.sprite(320, 335, 'barRed');

        var bar01 = game.add.sprite(320, 135, 'barGreen');
        var bar02 = game.add.sprite(320, 235, 'barGreen');
        var bar03 = game.add.sprite(320, 335, 'barGreen');

        var name01 = game.add.text(330, 144, BFF.NAME, { font: 'Fira Sans', fontSize: '18px', fill: '#eed6c3', fontWeight: '700' })
        var name02 = game.add.text(330, 244, enemy.NAME, { font: 'Fira Sans', fontSize: '18px', fill: '#eed6c3', fontWeight: '700' })
        var name03 = game.add.text(330, 344, enemy2.NAME, { font: 'Fira Sans', fontSize: '18px', fill: '#eed6c3', fontWeight: '700' })
        
        var names = [name01,name02,name03];

        game.add.sprite(415, 50, 'fox00');
        var fox01 = game.add.sprite(415, 50, 'fox01');
        game.add.sprite(415, 150, 'fox00');
        var fox02 = game.add.sprite(415, 150, 'fox02');
        game.add.sprite(415, 250, 'fox00');
        var fox03 = game.add.sprite(415, 250, 'fox03');
        
        var foxes = [fox01,fox02,fox03];
        var bars = [bar01,bar02,bar03];

        var i = 0;
        foxes.forEach(function(fox) {
            if(freeFox[i] == true){
                fox.alpha = 1;
                bars[i].alpha = 1;
            }else {
                fox.alpha = 0;
                bars[i].alpha = 0;
                names[i].text = '???';
            }
            i++;
        });



    },
    update: function() {
        // GameOver logic
        if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            lineCount = 0;
            lineTotal = 0;
            linePush = 0;
            logLines = 0;
            firstLog = false;
            game.state.start('MainMenu');
        }
    }
}

// define GameOver state and methods
var GameOver = function(game) {};
GameOver.prototype = {
    init: function(lvl) {
        this.level = lvl+1;
    },
    preload: function() {
        console.log('MainMenu: preload');

        // Preload Assets -----------------------------------------------------

        // load a path to save us typing
        this.load.path = 'assets/img/'; 
        // load image assets
        this.load.images(['gameOver'], ['s_gameOver.png']);
    },
    create: function() {
        console.log('MainMenu: create');
        game.stage.backgroundColor = "#250001";
        console.log('level: ' + this.level);

        // create background image
        game.add.sprite(0, 0, 'gameOver');

    },
    update: function() {
        // GameOver logic
        if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            //player.kill();
            //enemy.kill()
            //BFF.kill();
            game.state.start('MainMenu');
        }
    },
}

// change css background color
// code help from http://www.javascripter.net/
function setBgColorById(id,sColor) {
 var elem;
 if (document.getElementById) {
  if (elem=document.getElementById(id)) {
   if (elem.style) {
    elem.style.backgroundColor=sColor;
    return 1;  // success
   }
  }
 }
 return 0;  // failure
}

// change css background image
function setBgImageById(id,sImage) {
 var elem;
 if (document.getElementById) {
  if (elem=document.getElementById(id)) {
   if (elem.style) {
    elem.style.backgroundImage=sImage;
    return 1;  // success
   }
  }
 }
 return 0;  // failure
}

game.state.add('test', testState);
game.state.add('logoScreen', logoScreen);
game.state.add('namePC', namePC);
game.state.add('MainMenu', MainMenu);
game.state.add('Prologue', Prologue);
game.state.add('BFFmeet', BFFmeet);
game.state.add('Congrats', Congrats);
game.state.add('GameOver', GameOver);
game.state.add('Preloader', Preloader);
game.state.add('Credits', credits);
game.state.start('Preloader');
