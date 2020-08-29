import React ,{useEffect , useState} from 'react';
import './addpost.scss';
import Common from './comon_for_post_and_page'
import axios from 'axios';
import Cookies from 'universal-cookie';
import backend from './backend_domain'
const Post = ()=>{
   const id = 'name'
   const deletePost = [];
   const notdelete = [];
   const [pos  , cpos] = useState({})
   const cookies = new Cookies();
   let data = {
     token:cookies.get('session')
   }
  const [once , conce]= useState(true);
  const loadonce = ()=>{
    if(once){
    axios.get(backend+'getposts',{data})
       .then(res =>{
          cpos(res.data)
       })
     }
    conce(false);
   }
   useEffect(()=>{
    loadonce()
   });
   let sleep = 500
   let clicked = 0;
   const delet_blog =()=>{
         clicked++;
        setTimeout(()=>{
         let data = []
         let checkerlenght = document.getElementsByClassName('selectallcheckbox');
         for(let i=0; i<checkerlenght.length; i++){
            if(checkerlenght[i].checked)
            {
              data.push(checkerlenght[i].value)
            }
         }
         if(data != null){
         axios.post(backend+'deletePost',{data}).then(res=>{
            window.location.reload();
         })
        }
       
        },sleep)
         
   }
   const selectall_ = (e)=>{
      if(e.target.checked){
        let checkerlenght = document.getElementsByClassName('selectallcheckbox');
         for(let i=0; i<checkerlenght.length; i++){
            checkerlenght[i].checked = true;
         }
      }
      else{
          let checkerlenght = document.getElementsByClassName('selectallcheckbox');
         for(let i=0; i<checkerlenght.length; i++){
            checkerlenght[i].checked = false;
         }
      }
   }
  

  const load_entries = ()=>{
   
  }
   return(
  	 <>
  	  <Common dele={delet_blog} selectall={selectall_} />
  	  <div className = 'post_and_pages_tit'>
        {
       pos.length != undefined?(pos.map((value , index)=>{
           return(
           <div key = {value.id} className ='selectall'>
           <input className ="selectallcheckbox" value = {value.id} type='checkbox' />
           <p className = "title">{value.title}</p>
           </div>
           )
         })):null  
       } 
      </div>
  	</>
  	);
}
export default Post;