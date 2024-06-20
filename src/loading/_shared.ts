export type LoadingProps = {
  width: number
  height: number
  r?: number
  gap?: number
}

export const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))
