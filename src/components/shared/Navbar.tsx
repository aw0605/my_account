import { useCallback } from 'react'
import { useRouter } from 'next/router'
import useUser from '@hooks/useUser'
import Link from 'next/link'
import Image from 'next/image'
import { css } from '@emotion/react'
import Flex from './Flex'
import Button from './Button'
import { colors } from '@styles/colorPalette'

function Navbar() {
  const user = useUser()
  const router = useRouter()
  const showSignBtn = ['/auth/signin'].includes(router.pathname) === false

  const renderBtn = useCallback(() => {
    if (user != null) {
      return (
        <Link href="/my">
          <Image
            src={
              user.image ??
              'https://cdn1.iconfinder.com/data/icons/flat-business-icons/128/user-64.png'
            }
            alt="유저 이미지"
            width={35}
            height={35}
            style={{ borderRadius: 100 }}
          />
        </Link>
      )
    }

    if (showSignBtn) {
      return (
        <Link href="/auth/signin">
          <Button>로그인/회원가입</Button>
        </Link>
      )
    }

    return null
  }, [user, showSignBtn])

  return (
    <Flex justify="space-between" align="center" css={navbarStyles}>
      <Link href="/">MyAccount</Link>
      {renderBtn()}
    </Flex>
  )
}

const navbarStyles = css`
  padding: 10px 24px;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
  border-bottom: 1px solid ${colors.gray100};
`

export default Navbar
