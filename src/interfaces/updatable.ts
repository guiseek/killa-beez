export interface Updatable {
  order: number
  update(timestep: number, unscaledTimeStep: number): void
}
