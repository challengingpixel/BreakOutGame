// setup.ts — game-specific.
//
// This is the only place where Breakout game configuration lives.
// Want more bricks? Change BRICK_ROWS / BRICK_COLS here.
// Want a faster ball? Change the velocity in setupEntities().
//
// TypeScript note: constants use  const NAME: number = value  to declare
// their type explicitly, though TypeScript can often infer it automatically.
import { createPosition } from '../engine/components/position';
import { createVelocity } from '../engine/components/velocity';
import { createBallComponent } from './components/ball';
import { createBrickComponent } from './components/brick';
import { createInput } from './components/input';
const BRICK_ROWS = 3;
const BRICK_COLS = 5;
const BRICK_WIDTH = 75;
const BRICK_HEIGHT = 20;
const BRICK_PADDING = 10;
const BRICK_OFFSET_TOP = 30;
const BRICK_OFFSET_LEFT = 30;
export function setupEntities(world, canvas) {
    // --- Ball ---
    const ball = world.createEntity('ball');
    world.addComponent(ball, 'position', createPosition(canvas.width / 2, canvas.height - 30));
    world.addComponent(ball, 'velocity', createVelocity(2, -2));
    world.addComponent(ball, 'ball', createBallComponent(10));
    world.addComponent(ball, 'render', { shape: 'circle', color: '#0095DD', radius: 10, visible: true });
    // --- Paddle ---
    const paddleWidth = 75;
    const paddleHeight = 10;
    const paddle = world.createEntity('paddle');
    world.addComponent(paddle, 'position', createPosition((canvas.width - paddleWidth) / 2, canvas.height - paddleHeight));
    world.addComponent(paddle, 'size', { width: paddleWidth, height: paddleHeight });
    world.addComponent(paddle, 'input', createInput());
    world.addComponent(paddle, 'render', { shape: 'rect', color: '#0095DD', width: paddleWidth, height: paddleHeight, visible: true });
    // --- Bricks ---
    for (let c = 0; c < BRICK_COLS; c++) {
        for (let r = 0; r < BRICK_ROWS; r++) {
            const id = `brick_${c}_${r}`;
            const brickX = c * (BRICK_WIDTH + BRICK_PADDING) + BRICK_OFFSET_LEFT;
            const brickY = r * (BRICK_HEIGHT + BRICK_PADDING) + BRICK_OFFSET_TOP;
            world.createEntity(id);
            world.addComponent(id, 'position', createPosition(brickX, brickY));
            world.addComponent(id, 'size', { width: BRICK_WIDTH, height: BRICK_HEIGHT });
            world.addComponent(id, 'brick', createBrickComponent());
            world.addComponent(id, 'render', { shape: 'rect', color: '#0095DD', width: BRICK_WIDTH, height: BRICK_HEIGHT, visible: true });
        }
    }
}
export function resetBall(world, canvas) {
    const pos = world.getComponent('ball', 'position');
    const vel = world.getComponent('ball', 'velocity');
    pos.x = canvas.width / 2;
    pos.y = canvas.height - 30;
    vel.dx = 2;
    vel.dy = -2;
}
export function resetPaddle(world, canvas) {
    const pos = world.getComponent('paddle', 'position');
    const size = world.getComponent('paddle', 'size');
    pos.x = (canvas.width - size.width) / 2;
}
