import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteHistory, getHistory } from '../services/allAPI'
import { Button } from 'react-bootstrap'

function WatchHistory() {

  const [history, setHistory] = useState([])

  const WatchAllHistory = async()=>{
    const {data} = await getHistory()
    /* console.log(data); */
    setHistory(data)
  }
  console.log(history);

  // Function to remove a particular history
  const removeHistory = async(id)=>{
    await deleteHistory(id)
    WatchAllHistory() // To get the remaining history
  }

  useEffect(()=>{
    WatchAllHistory()
  },[])

  return (
 <>
      <div className='container d-flex justify-content-between'>
        <h3 className='mt-5 mb-5 text-dark'>Watch history</h3>
        
        <Link style={{textDecoration:'none', fontSize:'20px'}} to={'/Home'} className='d-flex align-items-center'> <i class="fa-solid fa-arrow-right fa-rotate-180 me-2"></i> Back to home</Link>
        </div>
        <table className='table container'>
          <thead>
            <tr>
              <th>#</th>
              <th>Caption</th>
              <th>URL</th>
              <th>Time stamp</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {history?.length>0?
              history?.map((item, index)=>(
                <tr>
                  <td>{index+1}</td>
                  <td>{item.caption}</td>
                  <td><a href={item.embedLink} target='_blank'>{item.embedLink}</a></td>
                  <td>{item.timestamp}</td>
                  <td><Button onClick={()=>removeHistory(item?.id)} className='btn btn-danger'><i class="fa-solid fa-trash-can"></i></Button></td>
                </tr>
              ))
              :
            <p className='fw-bolder fs-5 mt-4'>Nothing here</p>
            }
          </tbody>
        </table>
 </>
  )
}

export default WatchHistory