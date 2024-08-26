import { collection, doc, writeBatch } from 'firebase/firestore'
import { COLLECTIONS } from '@constants/collection'
import { store } from '@remote/firebase'
import Button from '@shared/Button'

const FAQS = [
  {
    question: 'MyAccount 는 어떤 서비스인가요 1',
    answer: '유저에게 편리한 경험을 제공해주는 자산 서비스입니다 1',
  },
  {
    question: 'MyAccount 는 어떤 서비스인가요 2',
    answer: '유저에게 편리한 경험을 제공해주는 자산 서비스입니다 2',
  },
  {
    question: 'MyAccount 는 어떤 서비스인가요 3',
    answer: '유저에게 편리한 경험을 제공해주는 자산 서비스입니다 3',
  },
]

function FAQAddBtn() {
  const handleBtnClick = () => {
    const batch = writeBatch(store)

    FAQS.forEach((faq) => {
      const docRef = doc(collection(store, COLLECTIONS.FAQ))

      batch.set(docRef, faq)
    })

    batch.commit().then(() => {
      window.alert('FAQ 데이터 추가 완료')
    })
  }

  return <Button onClick={handleBtnClick}>FAQ추가하기</Button>
}

export default FAQAddBtn
