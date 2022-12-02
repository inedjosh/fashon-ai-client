import React from 'react'

const Hello = () => {

    const email = 'Leoadamsy98@gmail.com'

  return (
    <div className='3xl:mx-auto 3xl:container'>
      <div className='text-white border-2 border-dashed border-neutral-700 rounded-[50px] my-20 py-20 px-10 flex flex-col sm:flex-row items-center justify-between bg-black-white'>
        <div className='flex flex-col sm:flex-row items-center sm:items-end'>
          <img src="./images/userProfile.png" className='w-[150px] h-[150px]' alt="" />

          <div className='sm:px-5 font-semibold py-10 sm:py-0 sm:h-[100px] flex flex-col justify-between'>
            <p className='text-center sm:text-left text-2xl sm:text-[80px]'>Hello!</p>
            <p>{ email }</p>
          </div>
        </div>  
        
        <img src="./images/cloud.png" alt="" />
      </div>
      
      <div className='flex flex-col items-center sm:items-start py-10 md:px-0 md:mx-20'>
        <div className='w-full bg-white rounded-[40px] sm:px-10 p-5 py-20 text-center sm:text-left sm:text-xl'>
          <h1 className='text-2xl sm:text-5xl font-bold'>Account overview</h1>
          
          <div className='py-7'>
              <p className='font-bold'>Your plan</p>
              <p>PREMIUM INDIVIDUAL</p>
          </div>

          <div className='flex xl:flex-row flex-col justify-between pt-10'>
              <div>
                <p className='pb-5'>189 images left</p>
                <p className='font-bold underline text-zinc-600'>Learn more about your plan</p>
              </div>

              <div className='md:w-[350px] py-10 xl:py-0'>
                <div>Payment</div>
                <div>Your next bill is for 900.00 NGN on 20/11/2022.</div>
                <div>Your card ending on 8027 Expires:12/2024</div>
              </div>
          </div>
        </div>

        <button className={`bg-blue-purple text-white font-semibold rounded-lg px-10 py-5 my-10 outline-none lg:mr-8`}>
          Renew payment
        </button>
      </div>
    </div>
  )
}

export default Hello