// MovementSystem — engine system (reusable in any game).
//
// Reads:  position, velocity
// Writes: position (x, y)
//
// The "!" after getComponent is a "non-null assertion".
// We use it here because we just queried for entities that HAVE these components,
// so we know they won't be undefined. TypeScript can't figure that out on its own.

import { World } from '../World';

export function MovementSystem(world: World): void {
  const entities = world.query('position', 'velocity');

  for (const id of entities) {
    const pos = world.getComponent(id, 'position')!;
    const vel = world.getComponent(id, 'velocity')!;

    pos.x += vel.dx;
    pos.y += vel.dy;
  }
}
