import { NextRequest, NextResponse } from 'next/server'
import { api } from '@/lib/api'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')
  const registerResponse = await api.post('/register/github', {
    code,
  })

  const { token } = registerResponse.data
  const cookieExpiresSeconds = 3600 * 24 * 30
  const redirectUrl = new URL('/', req.url)

  return NextResponse.redirect(redirectUrl, {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpiresSeconds}`,
    },
  })
}
