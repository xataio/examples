/**
 * 
 * @returns           
 * <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
 */

import { ActionFunction, LoaderFunction, redirect } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { getXataClient } from '~/lib/xata.codegen.server'
import type { RemixWithXataExample } from '~/lib/xata.codegen.server'
import { LINKS } from '~/lib/settings'

export const loader: LoaderFunction = async () => {
  const xata = await getXataClient()
  const links = await xata.db.remix_with_xata_example.getAll()

  return links
}

export const action: ActionFunction = async () => {
  const xata = await getXataClient()

  await xata.db.remix_with_xata_example.create(LINKS)

  return redirect('/')
}

export default function Index() {
  const links = useLoaderData<RemixWithXataExample[]>()

  return (
    <main>
      <header>
        <img src="/flap.gif" alt="Xata Logo" />
        <h1>
          Remix with<span aria-hidden>&#8209;</span>xata
        </h1>
      </header>
      <article>
        {links.length > 1 ? (
          <ul>
            {links.map(({ title, url, description }) => (
              <li key={url}>
                <a href={url ?? ''} rel="noopener noreferrer" target="_blank">
                  {title}
                </a>
                <p>{description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <section>
            <h2>No records found.</h2>
            <strong>
              Create a `remix_with_xata_example` and push some useful links to
              see them here.
            </strong>
            <Form method="post">
              <button type="submit">Push records to Xata</button>
            </Form>
          </section>
        )}
      </article>
      <footer>
        <span>
          Made by{' '}
          <a href="https://xata.io" rel="noopener noreferrer" target="_blank">
            <object data="/xatafly.svg" aria-label="Xata Logo" />
          </a>
        </span>
      </footer>
    </main>
  )
}
