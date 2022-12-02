import React from 'react'

const Footer = () => {
  return (
      <div className='text-white sm:h-[500px] sm:px-10 py-20 flex flex-col justify-between 3xl:mx-auto 3xl:container'>
          <div className='font-semibold text-lg flex flex-col sm:flex-row justify-between sm:w-[70%]'>
              <h1 className='text-2xl py-5 sm:py-0'>FASHUN.AI</h1>
              
              <div className='flex flex-col sm:flex-row text-stone-700 font-bold py-5 sm:py-0'>
                  <div className='sm:px-10'>
                      <p>SOCIALS</p>
                      
                      <div className='flex'>
                        <div className='w-[50px] h-[50px] rounded-full bg-[#202020] mx-1 my-3'></div>
                        <div className='w-[50px] h-[50px] rounded-full bg-[#202020] mx-1 my-3'></div>
                        <div className='w-[50px] h-[50px] rounded-full bg-[#202020] mx-1 my-3'></div>
                      </div>
                  </div>
                  
                  <div className='sm:px-10'>
                    <p>FUSHUN</p>
                      
                      <div className='text-white text-xl sm:text-2xl my-3'>
                        <div className='py-2 font-normal'>Company</div>
                        <div className='py-2 font-normal'>About Us</div>
                        <div className='py-2 font-normal'>FAQ</div>
                      </div>
                  </div>
              </div>
          </div>

          <div className='w-full xl:w-[47%]'>
            <p>Built by a <span className='underline'>Beamstudio</span> on the shoulders of <span className='underline'>machine learning giants</span>. Funshi AI is a registered trademark and subject to copyright worldwide.</p>
          </div>
      </div>
  )
}

export default Footer