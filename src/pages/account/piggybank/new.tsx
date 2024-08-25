import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { useMutation } from 'react-query'
import dynamic from 'next/dynamic'
import { format } from 'date-fns'
import withAuth from '@hooks/withAuth'
import useUser from '@hooks/useUser'
import { useAlertContext } from '@contexts/AlertContext'
import { createPiggybank } from '@remote/piggybank'
import Flex from '@shared/Flex'
import TextField from '@shared/TextField'
import Spacing from '@shared/Spacing'

import { Piggybank } from '@models/piggybank'

const FixedBottomBtn = dynamic(() => import('@shared/FixedBottomBtn'), {
  ssr: false,
})

function NewPiggyBankPage() {
  const user = useUser()
  const { open } = useAlertContext()
  const [formValues, setFormValues] = useState({
    name: '',
    endDate: '',
    goalAmount: '',
  })

  const minDate = useMemo(() => format(new Date(), 'yyyy-MM-dd'), [])

  const { mutate, isLoading } = useMutation(
    (newPiggybank: Piggybank) => createPiggybank(newPiggybank),
    {
      onSuccess: () => {
        open({
          title: '새로운 저금통을 만들었어요',
          onBtnClick: () => {
            window.history.back()
          },
        })
      },
      onError: () => {
        open({
          title: '저금통을 만들지 못했어요',
          description: '잠시 후 다시 시도해주세요',
          onBtnClick: () => {
            window.history.back()
          },
        })
      },
    },
  )

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const handleSubmit = () => {
    const newPiggybank = {
      ...formValues,
      goalAmount: Number(formValues.goalAmount),
      userId: user?.id as string,
      startDate: new Date(),
      endDate: new Date(formValues.endDate),
      balance: 0,
    } as Piggybank

    mutate(newPiggybank)
  }

  const isPossible = Object.values(formValues).every((value) => value !== '')

  return (
    <div style={{ padding: 24 }}>
      <Flex direction="column">
        <TextField
          name="name"
          label="통장이름"
          value={formValues.name}
          onChange={handleFormValues}
        />
        <Spacing size={10} />
        <TextField
          type="date"
          name="endDate"
          label="종료일자"
          min={minDate}
          value={formValues.endDate}
          onChange={handleFormValues}
        />
        <Spacing size={10} />
        <TextField
          name="goalAmount"
          label="목표금액"
          value={formValues.goalAmount}
          onChange={handleFormValues}
        />

        <FixedBottomBtn
          label="저금통 만들기"
          onClick={handleSubmit}
          disabled={!isPossible || isLoading}
        />
      </Flex>
    </div>
  )
}

export default withAuth(NewPiggyBankPage)
