import memoize from "fast-memoize";
import React, { useMemo } from "react";
import type { LoadingProps } from "./_shared";

const generate = memoize(
	(width: number, height: number, r: number, gap: number) => {
		const maps: Array<React.ReactNode> = [];
		const step = r * 2 + gap;

		const padx = (((width - r) % step) - r) / 2;
		const pady = (((height - r) % step) - r) / 2;

		const cols = Math.ceil((width - r) / step);
		const rows = Math.ceil((height - r) / step);

		for (let y = r, row = 0; y < height; y += step, row += 1) {
			for (let x = r, col = 0; x < width; x += step, col += 1) {
				maps.push(
					<circle
						cx={padx + x}
						cy={pady + y}
						r={r}
						className="fill-stone-200 animate-[1000ms_color-cycle_ease-in-out_infinite]"
            style={{
              animationDelay: `${50 * ((col % cols) - (row % rows))}ms`
            }}
						key={crypto.randomUUID()}
					/>,
				);
			}
		}

		return maps;
	},
);

export const Loading = React.memo(
	({ width, height, r = 2, gap = 4 }: LoadingProps) => {
		const maps = useMemo(
			() => generate(width, height, r, gap),
			[gap, height, r, width],
		);
		return (
			<svg
				width={width}
				height={height}
				viewBox={`0 0 ${width} ${height}`}
				xmlns="http://www.w3.org/2000/svg"
			>
				<title>Loading...</title>
				{maps}
			</svg>
		);
	},
);
