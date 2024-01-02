type Pretty<T> = {
  [K in keyof T]: T[K]
} & {}

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

type Transition<S extends string = string> = {
  target: S
  action: () => void
}

type StateMachine = {
  initial: keyof Machine['states']
  current: keyof Machine['states']
  context: Record<string, unknown>
  on: Record<string, keyof Machine['states'] | Transition<keyof Machine['states']>>
  states: Record<string, Pretty<State>>
}

type State = Partial<Omit<StateMachine, 'current' | 'context' | 'initial'>>

export class Machine {
  initial = 'idle'
  current = 'idle'
  context: Record<string, unknown> = {}
  states: Record<string, Partial<Omit<StateMachine, 'current'>>> = {}
  on: Record<string, keyof Machine['states'] | Transition> = {}

  constructor({ initial, context, states }: Partial<Omit<StateMachine, 'current'>> = {}) {
    this.initial = initial ?? 'idle'
    this.current = initial ?? 'idle'
    this.context = context ?? {}
    this.states = states ?? {}
  }

  public send(event: string) {
    const transition = this.on[event] ?? this.states[this.current]?.on?.[event] ?? this.current

    if (typeof transition === 'object') {
      transition.action()
      this.current = transition.target
    } else {
      this.current = transition
    }
  }
}
