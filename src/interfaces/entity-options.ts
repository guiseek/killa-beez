import {Position} from './position'

export type EntityType = 'player' | 'enemy' | 'object'

export interface EntityOptions {
  position: Position
  type: EntityType
  name: string
}
