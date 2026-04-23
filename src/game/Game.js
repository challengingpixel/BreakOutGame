// Game.ts — game-specific.
//
// The conductor. It:
//   1. Creates the World and all entities (via setup.ts)
//   2. Runs all systems in the correct order every frame
//   3. Handles input events and updates the input component
//   4. Handles win/lose outcomes
//
// TypeScript note: method parameters and return types are declared with ": type".
//   start(): void   means start returns nothing.
//   keyDownHandler(e: KeyboardEvent): void   means it takes a KeyboardEvent.
import { World } from '../engine/World';
import { MovementSystem } from '../engine/systems/MovementSystem';
import { RenderSystem } from '../engine/systems/RenderSystem';
import { PaddleInputSystem } from './systems/PaddleInputSystem';
import { WallBounceSystem } from './systems/WallBounceSystem';
import { BallPaddleSystem } from './systems/BallPaddleSystem';
import { BrickCollisionSystem } from './systems/BrickCollisionSystem';
import { ScoreBoard } from './ScoreBoard';
import { setupEntities, resetBall, resetPaddle } from './setup';
export class Game {
    constructor() {
        this.canvas = document.getElementById('myCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.world = new World();
        this.scoreBoard = new ScoreBoard(this.canvas);
        setupEntities(this.world, this.canvas);
        // Bind so 'this' is correct when used as event listeners
        this.loop = this.loop.bind(this);
        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.keyUpHandler = this.keyUpHandler.bind(this);
        this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    }
    loop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // ── Systems run in order ──────────────────────────────────────────────
        PaddleInputSystem(this.world, this.canvas);
        WallBounceSystem(this.world, this.canvas);
        const missed = BallPaddleSystem(this.world, this.canvas);
        if (missed) {
            this.scoreBoard.loseLife();
            if (!this.scoreBoard.lives) {
                alert('GAME OVER');
                document.location.reload();
                return;
            }
            resetBall(this.world, this.canvas);
            resetPaddle(this.world, this.canvas);
        }
        const won = BrickCollisionSystem(this.world, this.scoreBoard);
        if (won) {
            alert('YOU WIN, CONGRATULATIONS!');
            document.location.reload();
            return;
        }
        MovementSystem(this.world);
        RenderSystem(this.world, this.ctx);
        this.scoreBoard.draw();
        requestAnimationFrame(this.loop);
    }
    start() {
        document.addEventListener('keydown', this.keyDownHandler);
        document.addEventListener('keyup', this.keyUpHandler);
        document.addEventListener('mousemove', this.mouseMoveHandler);
        this.loop();
    }
    keyDownHandler(e) {
        const input = this.world.getComponent('paddle', 'input');
        if (e.key === 'Right' || e.key === 'ArrowRight')
            input.rightPressed = true;
        else if (e.key === 'Left' || e.key === 'ArrowLeft')
            input.leftPressed = true;
    }
    keyUpHandler(e) {
        const input = this.world.getComponent('paddle', 'input');
        if (e.key === 'Right' || e.key === 'ArrowRight')
            input.rightPressed = false;
        else if (e.key === 'Left' || e.key === 'ArrowLeft')
            input.leftPressed = false;
    }
    mouseMoveHandler(e) {
        const relativeX = e.clientX - this.canvas.offsetLeft;
        const paddlePos = this.world.getComponent('paddle', 'position');
        const paddleSize = this.world.getComponent('paddle', 'size');
        if (relativeX > 0 && relativeX < this.canvas.width) {
            paddlePos.x = relativeX - paddleSize.width / 2;
        }
    }
}
