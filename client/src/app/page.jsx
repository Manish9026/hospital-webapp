import  DoctorList  from "./doctor-list/page";

import React from 'react'
import { getDoctorDetails } from "./services/doctor";

const page = () => {
  //  getDoctorDetails()


  // useEffect(()=>{

  // //  getDoctorDetails()
  // },[])
  return (
    <DoctorList/>

  )
}

export default page