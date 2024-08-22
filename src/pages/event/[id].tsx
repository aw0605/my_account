import { useQuery } from 'react-query'
import { GetServerSidePropsContext } from 'next'
import { isAfter, parseISO } from 'date-fns'
import { getEvent } from '@remote/event'
import { useAlertContext } from '@contexts/AlertContext'
import Preview from '@components/event/Preview'

import { Event } from '@models/event'

interface EventPageProps {
  id: string
  initialEvent: Event
}

function EventPage({ id, initialEvent }: EventPageProps) {
  const { open } = useAlertContext()

  const { data } = useQuery(['event', id], () => getEvent(id), {
    initialData: initialEvent,
    onSuccess: (event) => {
      const isEnd = isAfter(new Date(), parseISO(event.endDate))

      if (isEnd) {
        open({
          title: `${event.title} 이벤트가 종료되었어요`,
          description: '다음에 더 좋은 이벤트로 찾아오겠습니다',
          onBtnClick: () => {
            window.history.back()
          },
        })
      }
    },
  })

  if (data == null) {
    return null
  }

  return <Preview data={data} mode="preview" />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query
  const event = await getEvent(id as string)

  return {
    props: { id, initialEvent: event },
  }
}

export default EventPage
