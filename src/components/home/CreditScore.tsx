import Link from 'next/link'
import useCredit from '@components/credit/hooks/useCredit'
import Flex from '@shared/Flex'
import Skeleton from '@shared/Skeleton'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import Button from '@shared/Button'
import CreditScoreChart from '@shared/CreditScoreChart'

function CreditScore() {
  const { data, isLoading } = useCredit()

  if (isLoading) {
    return <CreditScoreSkeleton />
  }

  return (
    <div style={{ padding: 24 }}>
      <Flex justify="space-between" align="center">
        <Flex direction="column">
          <Text bold={true}>
            나의 신용도를 증명하고 <br />
            점수를 올리세요
          </Text>
          <Spacing size={8} />
          <Link href="/credit">
            <Button>내 신용점수 보러가기</Button>
          </Link>
        </Flex>
        <CreditScoreChart
          width={80}
          height={80}
          score={data?.creditScore ?? 0}
        />
      </Flex>
    </div>
  )
}

export function CreditScoreSkeleton() {
  return (
    <div style={{ padding: 24 }}>
      <Flex justify="space-between" align="center">
        <Flex direction="column">
          <Skeleton width={155} height={50} />
          <Spacing size={8} />
          <Skeleton width={155} height={31} />
        </Flex>
      </Flex>
    </div>
  )
}

export default CreditScore
