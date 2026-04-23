// Component: Input
// Tracks which movement keys are currently pressed.

export interface InputComponent {
  rightPressed: boolean;
  leftPressed: boolean;
}

export function createInput(): InputComponent {
  return { rightPressed: false, leftPressed: false };
}
