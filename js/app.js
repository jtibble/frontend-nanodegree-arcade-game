// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    
    // Start all enemies off-screen to the left
    this.x = -100 * (Math.random()*3 + 1);
    
    // Pick a new row
    this.pickNewRow = function(){
        var row = Math.floor(Math.random()*3);
        this.y = row*83 + 50;
    }
    
    this.boundingX = 100;
    this.boundingY = 70;
    this.boundingXOffset = 0;
    this.boundingYOffset = 80;
    
    this.pickNewRow();
    
    // Pick a random speed from 50 to 100
    this.dx = Math.random()*50 + 50;
    this.dy = 0;
    
    // Track the lifetime of each enemy for animating
    this.lifeTime = 0.0;
    this.periodMultiplier = Math.random()*2 + 2;
    
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.lifeTime += dt;
    
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
    var y = this.y + Math.abs(Math.sin(this.lifeTime * this.periodMultiplier))*5;
    ctx.drawImage(Resources.get(this.sprite), this.x, y);
}

//Player class
var Player = function(){
    this.sprite = 'images/char-boy.png';
    
    this.reset = function(){
        this.x = 200;
        this.y = 380;
        this.boundingX = 70;
        this.boundingY = 70;
        this.boundingXOffset = 15;
        this.boundingYOffset = 80;

        this.lifeTime = 0.0;

        this.dx = 100;
        this.dy = 80;
    };
    
    // Start the player at their starting location
    this.reset();
    
    // Render the player, adding a slight bounce to increase visual appeal
    this.render = function(){
        var y = this.y + Math.abs(Math.sin(this.lifeTime*4))*5;
        ctx.drawImage(Resources.get(this.sprite), this.x, y);
    };
    
    // Extend the life of the player to animate properly
    this.update = function(dt){
        this.lifeTime += dt;
    };
    
    // Move the player based on input
    // Fence the player into the canvas by setting limits on x and y
    this.handleInput = function(keyCode){
        switch(keyCode){
            case 'left':
                if( this.x - this.dx >= 0 ){
                    this.x -= this.dx;
                }
                break;
            case 'down':
                if( this.y + this.dy < 460 ){
                    this.y += this.dy;
                }
                break;
            case 'right':
                if( this.x + this.dx < 500 ){
                    this.x += this.dx;
                }
                break;
            case 'up':
                if( this.y - this.dy >= -20 ){
                    this.y -= this.dy;
                }
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

for( var i=0; i<7; i++){
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
