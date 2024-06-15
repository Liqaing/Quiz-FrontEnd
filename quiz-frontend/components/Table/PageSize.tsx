'use client'
import { pageSize } from '@/utils/data'
import { forwardRef } from 'react'
import React from 'react'

const PageSize = (props: {pageSizeFunc: Function, sizePage: Function}) => {
  return (
    <div className='mr-auto'>
        <select onChange={(e) => {props.pageSizeFunc(e.target.value)}}  name="size" id="size" className="xs:w-21 md:w-26 text-black dark:text-white px-2 py-2 h-8 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 xs:text-xs md:text-md sm:leading-6 dark:bg-slate-700">
          {
            Object.entries(pageSize).map((data,key) => <option key={key} value={data[0]} className='font-sans font-semibold'>{data[0]}</option>)
          }
        </select>
    </div>
  )
}

export default PageSize