import React from 'react'
import Header from '../components/Header'
import Hello from '../components/Hello'

const AccountOverview = () => {

    const name = 'Leo'

  return (
      <div>
          <Header title={`Hello ${name}`} />
          <Hello />
      </div>
  )
}

export default AccountOverview