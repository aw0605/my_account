import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useMutation } from 'react-query'
import useCreditCheck from '@components/credit/hooks/useCreditCheck'
import useUser from '@hooks/useUser'
import updateCredit from '@remote/credit'
import { useAlertContext } from '@contexts/AlertContext'
import { CHECK_STATUS } from '@constants/credit'
import FullPageLoader from '@shared/FullPageLoader'

const FixedBottomBtn = dynamic(() => import('@shared/FixedBottomBtn'), {
  ssr: false,
})

function CreditCheckPage() {
  const [readyToPoll, setReadyToPoll] = useState(true)
  const { open } = useAlertContext()
  const user = useUser()

  const { mutate } = useMutation((creditScore: number) =>
    updateCredit({ creditScore, userId: user?.id as string }),
  )

  const { data: status } = useCreditCheck({
    onSuccess: (creditScore) => {
      setReadyToPoll(false)
      mutate(creditScore)
    },
    onError: () => {
      setReadyToPoll(false)
      open({
        title: '신용점수 조회에 실패했습니다.',
        description: '잠시 후 다시 시도해주세요',
        onBtnClick: () => {
          window.history.back()
        },
      })
    },
    enabled: readyToPoll,
  })

  return (
    <div>
      <FullPageLoader message={STATUS_CHECK_MESSAGE[status ?? 'REDAY']} />
      {status === CHECK_STATUS.COMPLETE ? (
        <FixedBottomBtn
          label="확인"
          onClick={() => {
            window.history.back()
          }}
        />
      ) : null}
    </div>
  )
}

const STATUS_CHECK_MESSAGE = {
  [CHECK_STATUS.REDAY]: '신용점수 조회를 위해 정보를 준비하고있어요',
  [CHECK_STATUS.PROGRESS]: '신용점수를 조회중입니다. 잠시만 기다려주세요',
  [CHECK_STATUS.COMPLETE]: '신용점수 조회가 완료되었습니다',
}

export default CreditCheckPage
