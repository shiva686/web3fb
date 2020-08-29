import React , {useState , useEffect } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import Profile from './profile/profile_pic.png';
import Navbar from './navigation'
import './fabout.scss'
import backend from './backend_domain'
const Fabout =()=>{
   
    const [myimage , chage_myimage] = useState(Profile);
   const cookies = new Cookies();
   const [name , cname]=useState('name')
   const [email , cemail] = useState('email')
  const [contact , ccontact] = useState('contact')
  const [about , cabout] = useState('about')

	useEffect(()=>{

    axios.get(backend+"retriveabout" )
    .then(res=>{
       if(res.data != "" )
      {
       if(res.data !=undefined)
        {
        let data = res.data
        cname(data.name);
        cemail(data.email);
        ccontact(data.contact);
        cabout(data.about);
        chage_myimage(backend+data.profile_pic);
       }
      }
     }).catch(e=>{
      console.log(e)
     });
	},[])

	return(
    <div className = "container">
       <div className ="row _padding">
         <div className ="col-md-3">
           <img className = "profile_pic" src ={myimage}/>
         </div>
         <div className ="col-md-6">
           <h3 className ="font-weight-bold  text-capitalize">{name}</h3>
           <p>{about}</p>
         </div>
       </div>
    </div>
    )
}

export default Fabout;