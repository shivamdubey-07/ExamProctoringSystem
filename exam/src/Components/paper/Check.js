import React from 'react'
import { useSelector } from 'react-redux';


function Check() {
  const userData = useSelector((state) => state.userData)
  console.log(userData)

  return (
    <div>gmfdk</div>
  )
}

export default Check