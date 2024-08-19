import { collection, doc, writeBatch } from 'firebase/firestore'
import { store } from '@remote/firebase'
import { COLLECTIONS } from '@constants/collection'
import Button from '@shared/Button'

import { EVENT_BANNERS } from '@/mock/banner'

function EventBannerAddBtn() {
  const handleBtnClick = async () => {
    const batch = writeBatch(store)
    EVENT_BANNERS.forEach((banner) => {
      const bannerRef = doc(collection(store, COLLECTIONS.EVENT_BANNER))
      batch.set(bannerRef, banner)
    })

    await batch.commit()
    alert('배너 데이터 추가 완료!')
  }

  return <Button onClick={handleBtnClick}>이벤트 배너 데이터 추가하기</Button>
}

export default EventBannerAddBtn
