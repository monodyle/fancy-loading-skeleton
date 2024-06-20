import React, { useEffect, useMemo, useRef } from "react"
import memoize from "fast-memoize"
import { type LoadingProps, sleep } from "./_shared"

const generate = memoize((width: number, height: number, r: number, gap: number) => {
  const maps: Array<[number, number]> = []
  const step = r * 2 + gap

  const padx = (((width - r) % step) - r) / 2;
  const pady = (((height - r) % step) - r) / 2;

  for (let y = r; y < height; y += step) {
    for (let x = r; x < width; x += step) {
      maps.push([x, y])
    }
  }

  return { maps, padx, pady }
})

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
      const activeClass = "animate-[1000ms_color-cycle_ease-in-out]"
      current.classList.add(activeClass)
      await sleep(1000)
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

export const Loading = React.memo(({ width, height, r = 2, gap = 4 }: LoadingProps) => {
  const { maps, padx, pady } = useMemo(() => generate(width, height, r, gap), [gap, height, r, width])

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg">
      <title>Loading...</title>
      {maps.map(([x, y]) => (
        <Dot key={crypto.randomUUID()} cx={padx + x} cy={pady + y} r={r} />
      ))}
    </svg>
  )
})
