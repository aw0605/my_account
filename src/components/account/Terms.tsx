import { useState, MouseEvent } from 'react'
import dynamic from 'next/dynamic'
import { TERM_LIST } from '@constants/account'

import { Term } from '@models/account'
import Agreement from '../shared/Agreement'

const FixedBottomBtn = dynamic(() => import('@shared/FixedBottomBtn'))

function Terms({ onNext }: { onNext: (termIds: string[]) => void }) {
  const [termsAgreements, setTermsAgreements] = useState(() =>
    generateInitialValues(TERM_LIST),
  )

  const handleAgreement = (id: string, checked: boolean) => {
    setTermsAgreements((prev) => {
      return prev.map((term) => (term.id === id ? { ...term, checked } : term))
    })
  }

  const handleAllAgreement = (_: MouseEvent<HTMLElement>, checked: boolean) => {
    setTermsAgreements((prev) => {
      return prev.map((term) => ({ ...term, checked }))
    })
  }

  const isAllAgree = termsAgreements.every((term) => term.checked)
  const isMandatoryAgree = termsAgreements
    .filter((term) => term.mandatory)
    .every((term) => term.checked)

  return (
    <div>
      <Agreement>
        <Agreement.Title checked={isAllAgree} onChange={handleAllAgreement}>
          약관 모두 동의
        </Agreement.Title>
        {termsAgreements.map((term) => (
          <Agreement.Description
            key={term.id}
            checked={term.checked}
            link={term.link}
            onChange={(_, checked) => handleAgreement(term.id, checked)}
          >
            {term.mandatory ? '[필수]' : '[선택]'} {term.title}
          </Agreement.Description>
        ))}
      </Agreement>

      <FixedBottomBtn
        label="약관동의"
        onClick={() => {
          onNext(
            termsAgreements.filter((term) => term.checked).map(({ id }) => id),
          )
        }}
        disabled={!isMandatoryAgree}
      />
    </div>
  )
}

function generateInitialValues(terms: Term[]) {
  return terms.map((term) => ({ ...term, checked: false }))
}

export default Terms
