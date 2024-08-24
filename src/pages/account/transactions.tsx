import { useCallback, useState } from 'react'
import { format, parseISO } from 'date-fns'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { dehydrate, QueryClient } from 'react-query'
import { colors } from '@styles/colorPalette'
import withAuth from '@hooks/withAuth'
import { getTransaction } from '@remote/transaction'
import addDelimiter from '@utils/addDelimiter'
import useTransactions from '@components/account/hooks/useTransactions'
import Flex from '@shared/Flex'
import ListRow from '@shared/ListRow'
import Text from '@shared/Text'

import { User } from '@models/user'
import { TransactionFilterType } from '@models/transaction'

const FILTERS: Array<{ label: string; value: TransactionFilterType }> = [
  {
    label: '전체',
    value: 'all',
  },
  {
    label: '입금',
    value: 'deposit',
  },
  {
    label: '출금',
    value: 'withdraw',
  },
]

function TransactionsPage() {
  const [currentFilter, setCurrentFilter] =
    useState<TransactionFilterType>('all')

  const {
    data,
    hasNextPage = false,
    isFetching,
    fetchNextPage,
  } = useTransactions({ filter: currentFilter })

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return
    }

    fetchNextPage()
  }, [hasNextPage, isFetching, fetchNextPage])

  const transactions = data?.pages.map(({ items }) => items).flat() ?? []

  return (
    <div>
      <Flex as="ul" justify="flex-end" style={{ padding: 24 }}>
        {FILTERS.map((filter) => {
          const isActive = currentFilter === filter.value

          return (
            <li
              key={filter.value}
              onClick={() => {
                setCurrentFilter(filter.value)
              }}
              style={{
                cursor: 'pointer',
                marginRight: 5,
                color: isActive ? colors.blue980 : colors.black,
              }}
            >
              {filter.label}
            </li>
          )
        })}
      </Flex>

      <InfiniteScroll
        dataLength={transactions.length}
        hasMore={hasNextPage}
        next={loadMore}
        loader={<></>}
        scrollThreshold="100px"
      >
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
      </InfiniteScroll>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  if (session != null && session.user != null) {
    const client = new QueryClient()

    await client.prefetchInfiniteQuery(
      ['transactions', (session.user as User)?.id, 'all'],
      () => getTransaction({ userId: (session.user as User)?.id as string }),
    )

    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(client))),
      },
    }
  }

  return {
    props: {},
  }
}

export default withAuth(TransactionsPage)
