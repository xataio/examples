import { type NextRequest } from 'next/server'
import { ImageResponse } from '@vercel/og'

export default function OG(req: NextRequest) {
  const { searchParams } = req.nextUrl

  const title = searchParams.has('title')
    ? searchParams.get('title')?.slice(0, 100)
    : ''

  const image = searchParams.has('image')
    ? searchParams.get('image')?.slice(0, 100)
    : ''

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(45deg,#FF0075,#06D6A0,#0076FF)',
          color: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '95%',
            height: '95%',
            background: 'black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            borderRadius: 10,
          }}
        >
          <img
            width="50"
            style={{
              position: 'absolute',
              bottom: 20,
              right: 20,
            }}
            src={`${process.env.VERCEL_URL}/xatafly-colored.svg`}
          />

          <img
            src={image}
            alt="Poster"
            width="250"
            height="375"
            style={{
              borderRadius: 10,
              boxShadow: '0 0 15px rgba(255,255,255,0.4)',
            }}
          />
          <div
            style={{
              display: 'flex',
              flexFlow: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <p
              style={{
                fontSize: 80,
                paddingBottom: 15,
              }}
            >
              {title}
            </p>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  )
}

export const config = {
  runtime: 'experimental-edge',
}
