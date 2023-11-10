import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { addCategory, deleteCategory, getAllCategory, getVideo, updateCategory } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Videocard from './Videocard';

function Category() {

  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("")
  const [category, setCategory] = useState([])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Function to add category
  const handleAddCategory = async()=>{
      console.log(categoryName);
      if(categoryName){
        let body = {
          categoryName,
          allvideos:[]
        }
        const response = await addCategory(body)
        console.log(response);
        if(response.status>=200 && response.status<300){
          toast.success('category added successfully')
          // Get all category
          allCategory()
          // To empty the state
          setCategoryName("")
          // Close modal
          handleClose()
        }
        else{
          toast.error('Something went wrong')
        }
      }
      else{
        toast.warning('Please enter category name')
      }
  }

  // Function to get all categories
  const allCategory = async()=>{
      const {data} = await getAllCategory()
      /* console.log(data); */
      setCategory(data)
  }

  console.log(category);

  // Function to delete category
  const removeCategory =async(id)=>{
      await deleteCategory(id)
      // To get remaining category
      allCategory()
  }

  // Function to prevent reload
  const dragOver = (e)=>{
    e.preventDefault()
  }

  // Function to drop videocard to category
  const videoDrop = async(e, Categoryid)=>{
    console.log(`Category in which videocard is dropped : ${Categoryid}`);
    let videoID = e.dataTransfer.getData("videoID")
    console.log(videoID);

    // API to get a video 
    const {data} = await getVideo(videoID)
    console.log(data);

    let selectedCategory = category.find((item)=>item?.id==Categoryid)
    selectedCategory.allvideos.push(data)
    console.log(selectedCategory);

    await updateCategory(Categoryid, selectedCategory)

    allCategory()


  }

  useEffect(()=>{
    allCategory()
  },[ ])

  return (
    <>
    <div className='d-grid ms-3'>
      <button onClick={handleShow} className='btn btn-warning'>Add new category</button>
    </div>

    { category?.length>0?
        category?.map((item)=>(
          <div className='m-4 p-3 border border-secondary rounded' droppable onDragOver={(e)=>dragOver(e)} onDrop={(e)=>videoDrop(e, item?.id)}>
        <div className="d-flex justify-content-between align-items-center">
          <h6>{item.categoryName}</h6>
          <Button onClick={()=>removeCategory(item?.id)} className='btn btn-danger'><i class="fa-solid fa-trash-can"></i></Button>
        </div>

        <Row>
          <Col>
              {
                item?.allvideos.length>0?
                item?.allvideos.map((card)=>(<Videocard displayVideo={card}/>))
                :<p>Nothing here</p>
              }
          </Col>
        </Row>  

    </div>
        ))
      : <p className='fw-bolder fs-5 m-3'>Nothing here</p>
    }

    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new category</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <form className='border border-secondary rounded p-3'>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Category name</Form.Label>
            <Form.Control type="text" placeholder="Enter category name" onChange={(e)=>setCategoryName(e.target.value)}/>
          </Form.Group>
          </form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAddCategory} variant="warning">Add</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored' autoClose={3000}/>

    </>
  )
}

export default Category