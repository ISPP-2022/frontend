import axios from "axios";
import fetchAdapter from '@vespaiach/axios-fetch-adapter'
import { NextResponse } from "next/server"
var jwt = require('jsonwebtoken');

export async function middleware(req) {
  const axiosInstance = axios.create({
    adapter: fetchAdapter
  })

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

  if (req.url.includes('/payment/invoice')) {
    let rental = await axiosInstance.get(`${process.env.DATA_API_URL || 'http://localhost:4100'}/api/v1/rentals/${req.url.split('/').pop()}`)
      .then(res => {
        return res.data;
      }).catch(err => {
        return null;
      })
    if (!rental || !user) {
      return NextResponse.redirect('/')
    } else {
      if (user.role !== 'ADMIN' && rental.renterId !== user.userId) {
        return NextResponse.redirect('/')
      }
    }
  }

  if (req.url.includes('/admin')) {
    if (!user || user.role !== 'ADMIN') {
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