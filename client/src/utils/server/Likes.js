import axios from "axios";

const like_Post=(postId)=>{
    const url =`/api/post/${postId}/likes`
    return axios.post(url)
}

const unlike_Post=(postId)=>{
    const url =`/api/post/${postId}/likes`
    return axios.delete(url)
}


export{
    like_Post,
    unlike_Post
}