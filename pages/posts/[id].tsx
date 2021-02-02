import { GetStaticProps, GetStaticPaths } from 'next'
import MainLayout from '@layouts/main'
import { getAllPostIds, getPostData } from '@lib/posts'

/**
 *  This param is because getStaticProps return an object
 * return {
    props: {
      postData, 
    },
  }
 */
export default function Post({ postData }) {
  return (
    <MainLayout>
      <h3>{postData.title}</h3>
      <br />
      {postData.date}
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.content }} />
    </MainLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  //Here we call to the library method
  const postData = await getPostData(params.id)
  return {
    props: {
      postData, //Should return like this because we use destructuring in the default export method
    },
  }
}
