import React , {useEffect , useState} from 'react';
import './dashbord.scss';
import Post from './addpost';
import About from './about';
import Setting from './settings'
import Cookies from 'universal-cookie';
import axios from 'axios';
import backend from './backend_domain'
const Dashboard = () =>{
    
   const cookies = new Cookies();
   const [blogname , cblogname] = useState('blog');
   
   const [response , Change_Response] = useState(false);
   const [dashboard_content , change_dashboard_content] = useState(<Post/>)
   
   let checked = true;
   let data = {
     token:cookies.get('session')
   }

   const auth = ()=>{
      let width = document.getElementById('co')
      if(width !=  null){
         let wit = width.offsetWidth;
         cwidth(wit)
      }
     if(checked){
     axios.post(backend+'auth',{data})
     .then((res) =>{
           if(res.status != 200){
             Change_Response(false);
             const redirect = window.location.origin + '/';
             window.location.replace(redirect);
             
           }   
           else{
              Change_Response(true);
           }
     }).catch(res => {
           Change_Response(false);
           const redirect = window.location.origin + '/';
           window.location.replace(redirect);
     });
      checked = false;
      }
   }
    window.addEventListener('resize', ()=>{
       let width = document.getElementById('co')
      if(width !=  null){
         let wit = width.offsetWidth;
         cwidth(wit)
      }
     });
   const [width , cwidth] = useState('20px')
  
      useEffect(()=>{
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



       auth();
      let navlink = document.getElementsByClassName('nav-list');
      let lenght = navlink.length;
      for(let i = 0; i <lenght; i++ )
      {
         navlink[i].addEventListener('click' , ()=>{

             let current = document.getElementsByClassName('active');
             let length  = current.length;
                 for(let i = 0; i<length; i++){
                  current[i].classList.remove('active');
                 }
                 navlink[i].classList.add('active');
            });

      }

   });
   const dashboard_ ={
     'post':<Post/>,
     'about':<About/>,
     'setting':<Setting/>,
   }
   const pages =[
     'post',
     'about',
     'setting',
   ]
   const icons ={
     'post':<i className="fa fa-file-o" aria-hidden="true"></i> ,
     'page':<i className="fa fa-file-text-o" aria-hidden="true"></i> ,
     'earnings':<i className="fa fa-usd" aria-hidden="true"></i> ,
     'about':<i className="fa fa-user" aria-hidden="true"></i> ,
     'setting': <i className="fa fa-cog" aria-hidden="true"></i>,
              
   }

   const change_dashboard_ = (value)=>{
             change_dashboard_content(dashboard_[value])
   }
   const logout = ()=>{
      cookies.remove('session');
      const redirect = window.location.origin + '/';
      window.location.replace(redirect);

   }

  const bar =(e)=>{
   
  }
  if(response){
   return(
    <>
     <div className = "block__">
      <div className = '__positon _pbut'>
        <h1 className = "text-capitalize text-center">{blogname}</h1>
      </div>
      <div className = "postion-fixed">
      <div className ="row ">
        <div id ="co" className ="col-md-2 dashboard_content">
         <div className="positon__" style ={{ width:width}}>
          <h4 className = "dashboard_content_title " >Dashboard</h4>
           <i onClick={bar} className="fa fa-bars color" aria-hidden="true"></i>         
            <ul className = " page_routs _list">
               { 
                 pages.map((value , index)=>{
                    return(
                      <li key={value} onClick ={()=>change_dashboard_(value)} className = 'nav-list nav-lists'>
                      <div className ="icons">
                      {icons[value]}
                      </div>
                      {value}
                      </li>
               )})
               }
               <li onClick ={logout} className = 'nav-list'>
                  <div className ="icons">
                   <i className="fa fa-sign-out" aria-hidden="true"></i>
                  </div>
                  logout
               </li>
            </ul>
            </div>
        </div> 
        <div className = "col-md-9 _page_rout_content  _dashboard_content">
           {dashboard_content}
        </div>
      </div>
      </div>
      </div>
    </>
   	);
  }
  else{
    return (<></>);
  }
}
export default Dashboard;