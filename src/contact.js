import React , {useState , useEffect } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import Profile from './profile/profile_pic.png';
import Navbar from './navigation'
import './contact.scss'
import backend from './backend_domain'
const Contact =()=>{
   
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
        console.log(res.data);
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
       <div className ="row">
         <div className ="col-md-6 ">
            <form>
             <label className = "font-weight-bold text-capitalize">name</label>
             <br/>
             <input type="text"/>
             <br/>
             <label className = "font-weight-bold text-capitalize">email</label>
             <br/>
             <input type="email"/>
             <br/>
             <label className = "font-weight-bold text-capitalize">feedback</label>
             <br/>
             <textarea className ="textarea" type="textarea"/>
             <br/>
             <a className="btn btn-primary" >submit</a>
            </form>
         </div>
         <div className ="col-md-6 _padding">
            <h3 className ="font-weight-bold">contact me </h3>
            <br/>
            <h5 className ="font-weight-bold">email : </h5> <p>{email}</p>
            <h5 className ="font-weight-bold">contact number: </h5><p>{contact}</p>
         </div>
       </div>
    </div>
    )
}

export default Contact;