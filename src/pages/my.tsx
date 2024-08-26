import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import withAuth from '@hooks/withAuth'
import useUser from '@hooks/useUser'
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import Button from '@shared/Button'
import ListRow from '@shared/ListRow'

function MyPage() {
  const user = useUser()
  const navigate = useRouter()

  return (
    <div>
      <Spacing size={30} />
      <Flex
        direction="column"
        justify="center"
        align="center"
        style={{ padding: 24 }}
      >
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
        <Spacing size={40} />
        <Button onClick={() => signOut({ callbackUrl: '/' })}>로그아웃</Button>
      </Flex>

      <Spacing
        size={8}
        backgroundColor="gray100"
        style={{ margin: '20px 0 ' }}
      />
      <ul>
        <ListRow
          contents={<ListRow.Texts title="약관" subTitle="약관 목록 및 철회" />}
          withArrow={true}
          onClick={() => {
            navigate.push('/settings/terms')
          }}
        />
      </ul>
    </div>
  )
}

export default withAuth(MyPage)
