import React ,{useState , useEffect}from 'react';
import './login.scss';
import { NavLink ,Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';
import backend from './backend_domain'
const Login = ()=>{

  const [response , Change_Response] = useState(false);
	const [email , cemail] = useState('example1234@gmail.com');
	const [pass , cpass] = useState('password');
  const [auth , cauth] = useState(true)
  const [blog_name ,cblogname ] = useState('')
  let _token; 
  let getautn = true;
   const cookies = new Cookies();
      const data = {
       token:cookies.get('session')
      }
 const token = ()=>{
   if(getautn){
    axios.post(backend+'accesstoken')
    .then(res =>{
      _token = res.data;
       
       return _token
    });
    getautn = false;    
   }
 };
 useEffect(()=>{
   token();
    let blogname =""
    axios.post(backend+'retriveblog',{data}).then(res =>{
      if(res.data != undefined){
        blogname = res.data.blog_name;
        cblogname(blogname)
      }
    }).catch(e=>alert("something went wrong"));

 })
 const submit =  ()=>{
    let onetime = true
   let data = {
      email: email,
      password:pass,
      token:_token,
    }

    axios.post(backend+'login',{data}).then(res =>{
      if(res.status == 200){
        cauth(true);
        let origin = window.location.origin
        let Redirect = origin + '/dashboard';
        cookies.set('session' , res.data ,{ path: '/',  })
        window.location.replace(Redirect);
      }
      else{
        cauth(false);
      }
    })
    .catch(e =>{
      cauth(false);
    })


     
  }
  // if(response){
  return(
  	<>
  	 <div></div>
  	<a className ="blog" href="#"><h1 className = "text-center text-capitalize">{blog_name}</h1></a>
  	 {
       auth?null:(<div className = "swrong">
  	    <div className = "bg-danger somthing">
  	    <i className="fa fa-exclamation-triangle tri" aria-hidden="true"></i>
  	    <p>email or password is incorrect</p>
  	    </div>
  	    </div>)
    }
  	 <div className = "login_form">
  	 	<form className = "_form" >
  	 		<label className = "lemail text-capitalize font-weight-bold">email</label>
  	 		<br/>
  	 		<input type="email" name="email" value={email} onChange={(e) => cemail(e.target.value)} className = "email"/>
  	 		<br/>
  	 		<br/>
  	 		<label className = "lpassword text-capitalize font-weight-bold">password</label>
  	 		<br/>
  	 		<input type="password" name="email" value={pass} onChange={(e) => cpass(e.target.value)} className = "password"/>
  	 		<br/>
  	 		<br/>
  	 		<button type ="button" className="btn-primary btn" onClick={submit} >submit</button>
  	 	</form>
  	 </div>
  	</>
  	);
  // }
  // else{
  //   return(<> </>)
  // }
}

export default Login;