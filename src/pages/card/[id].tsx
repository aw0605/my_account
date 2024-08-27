import { GetServerSidePropsContext } from 'next'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useQuery } from 'react-query'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { getCard } from '@remote/card'
import Top from '@shared/Top'
import ListRow from '@shared/ListRow'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import SEO from '@shared/SEO'

import { Card } from '@models/card'

const FixedBottomBtn = dynamic(() => import('@shared/FixedBottomBtn'), {
  ssr: false,
})

interface CardDetailPageProps {
  initialCard: Card
}

function CardDetailPage({ initialCard }: CardDetailPageProps) {
  const { id } = useParams()
  const { data } = useQuery(['card', id], () => getCard(id as string), {
    initialData: initialCard,
  })

  if (data == null) {
    return
  }

  const { name, corpName, promotion, tags, benefit } = data

  const subTitle =
    promotion != null ? removeHtmlTags(promotion.title) : tags.join(',')

  return (
    <div>
      <SEO
        title={`${corpName} ${name}`}
        description={subTitle}
        image="https://cdn4.iconfinder.com/data/icons/travello-basic-ui-1/64/Correct-512.png"
      />
      <Top title={`${corpName} ${name}`} subTitle={subTitle} />

      <ul>
        {benefit.map((text, idx) => (
          <motion.li
            key={text}
            initial={{ opacity: 0, translateX: -90 }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
              delay: idx * 0.2,
            }}
            animate={{
              opacity: 1,
              translateX: 0,
            }}
          >
            <ListRow
              as="div"
              left={
                <Image
                  src="https://cdn4.iconfinder.com/data/icons/travello-basic-ui-1/64/Correct-512.png"
                  width={30}
                  height={30}
                  alt="혜택 아이콘 이미지"
                />
              }
              contents={
                <ListRow.Texts title={`혜택 ${idx + 1}`} subTitle={text} />
              }
            />
          </motion.li>
        ))}
      </ul>

      {promotion != null ? (
        <Flex
          direction="column"
          style={{ marginTop: '50px', padding: '0 24px 80px 24px' }}
        >
          <Text bold={true}>유의사항</Text>
          <Text typography="t7">{removeHtmlTags(promotion.terms)}</Text>
        </Flex>
      ) : null}

      <FixedBottomBtn label="1분만에 신청하고 혜택받기" onClick={() => {}} />
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context
  const cardId = query.id as string

  const card = await getCard(cardId)

  return {
    props: {
      initialCard: card,
    },
  }
}

function removeHtmlTags(text: string) {
  return text.replace(/<\/?[^>]+(>|$)/g, '')
}

export default CardDetailPage
