import { collection, doc, setDoc, getDoc } from 'firebase/firestore'
import { store } from './firebase'
import { COLLECTIONS } from '@constants/collection'
import { Credit } from '@models/credit'

export function updateCredit({ userId, creditScore }: Credit) {
  return setDoc(doc(collection(store, COLLECTIONS.CREDIT), userId), {
    userId,
    creditScore,
  })
}

export async function getCredit(userId: string) {
  const snapshot = await getDoc(
    doc(collection(store, COLLECTIONS.CREDIT), userId),
  )

  if (snapshot.exists() === false) {
    return null
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as Credit),
  }
}

export default updateCredit
