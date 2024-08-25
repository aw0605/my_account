import { useInfiniteQuery } from 'react-query'
import { getPiggybanks } from '@/remote/piggybank'
import useUser from '@hooks/useUser'

function usePiggybanks({ suspense }: { suspense?: boolean } = {}) {
  const user = useUser()

  return useInfiniteQuery(
    ['piggybanks', user?.id],
    ({ pageParam }) => getPiggybanks({ userId: user?.id as string, pageParam }),
    {
      getNextPageParam: (snapshot) => {
        return snapshot.lastVisible
      },
      suspense,
    },
  )
}

export default usePiggybanks
