import memoize from "fast-memoize"
import React, { useEffect, useMemo, useRef } from "react"

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

const Dot = React.memo((props: React.SVGProps<SVGCircleElement>) => {
  const ref = useRef<SVGCircleElement>(null)
  useEffect(() => {
    if (!ref.current)
      return
    const current = ref.current
    let unmount = false

    async function randomize() {
      if (unmount)
        return
      if (Math.random() > 0.36) {
        await sleep(Math.random() * 1000)
        return randomize()
      }
      const activeClass = "animate-[color-cycle_1000ms_ease-in-out]"
      current.classList.add(activeClass)
      await sleep(Math.random() * 1000)
      current.classList.remove(activeClass)
      return randomize()
    }

    randomize()

    return () => {
      unmount = true
    }
  }, [])

  return <circle ref={ref} className="fill-stone-200" {...props} />
})

const generate = memoize((width: number, height: number, r: number, gap: number) => {
  const maps: Array<[number, number]> = []
  const step = r * 2 + gap
  let last_col = 0
  let last_row = 0

  for (let y = r; y < height; y += step) {
    last_col = y + r
    for (let x = r; x < width; x += step) {
      maps.push([x, y])
      last_row = x + r
    }
  }

  return { maps, padX: (width - last_row) / 2, padY: (height - last_col) / 2 }
})

type LoadingProps = {
  width: number
  height: number
  r?: number
  gap?: number
}
export const Loading = React.memo(({ width, height, r = 2, gap = 4 }: LoadingProps) => {
  const { maps, padX, padY } = useMemo(() => generate(width, height, r, gap), [gap, height, r, width])

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg">
      {maps.map(([x, y]) => (
        <Dot key={crypto.randomUUID()} cx={padX + x} cy={padY + y} r={r} />
      ))}
    </svg>
  )
})
