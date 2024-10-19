"use client"
import FetchData from '@/components/AllPosts'
import GameList from '@/components/GameList'
import MainContainer from '@/components/MainContainer'
import Search from '@/components/Search'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
// import { getFirestore } from 'firebase/firestore'
// import { app } from '@/firebase/FirebaseConfig'

function Dashboard() {
  const [searchText, setSearchText] = useState("");
  const [selectedSport, setSelectedSport] = useState(0)

    // const db = getFirestore(app)

    // const getPost
    // let session = useSession()

//   console.log(session)
  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setSearchText(e.target.value)
  }

  const handleSportSelect = (id: number) =>{
    setSelectedSport(id)
  }
    
  return (
    <div className='px-5 sm:px-7 md:px-10 mt-7'>
        <MainContainer />
        <div className='flex flex-col items-center w-full mt-7'>
        <Search searchText={searchText} handleSearchTextChange={handleSearchTextChange} />
        <GameList selectedSport= {selectedSport} handleSportSelect={handleSportSelect} />
        </div>
        <FetchData searchText = {searchText} selectedSport={selectedSport}/>
    </div>
  )
}

export default Dashboard