import { writeBatch, doc, collection } from 'firebase/firestore'
import { store } from '@remote/firebase'
import { COLLECTIONS } from '@constants/collection'
import Button from '@shared/Button'

import { card_list } from '@/mock/card'

function CardListAddBtn() {
  const handleBtnClick = async () => {
    const batch = writeBatch(store)

    card_list.forEach((card) => {
      const cardRef = doc(collection(store, COLLECTIONS.CARD))
      batch.set(cardRef, card)
    })

    await batch.commit()
    alert('카드 데이터 추가 완료!')
  }

  return <Button onClick={handleBtnClick}>카드 리스트 데이터 추가하기</Button>
}

export default CardListAddBtn
