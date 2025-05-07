'use client'
import React, { useEffect, useState } from 'react'
import Filter from '../components/Filter'
import { DoctorCard } from '../components/DocterCard';
import axios from 'axios';
import { getDoctorDetails } from '../services/doctor';



export function LoadingCard({className}) {
  return (
    <div className={className + " bg-white rounded-xl shadow-md p-4 w-full animate-pulse space-y-4"}>
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
          <div className="w-1/3 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="w-full h-4 bg-gray-200 rounded"></div>
      <div className="w-5/6 h-4 bg-gray-200 rounded"></div>
      <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
    </div>
  );
}


const page = () => {
  const dummyDoctor = {
    name: "Dr. Radhika Sharma",
    specialty: "Cardiologist",
    experience: 12,
    location: "New Delhi",
    fee: 1200,
    image: "https://res.cloudinary.com/demo/image/upload/v1680000000/sample.jpg",
  };

  const [loading,setLoading]=useState(false)
  const [doctorList,setDoctorList]=useState([])
  const [filterData,setFilterData]=useState({
  
          facility:[],
          consultType:[],
          experience:[],
          fee:[],
          language:[],
          sort:"available",
          page:1,
          limit:5
  
  
      })
  useEffect(()=>{
    setLoading(true)
   getDoctorDetails(filterData).then((res)=>{
    setLoading(false);
  
    setDoctorList(res?.data?.data)
    console.log(res?.data?.data)
  }
  
  ).catch((err)=>{
    setLoading(false)

  })

  },[filterData])
  return (
    <div className='flex w-full flex-col'>
        <Filter filterData={filterData} setFilterData={setFilterData}/>
        <div className="min-h-screen  py-10 px-4 flex justify-center flex-wrap  gap-2 sm:gap-4">

            {
              loading && Array(4).fill(0).map((_,index)=>(<LoadingCard key={index} className='flex-1 max-w-[200px] sm:max-w-[300px] md:max-w-[450px] min-w-[300px]' />))
            }

     {     
      doctorList && doctorList?.length>0 && doctorList.map(doctor=>{
        return (<DoctorCard key={doctor?._id}doctor={doctor} />)
      }) }
      

    </div>
    </div>
  )
}

export default page