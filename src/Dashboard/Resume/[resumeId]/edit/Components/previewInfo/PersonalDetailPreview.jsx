import React from 'react'

const PersonalDetailPreview = (resumeinfo) => {
const info = resumeinfo.resumeinfo;

  return (
    <div>
      <h1 
      style={{color: `${info.themeColor}`}}
      className='font-bold text-xl text-center'>{info?.firstName} {info?.lastName}</h1>
      <h2
      className='text-center text-sm font-medium'>{info?.jobTitle}</h2>
      <h2
      className='text-center text-sm font-normal'
      >
        {info?.address}
      </h2>

<div className='flex justify-between'>
    <h2 className='font-normal text-xs'
      style={{color: `${info.themeColor}`}}
    >{info?.phone}</h2>
    <h2
    className='font-normal text-xs'
    style={{color: `${info.themeColor}`}}
    >
        {info.email}
    </h2>
</div>
<hr className=' border-4 my-2'  style={{"borderColor": `${info.themeColor}`}} />



    </div>
  )
}

export default PersonalDetailPreview
