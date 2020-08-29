import React  , {useState} from 'react';
import './comon_for_post_and_page.scss'
import Create from './create_new'
import backend from './backend_domain'
const Common = (props)=>{

  const change_re = ()=>{
    let Redirect = window.location.origin + '/create';
     window.location.replace(Redirect);
  }
   return(
     <>
      <div className = 'selectall'>
        <div className = 'selection'>
        <input onClick={(e)=>{props.selectall(e)}} className ="selectallcheckbox" type='checkbox' />
        <label className = "select text-capitalize">selectall</label>
        <button onClick={change_re} className = "btn btn-custom font-weight-bold create text-capitalize">create</button>
        <button onClick={(e)=>props.dele(e)} className ="select btn_custom_ btn_custom_ btn text-capitalize font-weight-bold"><i className="fa fa-trash-o" aria-hidden="true"></i></button>
        </div>
        <div className = 'custom_form'>
          <input className ="search" type='text'/>
          <button className ="btn btn-custom"  type="submit"><i className="fa fa-search"></i></button>
        </div>
      </div>
    </>
    );

}
export default Common;