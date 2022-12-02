import React from 'react'

const Button = ({title, background, color}) => {
  return (
      <button className={`bg-[${background}] text-${color} font-semibold rounded-lg px-10 py-3 my-5 outline-none lg:mr-8`}>
        {title}
      </button>
  )
}

export default Button