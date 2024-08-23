import { signOut } from 'next-auth/react'
import withAuth from '@hooks/withAuth'
import useUser from '@hooks/useUser'
import Image from 'next/image'
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import Button from '@shared/Button'

function MyPage() {
  const user = useUser()

  return (
    <div>
      <Spacing size={100} />
      <Flex direction="column" justify="center" align="center">
        <Image
          src={
            user?.image ??
            'https://cdn1.iconfinder.com/data/icons/flat-business-icons/128/user-64.png'
          }
          alt="유저 이미지"
          width={80}
          height={80}
          style={{ borderRadius: 100 }}
        />
        <Spacing size={16} />
        <Text bold={true} typography="t5">
          {user?.name}
        </Text>
        <Text typography="t7" color="gray600">
          {user?.email}
        </Text>
      </Flex>
      <Spacing size={50} />
      <Flex justify="center">
        <Button onClick={() => signOut({ callbackUrl: '/' })}>로그아웃</Button>
      </Flex>
    </div>
  )
}

export default withAuth(MyPage)
