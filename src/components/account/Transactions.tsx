import Link from 'next/link'
import { parseISO, format } from 'date-fns'
import withSusepnse from '@hooks/withSuspense'
import useTransactions from './hooks/useTransactions'
import addDelimiter from '@utils/addDelimiter'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import ListRow from '@shared/ListRow'
import Button from '@shared/Button'

function Transactions() {
  const { data } = useTransactions({ suspense: true })

  const transactions = data?.pages
    .map(({ items }) => items)
    .flat()
    .slice(0, 5)

  return (
    <div>
      <Text bold={true} typography="t4" style={{ padding: 24 }}>
        입출금 내역
      </Text>

      {transactions?.length === 0 ? (
        <Flex justify="center" style={{ padding: 24 }}>
          <Text>아직 입출금 내역이 없어요</Text>
        </Flex>
      ) : (
        <>
          <ul>
            {transactions?.map((transaction) => {
              const isDeposit = transaction.type === 'deposit'

              return (
                <ListRow
                  key={transaction.id}
                  contents={
                    <ListRow.Texts
                      title={transaction.displayText}
                      subTitle={format(
                        parseISO(transaction.date),
                        'yyyy-MM-dd HH:mm:SS',
                      )}
                    />
                  }
                  right={
                    <Flex direction="column" align="flex-end">
                      <Text
                        color={isDeposit ? 'blue' : 'red'}
                        bold={true}
                        typography="t5"
                      >
                        {isDeposit ? '+' : '-'}
                        {addDelimiter(transaction.amount)}원
                      </Text>
                      <Text typography="t6">
                        {addDelimiter(transaction.balance)}원
                      </Text>
                    </Flex>
                  }
                />
              )
            })}
          </ul>

          <div style={{ padding: 24 }}>
            <Link href="/account/transactions">
              <Button full={true} size="medium" weak={true}>
                자세히보기
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

export default withSusepnse(Transactions, {
  fallback: <div>로딩중...</div>,
})
