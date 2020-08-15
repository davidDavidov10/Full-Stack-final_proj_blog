import axios from "axios";

const addComment= (data)=>{
    const url = `/api/post/${data.postId}/comments`
    return  axios.post(url,data)
}
export
{
    addComment,
}
