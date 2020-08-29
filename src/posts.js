import React , {useEffect,useState} from 'react';
import axios from 'axios';
import './posts.scss'
import Navbar from './navigation'
import photo from './profile/image.png'
import Full_blog from './full_blog'
import backend from './backend_domain'

const Posts =()=>{

const [ull_blog , change_blog] = useState(false);

const [pos , cpos]=useState({})
	useEffect(()=>{
       axios.get(backend+'allgetposts')
       .then(res =>{
          cpos(res.data)
       })
	},[])
   const [title, chagne_title]=useState('title');
   const [description , change_description]=useState('description');
   const [imageurl , change_imageurl]=useState(photo)
   const blog =(value)=>{
     chagne_title(value.title);
     change_description(value.description);
     change_imageurl(backend+ value.imageurl);
     change_blog(true);


   }
 if(pos.length != 0 && pos.length != undefined && pos !=null){
   if(!ull_blog){
   return(
   	 <>
      <div className =" container __padding">
      <h1 className ="text-capitalize text-center">all posts</h1>
      {
      	pos.map((value , index)=>{
          return(
          	<div key = {index}>
          	    <div className ="padding__ ">
          	      <img onClick={()=>blog(value)} className = "home_picd" src ={backend+ value.imageurl}/>
                   <p onClick={()=>blog(value)} className="_padding text-capitalize font-weight-bold">{value.title}</p>
                 </div>
                 <br/>
          	</div>)
      	})
      }
      </div>
   	</>);
  }else{
       return(<><Full_blog title={title} description={description} image={imageurl}/></>)
  }
 }else{
 	return(
 	<>
 	 <p>loading</p>
 	</>)
 }
}
export default Posts;