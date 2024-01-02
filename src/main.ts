import './polyfills'
import { assign, createActor, createMachine } from 'xstate'

type GameContext = {
  tick: number
}

const gameMachine = createMachine({
  id: 'game',
  initial: 'starting',
  context: {
    tick: 0,
  },
  types: {
    context: {} as GameContext,
  },
  states: {
    starting: {
      on: {
        init: 'idle',
      },
    },
    idle: {
      on: {
        tick: {
          target: '',
          actions: assign(({ context: c }) => ({ tick: c.tick + 1 })),
        },
      },
    },
  },
})

const game = createActor(gameMachine)
game.start()
game.send({ type: 'init' })

export const loop = () => {
  game.send({ type: 'tick' })
}
