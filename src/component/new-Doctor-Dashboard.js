import React, { Component } from "react";
import "./new-doctor-dashboard.css";
import { useState } from "react";
import {NavLink, Link, Router ,Route,Navigate} from "react-router-dom";
import axios from 'axios';
import Navbar from "./Navbar";
import background from "../background.jpeg"
class ViewPatient2 extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
        posts:[],
        originalPosts:[],
        search:"",
        DataisLoaded: false,
        id:[],
        redirect:false,
        pat_id:""
        
    };
    
    this.handle = this.handle.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleEdit = this.handleEdit.bind(this)



    const token = localStorage.getItem('token')

    if(token == null){
      window.location.href = "/"
    }
    

     
}
  async componentDidMount() {
    let doctor_id=localStorage.getItem('doc_id')
    let token=localStorage.getItem('token')
    const header = {
        "Authorization":"Bearer " + token
      }
    
  const res1 =  await axios.get(`http://127.0.0.1:8000/api/doctors/${doctor_id}/getpatients`,{
        headers:header
    }).catch((err) => {
      window.alert("Something goes wrong ! Please go to home page")
    })
    const posts = res1.data;
      console.log(posts);
      // posts.forEach(element => {
        this.setState({
            posts:posts,
            originalPosts:posts
               
            }) 
     

          // }) 
         
        
  
  } 

  handle(e) {
   this.setState({
       search:e.target.value
   })
    
    //  const filteredPatients = this.state.posts.filter((post) => post.name.toLowerCase().includes(e.target.value.toLowerCase()));
    this.setState({
        posts:this.state.originalPosts.filter((post) => post.name.toLowerCase().includes(e.target.value.toLowerCase()))
    })
  }
 async handleSearch(post){

    let doctor_id=localStorage.getItem('doc_id')
    let token=localStorage.getItem('token')
    const header = {
        "Authorization":"Bearer " + token
      }
     const res2 = await axios.get(`http://127.0.0.1:8000/api/doctors/${doctor_id}/search/${post}`,{
        headers:header
    })
      console.log(res2.data[0].id)
      this.setState({
        pat_id:res2.data[0].id
      })
      localStorage.setItem("pat_id",res2.data[0].id)
           
    this.setState({
      redirect:true
    })
    
      // posts.forEach(element => {
      //   this.setState({
      //       posts:[...this.state.posts,element.name],
               
      //       }) 
     

          // }) 

        }
       async handleClick(post){
         
           
            localStorage.setItem("pat_id",post)
                 
       
            window.location.href = "/viewdetails"
          
        }

        handleEdit(post){

          localStorage.setItem("pat_id",post)
                 
       
          window.location.href = "/editdetails"

        }





  
    render() {
      if(this.state.redirect){
        return <Navigate to="/modals" />
      }
    
  
  
      
        return (
          <div>
            <Navbar />
              
<div className="row mr-0 new4">
    <div className="col-md-5 justify-content-between align-items-center new2">
    <div class="col-12 col-md-10 col-lg-12 new">
                            <form class="card card-sm">
                                <div class="card-body row no-gutters align-items-center justify-content-between">
                                    {/* <div class="col-auto">
                                    <i class="fas fa-search h5 pt-2 pr-2 text-body"></i>
                                    </div> */}
                                    <div class="col">
                                        <input class="form-control form-control-lg form-control-borderless text-dark" type="search" placeholder="Search patients by name" onChange={this.handle}></input>
                                    </div>
                                    <div class="col-auto">
                                        <button class="btn btn-lg btn-success fas fa-search " type="submit"></button>
                                    </div>
                                </div>
                                
                            </form>
                            
                        </div>
                        

        
    </div>
    <div className="col-md-6 p-0 mt-3 new3">
{this.state.posts.map ((post,index) =>   
    <div class="job-box d-md-flex align-items-center mb-20 card-5 p-2 rounded-lg">
                                <div class="job-left my-4 d-md-flex align-items-center flex-wrap">
                                    <div class="img-holder mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex">
                                        {post.name.slice(0,2).toUpperCase()}
                                    </div>
                                    <div class="job-content">
                                        <h5 class="text-center text-md-left">{post.name.toUpperCase()}</h5>
                                        <ul class="d-md-flex flex-wrap text-capitalize ff-open-sans">
                                            <li class="mr-md-4">
                                                <i class="zmdi zmdi-pin mr-2"></i> {post.email_id}
                                            </li>
                                            <li class="mr-md-4">
                                                <i class="zmdi zmdi-money mr-2"></i> {post.phone_number}
                                            </li>
                                            
                                        </ul>
                                    </div>
                                </div>
                                <div class="job-right my-4 flex-shrink-0">
                                          <div class="job-content right-col col-lg-3 d-flex align-items-center icons pl-5">
        <div class="">
        <i style={{cursor:'pointer'}} onClick={() => this.handleSearch(post.name)} className=" mr-3 fa fa-plus text-secondary ">
            </i>
        </div>
        <div class="">
        <i style={{cursor:'pointer'}} onClick={() => this.handleClick(post.id)} className="  mr-3 fas fa-arrow-right text-info">
            </i>
        </div>
        <div class="">
        <i style={{cursor:'pointer'}} onClick={() => this.handleEdit(post.id)} className="fas fa-user-edit text-danger">
            </i>
        </div>

       
        
      </div>
                                </div>
                            </div>
//   <div class="project" key={index}>
//     <div class="row bg-white has-shadow">
//       <div class="left-col col-lg-9 d-flex align-items-center justify-content-between">
//         <div class="project-title d-flex align-items-center">
          
//           <div class="image has-shadow"><img src={"https://www.w3schools.com/howto/img_avatar.png"} alt="..." class="img-fluid"></img></div>
//           <div key={index} class="text"><h3 class="h4">{post.name.toUpperCase()}</h3><small>name</small>
//           </div>
//         </div>
//         <div class="project-date">
//           <span class="hidden-sm-down"></span>
          
//           </div>
        
//       </div>
    //   <div class="right-col col-lg-3 d-flex align-items-center">
    //     <div class="">
    //     <i style={{cursor:'pointer'}} onClick={() => this.handleSearch(post.name)} className=" mr-3 fa fa-plus ">
    //         </i>
    //     </div>
    //     <div class="">
    //     <i style={{cursor:'pointer'}} onClick={() => this.handleClick(post.id)} className=" mr-3 fas fa-arrow-right">
    //         </i>
    //     </div>
    //     <div class="">
    //     <i style={{cursor:'pointer'}} onClick={() => this.handleEdit(post.id)} className=" fas fa-user-edit mr-2">
    //         </i>
    //     </div>

       
        
    //   </div>
//     </div>
//   </div>
 )}  
 </div>

 

</div>
</div>

  );
}
	}

export default ViewPatient2;