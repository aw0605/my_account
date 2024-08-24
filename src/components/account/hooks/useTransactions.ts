import { useInfiniteQuery } from 'react-query'
import { getTransaction } from '@remote/transaction'
import useUser from '@hooks/useUser'

import { TransactionFilterType } from '@models/transaction'

function useTransactions({
  suspense,
  filter,
}: { suspense?: boolean; filter?: TransactionFilterType } = {}) {
  const user = useUser()

  return useInfiniteQuery(
    ['transactions', user?.id, filter],
    ({ pageParam }) =>
      getTransaction({ userId: user?.id as string, pageParam, filter }),
    {
      getNextPageParam: (snapshot) => {
        return snapshot.lastVisible
      },
      suspense,
    },
  )
}

export default useTransactions
