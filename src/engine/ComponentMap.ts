// ComponentMap.ts — the "directory" of all components.
//
// This is the ONE central file that connects component names (plain strings
// like 'position') to their TypeScript interfaces.
//
// The World class uses this to give you type-safe addComponent / getComponent:
//
//   world.getComponent('ball', 'position')  →  returns PositionComponent | undefined
//   world.addComponent('ball', 'position', { x: 1 })  →  TypeScript checks the shape
//
// When you add a new component to your game:
//   1. Create the interface in its own file  (e.g. src/game/components/health.ts)
//   2. Add one line here:   health: HealthComponent;
//   Done — the World is automatically typed for the new component.

import { PositionComponent } from './components/position';
import { VelocityComponent } from './components/velocity';
import { BallComponent }     from '../game/components/ball';
import { BrickComponent }    from '../game/components/brick';
import { InputComponent }    from '../game/components/input';
import { RenderComponent }   from '../game/components/render';
import { SizeComponent }     from '../game/components/size';

export interface ComponentMap {
  position: PositionComponent;
  velocity: VelocityComponent;
  ball:     BallComponent;
  brick:    BrickComponent;
  input:    InputComponent;
  render:   RenderComponent;
  size:     SizeComponent;
}
