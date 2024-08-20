import Link from 'next/link'
import Image from 'next/image'
import { css } from '@emotion/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import useEventBanners from './hooks/useEventBanners'
import withSusepnse from '@shared/hocs/withSuspense'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Skeleton from '@shared/Skeleton'

function EventBanners() {
  const { data } = useEventBanners()

  console.log(data)
  return (
    <div style={{ padding: 24 }}>
      <Swiper spaceBetween={8}>
        {data?.map((banner) => {
          return (
            <SwiperSlide key={banner.id}>
              <Link href={banner.link}>
                <Flex
                  style={{ backgroundColor: banner.backgroundColor }}
                  justify="space-between"
                  css={bannerStyles}
                >
                  <Flex direction="column">
                    <Text bold={true}>{banner.title}</Text>
                    <Text typography="t6">{banner.subTitle}</Text>
                  </Flex>
                  <Image
                    src={banner.iconUrl}
                    width={40}
                    height={40}
                    alt="이벤트 배너 아이콘"
                  />
                </Flex>
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

const bannerStyles = css`
  padding: 24px;
  border-radius: 8px;
`

export function BannerSkeleton() {
  return (
    <div style={{ padding: 24 }}>
      <Skeleton width="100%" height={100} style={{ borderRadius: 8 }} />
    </div>
  )
}

export default withSusepnse(EventBanners, {
  fallback: <BannerSkeleton />,
})
