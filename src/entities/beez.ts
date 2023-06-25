import {loadFrames, Offscreen} from '../core'
import {Entity} from './entity'

export class Beez extends Entity {
  order = 1

  frame = 0
  mode: AnimationKey = 'fly'

  size = 128

  offscreen = new Offscreen(this.size, this.size)

  frames: Frames = [
    ['beez/left/fly/1.png', 'waiting', 'left', 0],
    ['beez/right/fly/1.png', 'waiting', 'right', 0],
    ['beez/left/fire/0.png', 'fire', 'left', 0],
    ['beez/left/fire/1.png', 'fire', 'left', 1],
    ['beez/left/fire/2.png', 'fire', 'left', 2],
    ['beez/right/fire/0.png', 'fire', 'right', 0],
    ['beez/right/fire/1.png', 'fire', 'right', 1],
    ['beez/right/fire/2.png', 'fire', 'right', 2],
    ['beez/left/fly/0.png', 'fly', 'left', 0],
    ['beez/left/fly/1.png', 'fly', 'left', 1],
    ['beez/left/fly/2.png', 'fly', 'left', 2],
    ['beez/left/fly/3.png', 'fly', 'left', 3],
    ['beez/right/fly/0.png', 'fly', 'right', 0],
    ['beez/right/fly/1.png', 'fly', 'right', 1],
    ['beez/right/fly/2.png', 'fly', 'right', 2],
    ['beez/right/fly/3.png', 'fly', 'right', 3],
  ]

  animationFrame!: AnimationFrame<AnimationKey>

  constructor() {
    super({
      position: {x: 0, y: 0},
      type: 'player',
      name: 'Beez',
    })
    this.#load()
  }

  #load() {
    loadFrames(this.frames, this.size).then((animation) => {
      this.animationFrame = animation
      const {x, y} = this.position
      const current = animation[this.direction][this.mode][this.frame]
      this.offscreen.context.drawImage(current, x, y)
    })
  }

  update() {
    super.update()

    if (this.hasSomeKeyPressed) {
      if (this.keys.Space) {
        this.mode = 'fire'
      } else {
        this.mode = 'fly'
      }
    }

    this.clearCanvas()

    if (this.animationFrame) {
      const animation = this.animationFrame[this.direction][this.mode]
      this.offscreen.context.drawImage(animation[this.frame], 0, 0)

      this.frame++

      if (
        this.frame >=
        this.animationFrame[this.direction][this.mode].length - 1
      ) {
        this.frame = 0
      }
    }
  }
}
