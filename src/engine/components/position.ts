// Component: Position
//
// The "interface" keyword is TypeScript's way of describing the *shape* of an object.
// Think of it as a contract: any object of type PositionComponent MUST have x and y,
// and both MUST be numbers.
//
// The interface lives here, next to the factory function, so you can see the data
// shape and the code that creates it in the same place.

export interface PositionComponent {
  x: number;
  y: number;
}

export function createPosition(x: number, y: number): PositionComponent {
  return { x, y };
}
