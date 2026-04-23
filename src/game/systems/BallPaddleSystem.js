// BallPaddleSystem — game-specific system.
//
// Reads:  ball position + velocity, paddle position + size
// Writes: ball velocity (dy)
// Job:    check if the ball is heading toward the bottom of the canvas.
//         If it overlaps the paddle → bounce it back up.
//         If it misses the paddle  → return true (signal a life is lost).
//
// Returns: true if the ball was missed (Game.ts will handle the life loss)
//          false if nothing critical happened
export function BallPaddleSystem(world, canvas) {
    const [ballId] = world.query('position', 'velocity', 'ball');
    const [paddleId] = world.query('position', 'size', 'input');
    if (!ballId || !paddleId)
        return false;
    const ballPos = world.getComponent(ballId, 'position');
    const ballVel = world.getComponent(ballId, 'velocity');
    const ballComp = world.getComponent(ballId, 'ball');
    const paddlePos = world.getComponent(paddleId, 'position');
    const paddleSize = world.getComponent(paddleId, 'size');
    if (ballPos.y + ballVel.dy > canvas.height - ballComp.radius) {
        if (ballPos.x > paddlePos.x && ballPos.x < paddlePos.x + paddleSize.width) {
            ballVel.dy = -ballVel.dy;
        }
        else {
            return true;
        }
    }
    return false;
}
