// Component: Brick
// Tracks whether this brick is alive or destroyed.
//
// "0 | 1" is a TypeScript "union type" — it means the value can ONLY be 0 or 1.
// If you try to write  brick.status = 2  TypeScript will give you an error.
// This is more precise than just writing  status: number.
export function createBrickComponent() {
    return { status: 1 };
}
