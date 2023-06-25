import {Entity} from './entity'

export class World {
  #entities: Entity[] = []

  constructor(private readonly context: CanvasRenderingContext2D) {}

  addEntity(entity: Entity) {
    this.#entities.push(entity)
  }

  removeEntity(entity: Entity) {
    const index = this.#entities.findIndex((e) => e.name === entity.name)
    this.#entities.splice(index, 1)
  }

  render() {
    const {width, height} = this.context.canvas
    this.context.clearRect(0, 0, width, height)

    for (const entity of this.#entities) {
      entity.update()
      this.context.drawImage(
        entity.offscreen.canvas,
        entity.position.x,
        entity.position.y
      )
    }

    requestAnimationFrame(() => this.render())
  }
}
