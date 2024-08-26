import { useMemo } from 'react'
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import useUser from '@hooks/useUser'
import { getTerms, updateTerms } from '@remote/account'
import { TERM_LIST } from '@constants/account'
import Button from '@shared/Button'
import Flex from '@shared/Flex'
import ListRow from '@shared/ListRow'
import Text from '@shared/Text'
import Top from '@shared/Top'

import { User } from '@models/user'

function TermsPage() {
  const user = useUser()
  const client = useQueryClient()

  const { data } = useQuery(
    ['terms', user?.id],
    () => getTerms(user?.id as string),
    {
      enabled: user != null,
    },
  )

  const agreeList = useMemo(() => {
    if (data == null) {
      return null
    }

    const agreeAllList = TERM_LIST.filter(({ id }) => data.termIds.includes(id))

    const mandatoryTerms = agreeAllList.filter(({ mandatory }) => mandatory)
    const optionalTerms = agreeAllList.filter(({ mandatory }) => !mandatory)

    return { mandatoryTerms, optionalTerms }
  }, [data])

  const { mutate, isLoading } = useMutation(
    (termIds: string[]) => updateTerms(user?.id as string, termIds),
    {
      onSuccess: () => {
        client.invalidateQueries(['terms', user?.id])
      },
      onError: () => {
        // TODO
      },
    },
  )

  const handleDisagree = (selectedTermId: string) => {
    const updatedTermIds = data?.termIds.filter(
      (termId) => selectedTermId !== termId,
    )

    if (updatedTermIds != null) {
      mutate(updatedTermIds)
    }
  }

  return (
    <div>
      <Top title="약관" subTitle="약관 목록 및 철회" />
      {agreeList == null ? (
        <Flex justify="center" style={{ padding: 24 }}>
          <Text>동의한 약관 목록이 없습니다.</Text>
        </Flex>
      ) : (
        <ul>
          {agreeList.mandatoryTerms.map((term) => (
            <ListRow
              key={term.id}
              contents={
                <ListRow.Texts title={`[필수] ${term.title}`} subTitle="" />
              }
            />
          ))}

          {agreeList.optionalTerms.map((term) => (
            <ListRow
              key={term.id}
              contents={
                <ListRow.Texts title={`[선택] ${term.title}`} subTitle="" />
              }
              right={
                <Button
                  onClick={() => handleDisagree(term.id)}
                  disabled={isLoading}
                >
                  철회
                </Button>
              }
            />
          ))}
        </ul>
      )}
    </div>
  )
}

async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  if (session != null && session.user != null) {
    const client = new QueryClient()

    await client.prefetchQuery(['terms', (session.user as User).id], () =>
      getTerms((session.user as User).id),
    )

    return {
      props: {
        dehydrateState: JSON.parse(JSON.stringify(dehydrate(client))),
      },
    }
  }

  return {
    props: {},
  }
}

export default TermsPage
