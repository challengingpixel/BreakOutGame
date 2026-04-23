// RenderSystem — engine system (reusable in any game).
//
// Reads:  position, render
// Job:    draw every visible entity on the canvas each frame.
//
// Notice the  if (render.shape === 'circle')  check below.
// Inside that block, TypeScript automatically "narrows" the type:
//   it knows render is CircleRender, so render.radius is safe to access.
// Inside the else block it knows render is RectRender, so render.width is safe.
// This is the discriminated union from render.ts in action.

import { World } from '../World';

export function RenderSystem(world: World, ctx: CanvasRenderingContext2D): void {
  const entities = world.query('position', 'render');

  for (const id of entities) {
    const pos    = world.getComponent(id, 'position')!;
    const render = world.getComponent(id, 'render')!;

    if (!render.visible) continue;

    ctx.beginPath();
    ctx.fillStyle = render.color;

    if (render.shape === 'circle') {
      // TypeScript knows render.radius exists here because shape === 'circle'
      ctx.arc(pos.x, pos.y, render.radius, 0, Math.PI * 2);
    } else {
      // TypeScript knows render.width and render.height exist here
      ctx.rect(pos.x, pos.y, render.width, render.height);
    }

    ctx.fill();
    ctx.closePath();
  }
}
