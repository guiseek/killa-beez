/// <reference types="vite/client" />

type Binary = 0 | 1

type Key = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight' | 'Space'

type ControlKeys = Record<Key, Binary>

// type PlayerKeyFrame = 'fly'

// type PlayerFrame = Record<
//   PlayerKeyFrame,
//   (HTMLCanvasElement | OffscreenCanvas)[]
// >

// type PlayerFrames = [string, PlayerKeyFrame, number][]

type Direction = 'left' | 'right'
type AnimationKey = 'fly' | 'fly' | 'fire' | 'waiting'
type Frames = [string, AnimationKey, Direction, number][]
type AnimationFrames<K extends string, U extends string> = [string, K, U, number][]
type AnimationFrame<K extends string> = Record<Direction, Record<K, Canvas[]>>
