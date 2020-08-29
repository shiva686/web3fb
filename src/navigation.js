import React ,{useEffect , useState} from 'react';
import {NavLink}  from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import backend from './backend_domain'
import './nav.scss';
const Navbar = () =>{
    const [blogname , cblogname] = useState('blog');
    useEffect(() =>{ 
    const cookies = new Cookies();
    const data = {
     token:cookies.get('session')
    }
    let blogname =""
    axios.post(backend+'retriveblog',{data}).then(res =>{
      if(res.data != undefined){
        blogname = res.data.blog_name;
        cblogname(blogname)
     }
    }).catch(e=>alert("something went wrong"));

    },[]);

   let iconid = ()=>{

              let bg =  document.getElementsByClassName('bg');
              let pages =  document.getElementsByClassName('pages');
              let social_media = document.getElementsByClassName('social_media');
              if(bg.length > 0){
                bg[0].classList.remove('bg');
                pages[0].classList.remove('pagevisible');
                social_media[0].classList.remove('social_mediavisible');
              }else{
                let navbar =  document.getElementsByClassName('Navbar');
                navbar[0].classList.add('bg');
                pages[0].classList.add('pagevisible');
                social_media[0].classList.add('social_mediavisible');
                
              }
    }

    let nav_style = {
      'fontWeight': 'bold',
    }
   
 	return(
		<div>
         <div className="container-flui">
             <nav id = "navbg bg-dar dash" className = 'Navbar '>  
               <a className ="blog" href="#"><h1 className = "bg-dark text-center text-capitalize blogname">{blogname}</h1></a>
                <div className = "icon_bg "><a  href ="#" onClick ={iconid} ><i className="fa fa fa-bars icon" aria-hidden="true" /></a></div>
                <div  className = "row">
                 <div id ="res" className = "col-md-10">
                  <ul className = 'pages'>
                     <li className = "nav-link text-capitalize"><NavLink exact to = "/"  activeClassName = "Nav_link" activeStyle = {nav_style}  > home </NavLink></li>
                     <li className = "nav-link text-capitalize"><NavLink exact to = "/posts"  activeClassName = "Nav_link" activeStyle = {nav_style}  > posts</NavLink></li>
                     <li className = "nav-link text-capitalize"><NavLink exact to = "/about"  activeClassName = "Nav_link" activeStyle = {nav_style}  > about</NavLink></li>
                     <li className = "nav-link text-capitalize"><NavLink exact to = "/contact"  activeClassName = "Nav_link" activeStyle = {nav_style}  > contact</NavLink></li>
                  </ul>   
                 </div>
                 <div className = "col-md-2">
                   <ul className = "social_media">
                    <li><a href ="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                    <li><a href ="#"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                    <li><a href ="#"><i className="fa fa-envelope-o" aria-hidden="true"></i></a></li>
                    <li><a href ="#"><i className="fa fa-youtube-play" aria-hidden="true"></i></a>
                    </li>
                    </ul> 
                 </div>
                 </div>       
             </nav>
         </div>
		</div>
		);
}

export default Navbar;