import {World, Beez} from './entities'
import {query} from './utilities'

const canvas = query('canvas')

if (canvas) {
  canvas.width = innerWidth
  canvas.height = innerHeight

  const context = canvas.getContext('2d')
  if (context) {
    const world = new World(context)

    const beez = new Beez()
    world.addEntity(beez)
    world.render()

    const isValidKey = (key: string) => Object.keys(beez.keys).includes(key)
    
    const setKey = (code: string, state: Binary) => {
      if (isValidKey(code)) beez.keys[code as Key] = state
    }
    
    onkeydown = (e) => setKey(e.code, 1)
    onkeyup = (e) => setKey(e.code, 0)
  }
}

document.documentElement.style.height = '100%'
document.body.style.overflow = 'hidden'
document.body.style.height = '100%'
document.body.style.margin = '0px'
