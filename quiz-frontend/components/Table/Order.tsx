'use client'
import { order } from '@/utils/data'
import React from 'react'

const Order = (props: {orderSortFunc: Function}) => {
  return (
    <div>
        <select onChange={(e) => props.orderSortFunc(e.target.value)} name="order" id="order" className="xs:w-[4.5rem] text-black dark:text-white px-2 py-2 w-full h-8 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 xs:text-xs md:text-md sm:leading-6 dark:bg-slate-700">
          {
            Object.entries(order).map((data, key) => 
            
              <option key={key} value={data[0]} className='font-sans font-semibold'>                              
                {data[1]}                
              </option>
            )
          }
        </select>
    </div>
  )
}

export default Order