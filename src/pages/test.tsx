import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Spacing from '@shared/Spacing'
import CardListAddBtn from '@components/test/CardListAddBtn'
import EventBannerAddBtn from '@components/test/EventBannerAddBtn'
import EventForm from '@components/test/EventForm'
import TransactionForm from '@components/test/TransactionForm'
import FAQAddBtn from '@components/test/FAQAddBtn'

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

      <Flex direction="column" style={{ padding: 24 }}>
        <Text bold={true}>FAQ</Text>
        <FAQAddBtn />
      </Flex>
      <Spacing
        size={8}
        backgroundColor="gray100"
        style={{ margin: '20px 0' }}
      />

      <div style={{ padding: 12 }}>
        <EventForm />
      </div>
      <Spacing
        size={8}
        backgroundColor="gray100"
        style={{ margin: '20px 0' }}
      />

      <div style={{ padding: 24 }}>
        <Text bold={true}>입출금테스트</Text>
        <TransactionForm />
      </div>
    </Flex>
  )
}

export default TestPage
