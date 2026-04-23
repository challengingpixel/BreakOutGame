// Component: Ball
// Tags this entity as the ball and stores its radius.

export interface BallComponent {
  radius: number;
}

export function createBallComponent(radius: number): BallComponent {
  return { radius };
}
