import { InferGetServerSidePropsType } from 'next'
import { getXataClient } from '../utils/xata.codegen'

const IndexPage = ({
  links,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <main>
    <header>
      <img src="/flap.gif" />
      <h1>Xata-Next.js-Minimal Template</h1>
    </header>
    <article>
      <ul>
        {links.map(({ title, url, description }) => (
          <li key={url}>
            <a href={url} rel="noopener" target="_blank">
              {title}
            </a>
            <p>{description}</p>
          </li>
        ))}
      </ul>
    </article>
    <footer>
      <span>
        Made by{' '}
        <a href="https://xata.io" rel="noopener" target="_blank">
          <object data="/xatafly.svg" />
        </a>
      </span>
    </footer>
  </main>
)

export const getServerSideProps = async () => {
  const xata = await getXataClient()
  const links = await xata.db.templateLinks.getMany()

  return {
    props: {
      links,
    },
  }
}

export default IndexPage
