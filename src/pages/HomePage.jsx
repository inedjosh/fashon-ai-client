import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Hero2 from '../components/Hero2'
import StartUsing from '../components/StartUsing'
import WhatArePeopleSaying from '../components/WhatArePeopleSaying'

const HomePage = () => {
  return (
      <div>
          <Header title='Go pro $' />
          <Hero />
          <StartUsing />
          <Hero2 />
          <WhatArePeopleSaying />
          <Footer />
      </div>
  )
}

export default HomePage