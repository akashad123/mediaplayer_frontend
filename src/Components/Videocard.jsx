import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { addHistory, deleteVideo } from '../services/allAPI'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';



function Videocard({displayVideo, setDeleteVideoStatus}) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = async() => {
    
    setShow(true)
    const {caption, embedLink} = displayVideo
    const today = new Date()
    let timestamp = new Intl.DateTimeFormat('en-GB',{year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit', second:'2-digit'}).format(today)

    let videoDetails = {
      caption, embedLink, timestamp
    }

    const response = await addHistory(videoDetails) 
    console.log(response);
  };

  const removeVideo = async(id)=>{
    const response = await deleteVideo(id)
    setDeleteVideoStatus(true)
  }

  // Function to drag a particulaar card
  const dragStart = (e,id)=>{
    console.log(`Dragged card is ${id}`);
    // To transfer id from videocard to category
    e.dataTransfer.setData("videoID",id)
  }

  return (
    <>
    <Card style={{ width: '100%', height:'350px' }} className='mb-4' draggable onDragStart={(e)=>dragStart(e,displayVideo?.id)}>
      <Card.Img onClick={handleShow} height={'280px'} variant="top" src={displayVideo.url}/>
      <Card.Body>
        <Card.Title className='d-flex justify-content-between align-items-center'>
            <h6>{displayVideo.caption}</h6>
            <Button onClick={()=>removeVideo(displayVideo?.id)} className='btn btn-danger'><i class="fa-solid fa-trash-can"></i></Button>
        </Card.Title>
      </Card.Body>
    </Card> 

    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{displayVideo.caption}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <iframe width="100%" height="500" src={`${displayVideo.embedLink}?autoplay=1`} title={displayVideo.caption} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </Modal.Body>
    </Modal>

    </>
  )
}

export default Videocard