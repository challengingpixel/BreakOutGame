// World.ts — the core of the ECS engine.
//
// The JavaScript version used plain strings everywhere, so there was no safety:
//   world.getComponent('ball', 'positoin')  ← typo, silent bug at runtime
//
// The TypeScript version uses "generics" to be fully type-safe.
// A generic function is one that works differently depending on what type you pass.
//
//   getComponent<K extends keyof ComponentMap>(id, type: K): ComponentMap[K]
//
// Breaking that down:
//   K                      — a placeholder for "whichever component name you pass"
//   extends keyof ComponentMap — K must be a real component name ('position', 'velocity', ...)
//   ComponentMap[K]        — the return type is the interface for that component
//
// Example:
//   world.getComponent('ball', 'position')
//   K = 'position', so the return type is  ComponentMap['position'] = PositionComponent
//
// TypeScript figures this out automatically — you don't have to write the K yourself.
export class World {
    constructor() {
        // Internally still uses Map<string, any> because each component type is different.
        // 'any' is only used inside this class — the public methods are fully typed.
        this.components = {};
        this.entityIds = new Set();
    }
    createEntity(id) {
        this.entityIds.add(id);
        return id;
    }
    // K must be a key of ComponentMap (e.g. 'position', 'velocity', ...).
    // The data must match the interface for that key.
    addComponent(entityId, type, data) {
        if (!this.components[type]) {
            this.components[type] = new Map();
        }
        this.components[type].set(entityId, data);
    }
    // Returns the component data for the given entity and type,
    // or undefined if the entity doesn't have that component.
    getComponent(entityId, type) {
        return this.components[type]?.get(entityId);
    }
    // Returns all entity IDs that have ALL the listed component types.
    query(...types) {
        const result = [];
        for (const id of this.entityIds) {
            if (types.every(t => this.components[t]?.has(id))) {
                result.push(id);
            }
        }
        return result;
    }
}
