// PaddleInputSystem — game-specific system.
//
// Reads:  position, size (width), input (rightPressed, leftPressed)
// Writes: position (x)
// Job:    move the paddle left or right based on which keys are held.
//         Clamps position so the paddle never goes off the canvas edge.

import { World } from '../../engine/World';

export function PaddleInputSystem(world: World, canvas: HTMLCanvasElement): void {
  const entities = world.query('position', 'size', 'input');

  for (const id of entities) {
    const pos   = world.getComponent(id, 'position')!;
    const size  = world.getComponent(id, 'size')!;
    const input = world.getComponent(id, 'input')!;

    if (input.rightPressed) {
      pos.x = Math.min(pos.x + 7, canvas.width - size.width);
    } else if (input.leftPressed) {
      pos.x = Math.max(pos.x - 7, 0);
    }
  }
}
