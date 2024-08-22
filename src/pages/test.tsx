import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Spacing from '@shared/Spacing'
import CardListAddBtn from '@components/test/CardListAddBtn'
import EventBannerAddBtn from '@components/test/EventBannerAddBtn'
import EventForm from '@components/test/EventForm'

function TestPage() {
  return (
    <Flex direction="column">
      <Flex direction="column" style={{ padding: 24 }}>
        <Text bold={true}>배너</Text>
        <EventBannerAddBtn />
      </Flex>
      <Spacing
        size={8}
        backgroundColor="gray100"
        style={{ margin: '20px 0' }}
      />

      <Flex direction="column" style={{ padding: 24 }}>
        <Text bold={true}>카드</Text>
        <CardListAddBtn />
      </Flex>
      <Spacing
        size={8}
        backgroundColor="gray100"
        style={{ margin: '20px 0' }}
      />
      <div style={{ padding: 12 }}>
        <EventForm />
      </div>
    </Flex>
  )
}

export default TestPage
