import { collection, doc, setDoc } from 'firebase/firestore'
import { store } from './firebase'
import { COLLECTIONS } from '@constants/collection'

import { Transaction } from '@models/transaction'

export function createTransaction(newTransaction: Transaction) {
  return setDoc(doc(collection(store, COLLECTIONS.TRANSACTION)), newTransaction)
}
