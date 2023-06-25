import {Offscreen} from '../core/offscreen'
import {Position, EntityType, EntityOptions, Updatable} from '../interfaces'

export abstract class Entity implements Updatable {
  abstract order: number
  abstract size: number

  abstract readonly offscreen: Offscreen

  protected direction: Direction = 'right'
  position: Position

  keys: ControlKeys = {
    ArrowDown: 0,
    ArrowLeft: 0,
    ArrowRight: 0,
    ArrowUp: 0,
    Space: 0,
  }

  velocity = 10

  type: EntityType
  name: string

  constructor(options: EntityOptions) {
    this.position = options.position
    this.type = options.type
    this.name = options.name
  }

  get hasSomeKeyPressed() {
    return Object.values(this.keys).some((state) => state === 1)
  }

  update() {
    if (this.hasSomeKeyPressed) {
      if (this.keys.ArrowDown) this.position.y += this.velocity
      if (this.keys.ArrowUp) this.position.y -= this.velocity
      if (this.keys.ArrowLeft) {
        this.direction = 'left'
        this.position.x -= this.velocity
      }
      if (this.keys.ArrowRight) {
        this.direction = 'right'
        this.position.x += this.velocity
      }

      if (this.position.x > innerWidth - this.size) {
        this.position.x = 0
      }
      if (this.position.x < 0) {
        this.position.x = innerWidth - this.size
      }
      if (this.position.y > innerHeight - this.size) {
        this.position.y = 0
      }
      if (this.position.y < 0) {
        this.position.y = innerHeight - this.size
      }
    }
  }

  protected clearCanvas() {
    const {width, height} = this.offscreen.canvas
    this.offscreen.context.clearRect(0, 0, width, height)
  }
}
