// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    
    // Start all enemies off-screen to the left
    this.x = -100;
    
    // Pick a new row
    this.pickNewRow = function(){
        var row = Math.floor(Math.random()*3);
        this.y = row*83 + 50;
    }
    
    this.pickNewRow();
    
    // Pick a random speed from 50 to 100
    this.dx = Math.random()*50 + 50;
    this.dy = 0;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    
    // Wrap movement around to the other side of the screen
    if( this.x > ctx.canvas.width + 100 ){
        this.x = -100;
        this.pickNewRow();
        return;
    }
    
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.dx * dt;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.sprite = 'images/char-boy.png';
    
    this.x = 200;
    this.y = 220;
    
    this.dx = 100;
    this.dy = 80;
    
    this.render = function(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
    
    this.update = function(dt){
        
    };
    
    this.handleInput = function(keyCode){
        switch(keyCode){
            case 'left':
                this.x -= this.dx;
                break;
            case 'down':
                this.y += this.dy;
                break;
            case 'right':
                this.x += this.dx;
                break;
            case 'up':
                this.y -= this.dy;
                break;
            default:
                console.log('bad key code');
        }
    };
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

for( var i=0; i<5; i++){
    allEnemies.push( new Enemy() );
}

var player = new Player();




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
