import axios from "axios";

const addComment= (data)=>{
    const url = `/api/post/${data.postId}/comments`
    return  axios.post(url,data)
}

const getAllComments = (postId)=>{
    const url = `/api/post/${postId}/comments`
    return  axios.get(url)
}
export
{
    addComment,
    getAllComments
}
