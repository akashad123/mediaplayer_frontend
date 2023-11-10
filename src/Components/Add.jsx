import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { uploadAllVideo } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Add({setUploadVideoStatus}) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [videos, setVideos] = useState({
    id:"",
    caption:"",
    url:"",
    embedLink:""
  })
  console.log(videos);

  const embedVideoLink = (e)=>{
    const {value} = e.target
    console.log(value.slice(-11));
    const link = `https://www.youtube.com/embed/${value.slice(-11)}`
    setVideos({...videos, embedLink:link})
  }

  const handleUpload = async()=>{

      const{id, caption, url, embedLink} = videos

      // If no value in input box
      if(!id || !caption || !url || !embedLink){
        toast.warning('Please fill the form')
      }
      // If value in input box
      else{
        const response = await uploadAllVideo(videos)
        console.log(response);

        if(response.status>=200 && response.status<300){
          setUploadVideoStatus(response.data)
          toast.success(`${response.data.caption} was uploaded successfully`)
          // To make state into initial value
          setVideos({
            id:"",
            caption:"",
            url:"",
            embedLink:""
          })
          handleClose() // Closes the modal
        }
        else{
          console.log(response);
          toast.error('Something went wrong, try again')  
        }
      }
  }

  return (
    <>
    <div className='d-flex align-items-center'>
      <h5>Upload new video</h5>
      <button onClick={handleShow} className='btn'><i class="fa-solid fa-cloud-arrow-up fs-5"></i></button>
    </div>
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title><i class="fa-solid fa-film"></i> Upload video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please fill the form</p>
          <form className='border border-secondary p-3 rounded'>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Enter video id" onChange={(e)=>setVideos({...videos,id:e.target.value})} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Enter video caption" onChange={(e)=>setVideos({...videos,caption:e.target.value})} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Enter video image url" onChange={(e)=>setVideos({...videos,url:e.target.value})} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Enter youtube video link" onChange={embedVideoLink} />
          </Form.Group>
                                                                                                         
          </form> 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleUpload}>Upload</Button>
        </Modal.Footer>
      </Modal>
    <ToastContainer position='top-center' theme='colored' autoClose={3000}/>
    </>
  )
}

export default Add