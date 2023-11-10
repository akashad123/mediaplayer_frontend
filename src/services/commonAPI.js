import axios from "axios"

export const commonAPI = async (httpMethod, url, reqBody)=>{
    let reqConfig = {

        method: httpMethod,
        url,                                    // If key and value are same, then only one is to be specified (url:url--->X, url)
        data: reqBody,
        headers: {
            "Content-Type":"application/json"   // If the content is available on the internet, then Content-Type is application/json,
                                                // if not then Content-Type is multipart/form-data 
        }
    }
    return await axios(reqConfig).then((result)=>{
        return result
    }).catch((err)=>{
        return err
    })
}
