import styled from '@emotion/styled'
import { Colors, colors } from '@styles/colorPalette'

interface TagProps {
  fontSize?: string
  padding?: string
  fontWeight?: string
  textAlign?: 'left' | 'right' | 'center' | 'justify'
  borderRadius?: string
  color?: string
  backgroundColor?: string
}

const Tag = styled.span<TagProps>(
  ({
    fontSize = '11px',
    padding = '4px 5px',
    fontWeight = 'bold',
    textAlign = 'center',
    borderRadius = '2px',
    color = colors.white,
    backgroundColor = colors.blue,
  }) => ({
    fontSize,
    padding,
    fontWeight,
    textAlign,
    borderRadius,
    color: color in colors ? colors[color as Colors] : color,
    backgroundColor:
      backgroundColor in colors
        ? colors[backgroundColor as Colors]
        : backgroundColor,
  }),
)

export default Tag
