import Containers from '@/components/dashboard/containers'
import Sidebar from '@/components/dashboard/sidebar'
import { getSession } from '@/lib/getSession'
import { redirect } from 'next/navigation'
import React from 'react'

const Dashboard = async() => {
  const session = await getSession()
  if(!session?.user) redirect('/auth/signin')
  
  return (
    <div className='flex min-h-screen bg-slate-900'>
      <Sidebar/>
      <div className='flex-1 overflow-auto'>
        <Containers/>
      </div>
    </div>
  )
}

export default Dashboard