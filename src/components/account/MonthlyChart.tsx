import { memo, useMemo } from 'react'
import { format, parseISO } from 'date-fns'
import { colors } from '@styles/colorPalette'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { Bar } from '@visx/shape'
import { Group } from '@visx/group'
import { scaleBand, scaleLinear } from '@visx/scale'
import { AxisBottom } from '@visx/axis'
import Text from '@shared/Text'
import Flex from '@shared/Flex'

interface ChartData {
  date: string
  balance: number
}

interface MonthlyChartProps {
  chartData: ChartData[]
  width: number
  height: number
}

const verticalMargin = 120

const getX = (d: ChartData) => d.date
const getY = (d: ChartData) => d.balance
const formatDate = (date: string) => format(parseISO(date), 'M월')

function MonthlyChart({ chartData, width, height }: MonthlyChartProps) {
  const xMax = width
  const yMax = height - verticalMargin

  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: chartData.map(getX),
        padding: 0.4,
      }),
    [xMax, chartData],
  )

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...chartData.map(getY))],
      }),
    [yMax, chartData],
  )

  return width < 10 ? null : (
    <Flex justify="center" direction="column">
      <Text bold={true} typography="t4" style={{ padding: 24 }}>
        월별 소비현황
      </Text>
      <svg width={width} height={height}>
        <rect width={width} height={height} fill="url(#teal)" rx={14} />
        <Group top={verticalMargin / 2}>
          {chartData.map((d) => {
            const date = getX(d)
            const barWidth = xScale.bandwidth()
            const barHeight = yMax - (yScale(getY(d)) ?? 0)
            const barX = xScale(date)
            const barY = yMax - barHeight

            return (
              <Bar
                key={date}
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill={colors.blue}
              />
            )
          })}
        </Group>
        <AxisBottom
          top={yMax + 60}
          scale={xScale}
          tickFormat={formatDate}
          stroke={colors.blue}
          tickStroke={colors.blue}
          tickLabelProps={{
            fill: colors.blue,
            fontSize: 12,
            textAnchor: 'middle',
          }}
        />
      </svg>
    </Flex>
  )
}

interface ChartWrapperProps {
  height?: number
  chartData: ChartData[]
}

function ChartWrapper({ height = 200, chartData }: ChartWrapperProps) {
  return (
    <ParentSize>
      {({ width }) => (
        <MonthlyChart width={width} height={height} chartData={chartData} />
      )}
    </ParentSize>
  )
}

export default memo(ChartWrapper)
