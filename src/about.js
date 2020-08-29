import React , {useState , useEffect } from 'react';
import './about.scss';
import Profile from './profile/profile_pic.png';
import axios from 'axios';
import Cookies from 'universal-cookie';
import backend from './backend_domain'
const About =()=>{

  const cookies = new Cookies();
  const [myimage , chage_myimage] = useState(Profile);
  const [name , cname] = useState('name')
  const [email , cemail] = useState('email')
  const [contact , ccontact] = useState('contact')
  const [about , cabout] = useState('about')
  const file = document.getElementsByClassName('myfile');
  const [myfile , cmyfile]= useState('')
 
   
  const select_img = ()=>{
     file[0].click();
  }

  useEffect(()=>{
   file[0].addEventListener('change' , (e)=>{
      if(e.target.files[0] != null){
         const changefile = e.target.files[0]
         if(changefile != null){
          cmyfile(e.target.files[0])
         const render = new FileReader()
         render.readAsDataURL(changefile)
         render.addEventListener('load' , (e)=>{
            chage_myimage(render.result);
         })
       }
         
      }

     })
    let data = {
     token:cookies.get('session'),
    }
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
  
  

  const submit_about = ()=>{
 if(name != "" && email != "" && contact != "" , about !=""){
   let dat = new FormData();
    dat.set('token',cookies.get('session'));
    dat.set('name',name);
    dat.set('email',email);
    dat.set('contact',contact);
    dat.set('about',about);
    dat.append('myfile', myfile);
     axios({
     method: 'post',
     url:backend+'about',
     headers: {
       'Content-Type': 'multipart/form-data' },
     data:dat
     }).then(res=>{
        alert("informatio updated");
     }).catch(e=>alert("something went wrong"));
  }
 }
	return(
        <>
          <div className ="container _padding ">
          	 <h6 className= "text-center text-capitalize m-t-1">this information will be show in website</h6>
          <div className ="row">
             <div className = "col-md-4 imageupload">
                <img className = "myimage" onClick={select_img} src={myimage} />
                 <input  className ="myfile" type="file"/>
             </div>
             <div className = "col-md-6 block">
                <label className = "text-capitalize font-weight-bold">name</label>
                <br/>
                <input value={name} onChange={(e)=>cname(e.target.value)}  type = 'text'  className = 'name'/>
                 <br/>
                <label className = "text-capitalize font-weight-bold">email</label>
                 <br/>
                <input value={email} onChange={(e)=>cemail(e.target.value)} type = 'email'  className = 'name'/>
                 <br/>
                <label className = "text-capitalize font-weight-bold">contact number</label>
                 <br/>
                <input value={contact} onChange={(e)=>ccontact(e.target.value)} type = 'contactnumber'  className = 'name'/>
                 <br/>
                <label className = "text-capitalize font-weight-bold">about</label>
                 <br/>
                <textarea value={about} onChange={(e)=>cabout(e.target.value)} className = "textarea"/>
                 <br/>
                <a onClick ={submit_about} className ="btn btn-primary submit_"> submit</a>
             </div>
           </div>
          </div>
        </>
		);
}

export default About;