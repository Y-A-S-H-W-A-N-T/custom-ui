import React from 'react'
const Header = (props) => {
  return (
    <><header>
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="text-center sm:text-left"  style={{color: props.headerLabel}}>
          <h1 className="text-2xl font-bold sm:text-3xl">
            Welcome Back, {props.name}✋🏻✌️!
          </h1>
          <p className="mt-1.5 text-sm">
            Let's create your Website! 🎉
          </p>
        </div>
  
        <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
        
          <button
            onClick={(e)=>props.InnerFire(e,3)}
            className='block rounded-lg px-5 py-3 text-sm font-medium'
            style={{backgroundColor: props.buttonbg,color: props.buttontext}}
            type="button"
          >
            Your Account
          </button>
        </div>
      </div>
    </div>
  </header></>
  )
}

export default Header