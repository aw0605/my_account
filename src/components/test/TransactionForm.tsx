import { ChangeEvent, useState } from 'react'
import { getAccount, updateAccountBalance } from '@remote/account'
import { createTransaction } from '@remote/transaction'
import Flex from '@shared/Flex'
import TextField from '@shared/TextField'
import Select from '@shared/Select'
import Spacing from '@shared/Spacing'
import Button from '@shared/Button'
import { Transaction } from '@models/transaction'

function TransactionForm() {
  const [formValues, setFormValues] = useState({
    userId: '',
    type: 'deposit',
    amount: '',
    displayText: '',
  })

  const handleFormValues = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async () => {
    const account = await getAccount(formValues.userId)

    if (account == null) {
      window.alert('해당 유저는 계좌를 보유하고 있지 않습니다.')
      return
    }

    if (
      formValues.type === 'withdraw' &&
      account.balance - Number(formValues.amount) < 0
    ) {
      window.alert(
        `현재 잔액은 ${account.balance}입니다. 잔액이 부족해 출금이 불가합니다.`,
      )
      return
    }

    const balance =
      formValues.type === 'withdraw'
        ? account.balance - Number(formValues.amount)
        : account.balance + Number(formValues.amount)

    const newTransaction = {
      ...formValues,
      amount: Number(formValues.amount),
      date: new Date().toISOString(),
      balance,
    } as Transaction

    Promise.all([
      createTransaction(newTransaction),
      updateAccountBalance(formValues.userId, balance),
    ])

    window.alert('입출금 데이터 생성 완료')
  }

  return (
    <div>
      <Flex direction="column">
        <TextField
          label="유저아이디"
          name="userId"
          value={formValues.userId}
          onChange={handleFormValues}
        />
        <Spacing size={10} />
        <Select
          name="type"
          options={[
            {
              label: '입금',
              value: 'deposit',
            },
            {
              label: '출금',
              value: 'withdraw',
            },
          ]}
          value={formValues.type}
          onChange={handleFormValues}
        />
        <Spacing size={10} />
        <TextField
          label="입출금 금액"
          name="amount"
          value={formValues.amount}
          onChange={handleFormValues}
        />
        <Spacing size={10} />
        <TextField
          label="추가 메시지"
          name="displayText"
          value={formValues.displayText}
          onChange={handleFormValues}
        />

        <Spacing size={16} />
        <Button onClick={handleSubmit}>
          {formValues.type === 'deposit' ? '입금' : '출금'}
        </Button>
      </Flex>
    </div>
  )
}

export default TransactionForm
