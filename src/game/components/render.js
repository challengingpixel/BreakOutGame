// Component: Render
//
// This uses a "discriminated union" — one of the most useful TypeScript features.
//
// The problem: a circle needs a radius, but a rect needs width + height.
//   If we put all fields in one interface, nothing stops us from setting
//   radius on a rect (which makes no sense).
//
// The solution: two separate interfaces that share a 'shape' field.
//   TypeScript uses the 'shape' value to figure out WHICH interface applies.
//   Inside an if (render.shape === 'circle') block, TypeScript KNOWS
//   that render.radius exists — no manual casting needed.
//
// You can see this in action in RenderSystem.ts.
export {};
