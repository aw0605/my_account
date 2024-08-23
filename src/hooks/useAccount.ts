import { useQuery } from 'react-query'
import useUser from './useUser'
import { getAccount } from '@remote/account'

function useAccount() {
  const user = useUser()

  return useQuery(['account', user?.id], () => getAccount(user?.id as string), {
    enabled: user != null,
  })
}

export default useAccount
