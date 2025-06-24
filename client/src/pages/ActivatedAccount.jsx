import React from 'react'
import { Link } from 'react-router-dom'

export default function ActivatedAccount() {
  return (
    <div className='p-5 bg-warning'>
      <p>Vous avez activé votre compte</p>
      <Link className='link link-primary' to={'/'}>Login</Link>
    </div>
  )
}
