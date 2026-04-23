// WallBounceSystem — game-specific system.
//
// Reads:  position, velocity, ball (for radius)
// Writes: velocity (dx, dy)
// Job:    flip the ball's direction when it hits the left, right, or top wall.
//
// The BOTTOM wall is NOT handled here — that's BallPaddleSystem's job.
export function WallBounceSystem(world, canvas) {
    const entities = world.query('position', 'velocity', 'ball');
    for (const id of entities) {
        const pos = world.getComponent(id, 'position');
        const vel = world.getComponent(id, 'velocity');
        const ball = world.getComponent(id, 'ball');
        // Left or right wall — flip horizontal direction
        if (pos.x + vel.dx > canvas.width - ball.radius || pos.x + vel.dx < ball.radius) {
            vel.dx = -vel.dx;
        }
        // Top wall — flip vertical direction
        if (pos.y + vel.dy < ball.radius) {
            vel.dy = -vel.dy;
        }
    }
}
