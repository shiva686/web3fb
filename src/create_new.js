import React , {useState , useEffect} from 'react';
import './create_new.scss';
import image from './profile/image.png'
import Cookies from 'universal-cookie';
import axios from 'axios';
import backend from './backend_domain'
const Create = ()=>{

  const [picimage , change_image] = useState(image)
  const [response , Change_Response] = useState(false);
  const [title , ctitle] = useState('title');
  const [description , cdescription] = useState('description');
  const cookies = new Cookies();
  const [myfile , cmyfile] = useState('');
  let data = {
     token:cookies.get('session')
   }
  useEffect(()=>{
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

  });
  const selectimg = ()=>{
  	 const file = document.getElementsByClassName('myfiles');
  	 file[0].click();
  	 file[0].addEventListener('change' , (e)=>{
  	 const changefile = e.target.files[0]
     if(changefile != null)
     {    
       cmyfile(changefile)
     const render = new FileReader();
     render.readAsDataURL(changefile);
     render.addEventListener('load' , (e)=>{
          change_image(render.result);
     });
    }
  	 });
  }
  const upload = (status)=>{
   let dat = new FormData();
   dat.set('title', title);
   dat.set('description',description);
   dat.set('status',status);
   dat.set('token',cookies.get('session'));
   dat.append('myfile', myfile);
   axios({
     method: 'post',
     url:backend+'addpost',
     headers: {'Content-Type': 'multipart/form-data' },
     data:dat
   })
   .then(res =>{
       const redirect = window.location.origin + '/dashboard';
        window.location.replace(redirect);
   });
  }
  if(response){
   return( 
   	<>
      <div className = "container ">
       <div className = "row">
       <h3 className = 'text-capitalize font-weight-bold text-center'>blog world</h3>
       <div className ="col-md-9 center">
        <form>
            <label className = "text-capitalize font-weight-bold">title</label>
            <br/>
            <input onChange ={(e)=>ctitle(e.target.value)} type = "text" className = "title_" required />
            <br/>
            <label className = "pickimage text-center font-weight-bold">pickimage</label>
            <br/>
            <div className = "center_">
            <a><img onClick={selectimg} className = " home_pic1 resize" src={picimage}/></a>
            </div>
            <input id="myfile" className = "myfiles" type="file"/>
            <br/>
            <label className = "discription font-weight-bold"> discription</label>
            <br/>
            <textarea onChange ={(e)=>cdescription(e.target.value)} className = "content_description" required/>
        </form>
        </div>
        <div className = "col-md-3 postion_">
           <a onClick = {()=>upload('publish')} className = "btn btn-primary __btn_">publish</a>
           <a onClick = {() =>upload('draft')}className = "btn btn-primary __btn_">draft</a>
        </div>
        </div>
      </div>
   	</>
   	)
 }
 else {
 	return(<> </>)
 }
}
export default Create;