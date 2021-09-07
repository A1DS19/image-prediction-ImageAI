import React from 'react'
import { NextComponentType } from 'next'

export const Container:NextComponentType = ({children}) => {
  return (
    <div className='container mx-auto'>
      {children}
    </div>
  )
}
