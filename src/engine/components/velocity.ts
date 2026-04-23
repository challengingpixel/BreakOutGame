// Component: Velocity
//
// dx = horizontal speed (positive = right, negative = left)
// dy = vertical speed   (positive = down,  negative = up)

export interface VelocityComponent {
  dx: number;
  dy: number;
}

export function createVelocity(dx: number, dy: number): VelocityComponent {
  return { dx, dy };
}
