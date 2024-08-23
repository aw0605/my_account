import styled from '@emotion/styled'
import { colors } from '@styles/colorPalette'

const BaseProgressBar = styled.div<{ progress: number }>(({ progress }) => ({
  height: 10,
  backgroundColor: colors.blue,
  transform: `scaleX(${progress})`,
  transition: 'transform 0.3s',
  transformOrigin: 'left',
}))

const Container = styled.div(() => ({
  width: 'calc(100% - 48px)',
  height: 10,
  backgroundColor: colors.gray100,
  overflow: 'hidden',
  borderRadius: 6,
  margin: 24,
}))

function ProgressBar({ progress }: { progress: number }) {
  return (
    <Container>
      <BaseProgressBar progress={progress} />
    </Container>
  )
}

export default ProgressBar
