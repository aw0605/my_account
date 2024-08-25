import { useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Image from 'next/image'
import { differenceInDays } from 'date-fns'
import { css } from '@emotion/react'
import withAuth from '@hooks/withAuth'
import usePiggybanks from '@components/account/hooks/usePiggybanks'
import addDelimiter from '@utils/addDelimiter'
import Flex from '@shared/Flex'
import ListRow from '@shared/ListRow'
import Text from '@shared/Text'
import Spacing from '@/components/shared/Spacing'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import { dehydrate, QueryClient } from 'react-query'
import { getPiggybanks } from '@/remote/piggybank'
import { User } from '@/models/user'

function PiggybanksPage() {
  const {
    data,
    hasNextPage = false,
    isFetching,
    fetchNextPage,
  } = usePiggybanks()

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return
    }

    fetchNextPage()
  }, [hasNextPage, isFetching, fetchNextPage])

  const piggybanks = data?.pages.map(({ items }) => items).flat() ?? []

  if (piggybanks.length == 0) {
    return (
      <Flex justify="center" align="center" style={{ padding: 24 }}>
        아직 만드신 저금통이 없습니다.
      </Flex>
    )
  }

  return (
    <div>
      <Flex>
        <InfiniteScroll
          dataLength={piggybanks.length}
          hasMore={hasNextPage}
          next={loadMore}
          loader={<></>}
          scrollThreshold="100px"
        >
          <ul>
            {piggybanks?.map((piggybank) => {
              return (
                <ListRow
                  key={piggybank.id}
                  left={
                    <Flex align="center" style={{ minWidth: 110 }}>
                      <Image
                        src="https://cdn2.iconfinder.com/data/icons/new-year-resolutions/64/resolutions-24-512.png"
                        width={40}
                        height={40}
                        alt="저금통 이미지"
                      />
                      <Spacing direction="horizontal" size={10} />
                      <Text bold={true}>
                        D-{differenceInDays(piggybank.endDate, new Date())}
                      </Text>
                    </Flex>
                  }
                  contents={
                    <ListRow.Texts
                      title={piggybank.name}
                      subTitle={`목표 금액까지 ${addDelimiter(
                        piggybank.goalAmount - piggybank.balance,
                      )}원`}
                    />
                  }
                />
              )
            })}
          </ul>
        </InfiniteScroll>
      </Flex>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  if (session != null && session.user != null) {
    const client = new QueryClient()

    await client.prefetchInfiniteQuery(
      ['piggybanks', (session.user as User)?.id],
      () => getPiggybanks({ userId: (session.user as User)?.id as string }),
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

export default withAuth(PiggybanksPage)
