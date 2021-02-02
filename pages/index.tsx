import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps, InferGetStaticPropsType } from 'next'

import Layout, { siteTitle } from '@layouts/main'
import utilStyles from '@styles/utils.module.scss'
import { getSortedPostsData } from 'lib/posts'
type Post = {
  id: string
  date: Date
  title: string
}

export const getStaticProps: GetStaticProps = async (context) => {
  // ABOUT context https://nextjs.org/docs/basic-features/data-fetching
  const allPostsData: Post[] = await getSortedPostsData()

  return {
    props: {
      allPostsData,
    },
  }
}

export const Home = ({
  allPostsData,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => (
  <Layout home>
    <Head>
      <title>{siteTitle}</title>
    </Head>
    <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      <p>
        I come from Tenerife (🇮🇨Canary Islands🍌) Spain, however, I’m currently
        living in Luxembourg🇱🇺, the centre of Europe🇪🇺. In my free time I like
        singing 🎙️and running🏃🏻- but when I go back to my beach paradise, I love
        surfing 🏄🏼 Most importantly, I never stop learning 🤓 about new
        technologies 💻.
      </p>
      <p>
        (This is a sample website - you’ll be building a site like this on{' '}
        <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
      </p>
      <h2 className={utilStyles.headingLg}>Blog</h2>
      <ul className={utilStyles.list}>
        {allPostsData.map(({ id, date, title }) => (
          <li className={utilStyles.listItem} key={id}>
            <Link href={`/posts/${id}`}>{title}</Link>
            <br />
            {id}
            <br />
            {date}
          </li>
        ))}
      </ul>
    </section>
  </Layout>
)

export default Home
