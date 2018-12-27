export type Validator<T> = (value: T | undefined | null, done: (error?: string) => void) => void
