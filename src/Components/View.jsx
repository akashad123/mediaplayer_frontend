import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Videocard from './Videocard'
import { getAllVideos } from '../services/allAPI'

function View({uploadVideoStatus}) {

  const [allVideo, setAllVideo] = useState([])

  const [deleteVideoStatus, setDeleteVideoStatus] = useState()

  const getAllUploadedVideos = async()=>{
    const response = await getAllVideos()
   /*  console.log(response); */
   const {data} = response
  /*  console.log(data); */
  setAllVideo(data)
  }

  console.log(allVideo);

  useEffect(()=>{
    getAllUploadedVideos()
    setDeleteVideoStatus(false)
  },[uploadVideoStatus, deleteVideoStatus])

 

  return (
    <>
    <Row>
        { allVideo.length>0?
        allVideo.map((video)=>(<Col sm={12} lg={4} xl={3}>
          <Videocard displayVideo={video} setDeleteVideoStatus={setDeleteVideoStatus}/>
        </Col>))
          :
        <p>Nothing here</p>
        }
    </Row>
    </>
  )
}

export default View