// ScoreBoard — game-specific.
// Not an ECS entity. Kept as a simple class because it only holds
// two numbers and draws them. Not worth splitting into components + systems.
//
// TypeScript note: class properties need their types declared at the top.
//   score: number  means score can only ever hold a number.
//   private means only code inside this class can access it.
export class ScoreBoard {
    constructor(canvas) {
        this.score = 0;
        this.lives = 3;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }
    addPoint() {
        this.score++;
    }
    loseLife() {
        this.lives--;
    }
    draw() {
        this.ctx.font = '16px Arial';
        this.ctx.fillStyle = '#0095DD';
        this.ctx.fillText(`Score: ${this.score}`, 8, 20);
        this.ctx.fillText(`Lives: ${this.lives}`, this.canvas.width - 65, 20);
    }
}
