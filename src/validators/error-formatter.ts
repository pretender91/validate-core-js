export type ErrorFormatter<T, Options> = (value: T | null | undefined, options: Options) => string
export type ErrorFormatters<T, Options, ErrorNames extends string> = {
  [K in ErrorNames]: ErrorFormatter<T, Options>
}
