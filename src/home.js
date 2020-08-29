import React , {useEffect , useState} from 'react';
import './home.scss'
import axios from 'axios'
import Cookies from 'universal-cookie';
import Navbar from './navigation'
import Full_blog from './full_blog'
import photo from './profile/image.png'
import backend from './backend_domain'
const Home = ()=>{

  const [ull_blog , change_blog] = useState(false);

  const [pos , cpos]=useState({})
  useEffect(()=>{
  	const cookies = new Cookies();
    let data = {
     token:cookies.get('session')
    }
    axios.get(backend+'getposts',{data})
       .then(res =>{
          cpos(res.data)
       })
   },[]);
   const arrow = (side)=>{
   let scrollx = document.getElementsByClassName('flexd_pic')
     let scrollAmount = 0;
     let distance = 900;
     let step = 10
     if(side == 'left')
     {
    var slideTimer =  setInterval(function(){
        scrollx[0].scrollLeft -= step;
        scrollAmount += step;
        if(scrollAmount >= distance){
            window.clearInterval(slideTimer);
        }
      }, 20);
        
     }
     else
     {  
      var slideTimer =   setInterval(function(){
        scrollx[0].scrollLeft += step;
        scrollAmount += step;
        if(scrollAmount >= distance){
            window.clearInterval(slideTimer);
        }
      }, 20);
     }

   
 }
   const [title, chagne_title]=useState('title');
   const [description , change_description]=useState('description');
   const [imageurl , change_imageurl]=useState(photo)
   const blog =(value)=>{
     chagne_title(value.title);
     change_description(value.description);
     change_imageurl(backend+ value.imageurl);
     change_blog(true);


   }
   const blog_ =(value)=>{
    chagne_title(pos[0].title);
     change_description(pos[0].description);
     change_imageurl(backend+ pos[0].imageurl);
     change_blog(true);

   }
  if(pos.length != 0 && pos.length != undefined){
  
  if(!ull_blog){
  return(
		<>
		 <div className = "container-fluid">
          <h1 className ="font-weight-bold text-center text-capitalize">leatest post</h1>
          <div className ="row">
          	 <div className="col-md-10">
          	 	 {
                <div>
                 <div className="flex_pic">
                  <img onClick={blog_} className = "home_pic0" src ={backend+ pos[0].imageurl}/>
                </div>
                  <p onClick={blog_} className=" p text-center text-capitalize font-weight-bold">{pos[0].title}</p>
                </div>
               }
          	 </div>
          	 <div className="col-md-2">
          	 	
          	 </div>
          </div>
             <div>
                 <div className="flexd_pic flex-row flex-nowrap">
                  <a onClick={()=>{arrow('left')}} className ="btn-left btn btn-dark">{'<'}</a>
                  {
                    pos.map((value , index)=>{
                      if(index == 0){
                        return ;
                      }
                      return( 
                  <div key={index} className ="padding">
                  <img onClick={()=>blog(value)} className = "home_picd" src ={backend+ value.imageurl}/>
                  <p onClick={()=>blog(value)} className="text-capitalize font-weight-bold">{value.title}</p>
                  </div>)
                    })
                  }
                  <a onClick={()=>{arrow('right')}} className ="btn-right btn btn-dark">{'>'}</a>
                </div>
                </div>
        </div>
		</>);
  }else{
     return(<><Full_blog title={title} description={description} image={imageurl}/></>)
   }
  }
  else
  {
    return(
    <>
    <p>loading</p>
    </>)
  }
}
export default Home;