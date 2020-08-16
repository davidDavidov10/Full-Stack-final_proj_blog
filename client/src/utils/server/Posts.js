import axios from "axios";

const getAllPosts = () =>{
    const url = "/api/posts"
    return  axios.get(url)

}

const getAllPostsByUser=()=>{
    const url = `/api/user/posts`
    return  axios.get(url)

}

const getPost=(postId)=> {
    const url = `/api/post/${postId}`
    return axios.get(url)

}

const addNewPost=(data) =>{
    const url = "/api/posts"
    return axios.post(url,data)

}

const editPost=(post)=>{
    const url = `/api/post/${post.id}`
   return  axios.post(url,post)

}

const deletePost=(post)=>{
    const url = `/api/post/${post.id}`
    return axios.delete(url)

}

const changePostPhase=(post)=>{
    const url =`/api/post/${post.id}/phases`
    return axios.post(url)

}
const searchPosts=(wordToSearch)=>{
    const url =`/api/postSearch/${wordToSearch}`
    return axios.get(url)
}


export
{
    getAllPosts,
    getPost,
    getAllPostsByUser,
    addNewPost,
    editPost,
    deletePost,
    changePostPhase,
    searchPosts,

}