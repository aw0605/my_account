import { memo } from 'react'
import { colors } from '@styles/colorPalette'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { Pie } from '@visx/shape'
import { Group } from '@visx/group'
import { scaleOrdinal } from '@visx/scale'
import Text from '@shared/Text'
import Flex from '@shared/Flex'

interface ChartData {
  label: string
  amount: number
}

interface CategoryPieChartProps {
  width: number
  height: number
  chartData: ChartData[]
}

const getValue = (d: ChartData) => d.amount

const margin = { top: 20, right: 20, bottom: 20, left: 20 }

function CategoryPieChart({ width, height, chartData }: CategoryPieChartProps) {
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom
  const radius = Math.min(innerWidth, innerHeight) / 2
  const centerY = innerHeight / 2
  const centerX = innerWidth / 2
  const top = centerY + margin.top
  const left = centerX + margin.left

  const getColor = scaleOrdinal({
    domain: chartData.map((l) => l.amount),
    range: [colors.blue, colors.blue200, colors.blue500, colors.gray200],
  })

  return (
    <Flex justify="center" direction="column">
      <Text bold={true} typography="t4" style={{ padding: '12px 24px' }}>
        카테고리별 소비현황
      </Text>
      <svg width={width} height={height}>
        <Group top={top} left={left}>
          <Pie data={chartData} pieValue={getValue} outerRadius={radius}>
            {(pie) => {
              return pie.arcs.map((arc) => {
                const { label, amount } = arc.data
                const [centroidX, centroidY] = pie.path.centroid(arc)
                const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1
                const arcPath = pie.path(arc) ?? ''
                const arcFill = getColor(amount)

                return (
                  <g key={label}>
                    <path d={arcPath} fill={arcFill} />
                    {hasSpaceForLabel && (
                      <text
                        x={centroidX}
                        y={centroidY}
                        dy=".33em"
                        fill="#ffffff"
                        fontSize={12}
                        textAnchor="middle"
                        pointerEvents="none"
                      >
                        {label}
                      </text>
                    )}
                  </g>
                )
              })
            }}
          </Pie>
        </Group>
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
        <CategoryPieChart width={width} height={height} chartData={chartData} />
      )}
    </ParentSize>
  )
}

export default memo(ChartWrapper)
