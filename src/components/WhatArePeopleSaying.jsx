import React from 'react'
import Comments from './Comments'

const WhatArePeopleSaying = () => {
  return (
      <div className='text-white pt-32 3xl:mx-auto 3xl:container relative'>
        <h1 className='text-2xl sm:text-6xl text-center'>What people are saying </h1>
      
        {/*<img src="./images/purpleBlueBackground.png" className='' alt="" />*/}
          
        <div className='flex flex-wrap justify-center py-10 sm:py-32'>
          <Comments name='Josh Jonathan' image="./images/hero-girl1.png" comment='Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus quos similique quidem aspernatur voluptates rerum veritatis harum. Eum, cupiditate sint!' />
          <Comments name='Precious Adams' image="./images/hero-girl1.png" comment='Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus quos similique quidem aspernatur voluptates rerum veritatis harum. Eum, cupiditate sint!' />
          <Comments name='Joy Joseph' image="./images/hero-girl1.png" comment='Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus quos similique quidem aspernatur voluptates rerum veritatis harum. Eum, cupiditate sint!' />
          <Comments name='Bola Banwa' image="./images/hero-girl1.png" comment='Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus quos similique quidem aspernatur voluptates rerum veritatis harum. Eum, cupiditate sint!' />
          <Comments name='Adams Musty' image="./images/hero-girl1.png" comment='Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus quos similique quidem aspernatur voluptates rerum veritatis harum. Eum, cupiditate sint!' />
          <Comments name='Efe Doe' image="./images/hero-girl1.png" comment='Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus quos similique quidem aspernatur voluptates rerum veritatis harum. Eum, cupiditate sint!' />
        </div>
      </div>
  )
}

export default WhatArePeopleSaying