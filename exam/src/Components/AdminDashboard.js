import React from 'react'

import { useSelector } from 'react-redux';

function AdminDashboard() {

  const user=useSelector((state)=>state.user.user)

  return (
    <>
   

    </>
  )
}

export default AdminDashboard