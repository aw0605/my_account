import {
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
  signIn,
} from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers/index'
import Spacing from '@shared/Spacing'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Button from '@shared/Button'

function signinPage({
  providers,
}: {
  providers: Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider>
}) {
  return (
    <div>
      <Spacing size={100} />
      <Flex direction="column" align="center">
        <Text bold={true}>My Account</Text>
        <Spacing size={80} />
        <ul>
          {Object.values(providers).map((provider) => (
            <li key={provider.id}>
              <Button onClick={() => signIn(provider.id, { callbackUrl: '/' })}>
                {provider.name} 로그인
              </Button>
            </li>
          ))}
        </ul>
      </Flex>
    </div>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: { providers },
  }
}

export default signinPage
