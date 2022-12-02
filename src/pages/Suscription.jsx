import React from 'react'

const MakePayment = () => {
  return (
      <div className='sm:px-5 xl:px-20 sm:pt-64 pb-40 text-white flex flex-col sm:flex-row 3xl:mx-auto 3xl:container'>
          <div className='sm:w-[60%] overflow-hidden h-fit sm:rounded-3xl'>
            <img src="./images/woman-making-call.png" className='sm:h-[900px] object-cover' alt="" />
          </div>
 
          <div className='sm:w-[40%] sm:pl-5 lg:pl-10 flex flex-col'>
              <h1 className='xl:text-[80px] text-4xl leading-none'>Make your Payment!</h1>
              
              <div className='py-10 font-semibold flex flex-col'>
                    <div className='py-3'>
                        <p>Name on the card?</p>
                        <input type="text" placeholder='Enter Name on Card' className='my-2 bg-[#202020] p-5 rounded-2xl w-full placeholder:opacity-20'/>
                    </div>
                    
                    <div className='py-3'>
                        <p>Card number</p>
                        <input type="number" placeholder='e.g 009-9372' className='my-2 bg-[#202020] p-5 rounded-2xl w-full placeholder:opacity-20'/>
                    </div>

                    <div className='py-3'>
                        <p>Expiry Date</p>
                        <input type="date" placeholder='MM/YY' className='my-2 bg-[#202020] p-5 rounded-2xl w-full placeholder:opacity-20'/>
                    </div>

                    <div className='py-3'>
                        <p>CVV</p>
                      <input type="number" className='my-2 bg-[#202020] p-5 rounded-2xl w-full' />
                    </div>

                    <button className={`bg-blue-purple text-white font-semibold rounded-lg px-10 py-5 my-10 outline-none lg:mr-8`}>
                        Make payment
                    </button>
              </div>

                <div> <img src="./images/paypal-logo.png" className='' alt="" /> </div>
          </div>

      </div>
  )
}

export default MakePayment