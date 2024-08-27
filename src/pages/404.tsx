import Image from 'next/image'
import Button from '@shared/Button'
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'

function NotFoundPage() {
  return (
    <div>
      <Spacing size={100} />
      <Flex direction="column" align="center">
        <Image
          src="https://cdn3.iconfinder.com/data/icons/network-and-communications-10/32/network_Error_lost_no_page_not_found-512.png"
          width={80}
          height={80}
          alt="404이미지"
        />
        <Spacing size={20} />
        <Text>찾으시는 페이지가 없습니다.</Text>
        <Spacing size={100} />
        <Button
          onClick={() => {
            window.history.back()
          }}
        >
          돌아가기
        </Button>
      </Flex>
    </div>
  )
}

export default NotFoundPage
