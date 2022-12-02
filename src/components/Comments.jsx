import React from 'react'

const Comments = ({image, name, comment}) => {
  return (
      <div className='text-white bg-black-white w-[500px] rounded-[50px] border-2 border-dashed border-neutral-700 overflow-hidden py-5 px-7 sm:px-14 sm:mx-5 my-5'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                <img src={image} className='w-[70px] h-[70px] rounded-full' alt="" />
                  <p className='px-5 font-semibold'>{ name }</p>
                </div>

                <img src="./images/twitter-logo.png" className='sm:block hidden' alt="" />
            </div>

          <p className='py-5 font-light text-sm'>{ comment }</p>
          
            <div className='flex justify-between'>
              <div className='flex items-end'>
                <img src="./images/share-logo.png" alt="" />
                <p className='underline px-5 font-semibold text-xl'>Share</p>
              </div>

              <img src="./images/twitter-logo.png" className='sm:hidden block' alt="" />
            </div>
      </div>
  )
}

export default Comments