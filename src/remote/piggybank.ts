import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  QuerySnapshot,
  setDoc,
  startAfter,
  where,
} from 'firebase/firestore'
import { store } from './firebase'
import { COLLECTIONS } from '@constants/collection'

import { Piggybank } from '@models/piggybank'

export function createPiggybank(newPiggybank: Piggybank) {
  return setDoc(doc(collection(store, COLLECTIONS.PIGGYBANK)), newPiggybank)
}

export async function getPiggybank(userId: string) {
  const snapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.PIGGYBANK),
      where('userId', '==', userId),
      where('endDate', '>=', new Date()),
      orderBy('endDate', 'asc'),
      limit(1),
    ),
  )

  if (snapshot.docs.length === 0) {
    return null
  }

  const piggybank = snapshot.docs[0].data()

  return {
    id: snapshot.docs[0].id,
    ...(piggybank as Piggybank),
    startDate: piggybank.startDate.toDate(),
    endDate: piggybank.endDate.toDate(),
  }
}

export async function getPiggybanks({
  userId,
  pageParam,
}: {
  userId: string
  pageParam?: QuerySnapshot<Piggybank>
}) {
  const piggybankQuery =
    pageParam == null
      ? query(
          collection(store, COLLECTIONS.PIGGYBANK),
          where('userId', '==', userId),
          where('endDate', '>=', new Date()),
          orderBy('endDate', 'asc'),
          limit(10),
        )
      : query(
          collection(store, COLLECTIONS.PIGGYBANK),
          where('userId', '==', userId),
          where('endDate', '>=', new Date()),
          orderBy('endDate', 'asc'),
          startAfter(pageParam),
          limit(10),
        )

  const piggybankSnapshot = await getDocs(piggybankQuery)
  const lastVisible = piggybankSnapshot.docs[piggybankSnapshot.docs.length - 1]

  const items = piggybankSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Piggybank),
    startDate: doc.data().startDate.toDate(),
    endDate: doc.data().endDate.toDate(),
  }))

  return { items, lastVisible }
}
