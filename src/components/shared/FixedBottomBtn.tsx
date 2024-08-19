import { createPortal } from 'react-dom'
import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import Button from './Button'

import { colors } from '@styles/colorPalette'

interface FixedBottomBtnProps {
  label: string
  onClick: () => void
  disabled?: boolean
}

function FixedBottomBtn({ label, onClick, disabled }: FixedBottomBtnProps) {
  const $portalRoot = document.getElementById('root-portal')

  if ($portalRoot == null) {
    return null
  }

  return createPortal(
    <Container>
      <Button
        onClick={onClick}
        full={true}
        size="medium"
        disabled={disabled}
        css={BtnStyles}
      >
        {label}
      </Button>
    </Container>,
    $portalRoot,
  )
}

const slideUp = keyframes`
  to {
    transform: translateY(0);
  }
`

const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.white};
  padding: 20px 10px 8px;
  transform: translateY(100%);
  animation: ${slideUp} 0.5s ease-in-out forwards;
`

const BtnStyles = css`
  border-radius: 8px;
`

export default FixedBottomBtn
