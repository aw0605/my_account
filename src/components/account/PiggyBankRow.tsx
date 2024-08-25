import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import Image from 'next/image'
import useUser from '@/hooks/useUser'
import withSusepnse from '@hooks/withSuspense'
import { getPiggybank } from '@/remote/piggybank'
import ListRow from '@shared/ListRow'
import { differenceInDays } from 'date-fns'
import Flex from '../shared/Flex'
import Text from '../shared/Text'
import addDelimiter from '@/utils/addDelimiter'

function PiggyBankRow() {
  const navigate = useRouter()
  const user = useUser()

  const { data } = useQuery(
    ['piggybank', user?.id],
    () => getPiggybank(user?.id as string),
    {
      suspense: true,
    },
  )

  if (data == null) {
    return (
      <div>
        <ListRow
          left={
            <Image
              src="https://cdn2.iconfinder.com/data/icons/new-year-resolutions/64/resolutions-24-512.png"
              width={40}
              height={40}
              alt="저금통 이미지"
            />
          }
          contents={
            <ListRow.Texts
              title="저금통"
              subTitle="매일 매일 조금씩 저금하여 목표금액을 모아보아요"
            />
          }
          withArrow={true}
          onClick={() => {
            navigate.push('/account/piggybank/new')
          }}
        />
      </div>
    )
  }

  const { balance, endDate, goalAmount } = data
  const dday = differenceInDays(endDate, new Date())

  return (
    <div>
      <ListRow
        left={
          <Image
            src="https://cdn2.iconfinder.com/data/icons/new-year-resolutions/64/resolutions-24-512.png"
            width={40}
            height={40}
            alt="저금통 이미지"
          />
        }
        contents={
          <Flex direction="column">
            <Text typography="t4" bold={true}>
              D-{dday}
            </Text>
            <Text>
              목표 금액까지 {addDelimiter(goalAmount - balance)}원 남았어요
            </Text>
          </Flex>
        }
        withArrow={true}
        onClick={() => {
          navigate.push('/account/piggybank')
        }}
      />
    </div>
  )
}

export default withSusepnse(PiggyBankRow, { fallback: <div>로딩중...</div> })
