import Link from 'next/link'
import Image from 'next/image'
import useUser from '@hooks/useUser'
import useAccount from '@hooks/useAccount'
import addDelimiter from '@utils/addDelimiter'
import Button from '@shared/Button'
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'

function Account() {
  const user = useUser()
  const { data: account } = useAccount()

  if (account == null) {
    return (
      <div style={{ padding: 24 }}>
        <Flex justify="space-between">
          <Flex direction="column">
            <Text bold={true} style={{ whiteSpace: 'pre-wrap' }}>
              {'계좌 개설이\n더 쉽고 빨라졌어요'}
            </Text>
            <Spacing size={8} />
            <Link href="/account/new">
              <Button>3분만에 개설하기</Button>
            </Link>
          </Flex>
          <Image
            src="https://cdn4.iconfinder.com/data/icons/business-and-finance-colorful-free-hand-drawn-set/100/money_dollars-512.png"
            alt="계좌개설 이미지"
            width={80}
            height={80}
          />
        </Flex>
      </div>
    )
  }

  if (account.status === 'READY') {
    return (
      <div style={{ padding: 24 }}>
        <Flex justify="space-between" align="center">
          <Flex direction="column">
            <Text bold={true} style={{ whiteSpace: 'pre-wrap' }}>
              계좌 개설 심사 중입니다.
            </Text>
          </Flex>
          <Image
            src="https://cdn4.iconfinder.com/data/icons/business-and-finance-colorful-free-hand-drawn-set/100/money_dollars-512.png"
            alt="계좌개설 이미지"
            width={80}
            height={80}
          />
        </Flex>
      </div>
    )
  }

  if (account) {
    return (
      <div style={{ padding: 24 }}>
        <Flex justify="space-between" align="center">
          <Flex direction="column">
            <Text typography="t6" color="gray600">
              {user?.name} 회원님의 자산
            </Text>
            <Spacing size={2} />
            <Text typography="t3" bold={true}>
              {addDelimiter(account.balance)}원
            </Text>
          </Flex>

          <Button>분석</Button>
        </Flex>
      </div>
    )
  }
}

export default Account
