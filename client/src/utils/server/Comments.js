import axios from "axios";

const addComment= (data)=>{
    const url = `/api/post/${data.postId}/comments`
    return  axios.post(url,data)
        // .then(() => {
        //     handleResp("Success! you just comment")
        // })
        // .catch((err)=>{
        //     handleResp("Something went wrong, try again please.")
        // });

}
export
{
    addComment,
}
