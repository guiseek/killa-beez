import {loadImage} from './load-image'
import {Offscreen} from './offscreen'

export const loadFrames = async (frames: AnimationFrames<AnimationKey, Direction>, size = 1000) => {
  const animation = {} as AnimationFrame<AnimationKey>
  return Promise.all(
    frames.map(async ([src, key, dir, index]) => {
			console.log(src);
			
      const offscreen = new Offscreen(size, size)
      const image = await loadImage(src, size, size)
      offscreen.context.drawImage(image, 0, 0, size, size)
      
      if (!animation[dir]) animation[dir] = animation[dir] ?? {}
      if (!animation[dir][key]) animation[dir][key] = []
      animation[dir][key][index] = offscreen.canvas
    })
  ).then(() => animation)
}
