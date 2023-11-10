import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import View from '../Components/View'
import Category from '../Components/Category'
import Add from '../Components/Add'


function Home() {

  const [uploadVideoStatus, setUploadVideoStatus] = useState({})

  return (
    <>
     <div className='container mt-5 mb-5 d-flex justify-content-between align-items-center'>
      <div className='add-video'>
        <Add setUploadVideoStatus={setUploadVideoStatus}/>
      </div>
      <Link to={'/WatchHistory'} style={{textDecoration:'none', fontSize:'30px'}}>Watch history</Link>
     </div>

     <div className='container-fluid w-100 mt-5 mb-5 d-flex justify-content-between'>
      <div className='all-videos col-lg-9' >
        <h4 className='mb-5'>All videos</h4>
        <View uploadVideoStatus={uploadVideoStatus}/>
      </div>
      <div className='category col-lg-3'>
        <Category/>
      </div>
     </div>
    </>
  )
}

export default Home