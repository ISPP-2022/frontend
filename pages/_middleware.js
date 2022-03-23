import { NextResponse } from "next/server"
var jwt = require('jsonwebtoken');

export async function middleware(req) {

  const session = req.cookies.authToken
  let user = null
  if (session) {
    try {
      user = jwt.verify(session, process.env.JWT_SECRET || 'stackingupsecretlocal')
    } catch (error) {
    }
  }

  if (req.url.includes('/publish/add')) {
    if (!user || user.role === 'USER') {
      return NextResponse.redirect('/')
    }
  }

  if (req.url.includes('/publish/edit')) {
    if (!user || user.role === 'USER') {
      return NextResponse.redirect('/')
    }
  }

  if (req.url.includes('/smartSearch/renter')) {
    if (!user) {
      return NextResponse.redirect('/')
    }
  }

  // If user is authenticated, continue.
  return NextResponse.next()
}