import React from 'react';
import'./full_blog.scss'
const Full_blog = (props)=>{
	return(
		<>
		<div className="container">
		  <div>
            <h4 className="text-center text-capitalize">{props.title}</h4>
            <div className="flex">
            <img className="img_" src={props.image}/>
            </div>
            <p>{props.description}</p>
		  </div>
		</div>
		</>);
}
export default Full_blog;