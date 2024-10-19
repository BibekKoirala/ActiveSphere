import FetchData from '@/components/AllPosts'
import GameList from '@/components/GameList'
import MainContainer from '@/components/MainContainer'
import Search from '@/components/Search'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
// import { getFirestore } from 'firebase/firestore'
// import { app } from '@/firebase/FirebaseConfig'

function Dashboard() {

    // const db = getFirestore(app)

    // const getPost
    // let session = useSession()

//   console.log(session)
    
  return (
    <div className='px-5 sm:px-7 md:px-10 mt-7'>
        <MainContainer />
        <div className='flex flex-col items-center w-full mt-7'>
        <Search />
        <GameList />
        </div>
        <FetchData />
    </div>
  )
}

export default Dashboard