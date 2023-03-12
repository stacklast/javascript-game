window.addEventListener('load', function() {
    // canvas setup
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;

    class InputHandler {

        constructor(game) {
            this.game = game;
            window.addEventListener('keydown', e => {
                if ((   (e.key === 'ArrowUp') ||
                        (e.key === 'ArrowDown')
                ) && this.game.keys.indexOf(e.key) === -1){
                    this.game.keys.push(e.key);
                } else if ( e.key === ' '){
                    this.game.player.shootTop();
                } else if ( e.key === 'd'){
                    this.game.debug = !this.game.debug;
                }
            });
            window.addEventListener('keyup', e =>{
                if (this.game.keys.indexOf(e.key) > -1){
                    this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
                }
            });
        }
        
    }

    class Projectile {

        constructor(game, x, y){
            this.game = game;
            this.x = x;
            this.y = y;
            this.width = 36.25;
            this.height = 20;
            this.speed = Math.random() * 0.2 + 2.8;
            this.markedForDeletion = false;
            this.image = document.getElementById('fireball');
            this.frameX = 0;
            this.maxFrame = 3;
            this.fps = 10;
            this.timer = 0;
            this.interval = 1000/this.fps;
        }

        update(){
            this.x += this.speed;
            if (this.x > this.game.width * 0.8) this.markedForDeletion = true;
        }

        draw(context){
            context.fillStyle = 'yellow';
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    class Player {

        constructor(game) {
            this.game = game;
            this.width = 120;
            this.height = 190;
            this.x = 20;
            this.y = 100;
            this.speedY = 0;
            this.maxSpeed = 3;
            this.projectiles = [];
        }

        update() {
            if (this.game.keys.includes('ArrowUp')) this.speedY = -this.maxSpeed;
            else if (this.game.keys.includes('ArrowDown')) this.speedY = this.maxSpeed;
            else this.speedY = 0;
            this.y += this.speedY;
            // handle projectiles
            this.projectiles.forEach(projectile => {
                projectile.update();
            });
            this.projectiles = this.projectiles.filter(projectile => !projectile.markedForDeletion);
        }

        draw(context) { 
            context.fillStyle = 'black'; 
            context.fillRect(this.x, this.y, this.width, this.height);
            this.projectiles.forEach(projectile => {
                projectile.draw(context);
            });
        }

        shootTop(){
            if (this.game.ammo > 0){
                this.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 30));
                this.game.ammo--;
            }
        }
    }
    
    class Enemy {

    }

    class Layer {

    }

    class Background {

    }

    class UI {

    }

    class Game {

        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.keys = [];
            this.ammo = 20;
        }

        update() {
            this.player.update();
        }

        draw(context) {
            this.player.draw(context);
        }
    }

    const game = new Game(canvas.width, canvas.height);

    //animation loop
    function animate() {
        ctx.clearRect(0, 0 , canvas.width, canvas.height);
        game.update();
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate();
});