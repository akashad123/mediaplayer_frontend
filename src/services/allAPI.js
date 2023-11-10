import { commonAPI } from "./commonAPI"
import { serverURL } from "./serverURL"

// Upload video
export const uploadAllVideo = async(reqbody)=>{
    return await commonAPI('POST',`${serverURL}/videos`,reqbody)
}

// Get all video from json-server
export const getAllVideos = async()=>{
    return await commonAPI('GET',`${serverURL}/videos`,"")
}

// API to delete videos
export const deleteVideo = async(id)=>{
    return await commonAPI('DELETE',`${serverURL}/videos/${id}`,{})
}

// API to add data to watch history
export const addHistory = async(videoDetails)=>{
    return await commonAPI('POST',`${serverURL}/history`,videoDetails)
}

// API to get all history from json-server
export const getHistory = async()=>{
    return await commonAPI('GET',`${serverURL}/history`,"")
}

// API to delete history
export const deleteHistory = async(id)=>{
    return await commonAPI('DELETE',`${serverURL}/history/${id}`,{})
}

// API to add categories
export const addCategory = async(body)=>{
    return await commonAPI('POST',`${serverURL}/categories`,body)
}

// APi to get category
export const getAllCategory = async()=>{
    return await commonAPI('GET',`${serverURL}/categories`,"")
}

// API to delete category
export const deleteCategory = async(id)=>{
    return await commonAPI('DELETE',`${serverURL}/categories/${id}`,{})
}

// API to get a paricular video
export const getVideo = async(id)=>{
   return await commonAPI('GET', `${serverURL}/videos/${id}`,"")
}    

// API to update category
export const updateCategory = async(id, body)=>{
    return await commonAPI('PUT',`${serverURL}/categories/${id}`,body)
}
