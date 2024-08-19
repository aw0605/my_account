import Head from 'next/head'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

export default function Home() {
  return (
    <Container>
      <div css={helloStyles}>Hello</div>
    </Container>
  )
}

const Container = styled.div`
  background-color: pink;
`

const helloStyles = css`
  color: blue;
`
