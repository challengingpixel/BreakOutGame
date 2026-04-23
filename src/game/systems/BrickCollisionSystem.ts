// BrickCollisionSystem — game-specific system.
//
// Reads:  ball position + velocity, all brick positions + sizes + brick component
// Writes: ball velocity (dy), brick status, brick render.visible, scoreBoard.score
// Job:    check if the ball overlaps any living brick.
//         If yes → bounce ball, destroy brick, add point.
//
// Returns: true if all bricks are gone (player wins)
//          false otherwise

import { World }      from '../../engine/World';
import { ScoreBoard } from '../ScoreBoard';

export function BrickCollisionSystem(world: World, scoreBoard: ScoreBoard): boolean {
  const [ballId] = world.query('position', 'velocity', 'ball');
  const brickIds = world.query('position', 'size', 'brick');

  if (!ballId) return false;

  const ballPos = world.getComponent(ballId, 'position')!;
  const ballVel = world.getComponent(ballId, 'velocity')!;

  for (const id of brickIds) {
    const brick = world.getComponent(id, 'brick')!;

    if (brick.status === 0) continue;

    const pos  = world.getComponent(id, 'position')!;
    const size = world.getComponent(id, 'size')!;

    const hit =
      ballPos.x > pos.x &&
      ballPos.x < pos.x + size.width &&
      ballPos.y > pos.y &&
      ballPos.y < pos.y + size.height;

    if (hit) {
      ballVel.dy = -ballVel.dy;
      brick.status = 0;
      world.getComponent(id, 'render')!.visible = false;
      scoreBoard.addPoint();

      if (scoreBoard.score === brickIds.length) {
        return true;
      }
    }
  }

  return false;
}
