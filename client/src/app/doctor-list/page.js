'use client'
import React, { useEffect, useState } from 'react'
import Filter from '../components/Filter'
import { DoctorCard } from '../components/DocterCard';
import Link from "next/link";
import { motion } from "framer-motion";
import { FaUserMd, FaPlus } from "react-icons/fa";
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


export default function NoDoctorsFound() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center w-full py-20 px-4 text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <FaUserMd className="text-blue-500 text-6xl mb-4" />
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-700 mb-2">No Doctors Found</h2>
      <p className="text-gray-500 max-w-md mb-6">
        We couldn't find any doctors matching your filters. You can try adjusting your search criteria or add a new doctor to the system.
      </p>

      <Link href="/add-doctor">
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl transition-all shadow">
          <FaPlus />
          Add New Doctor
        </button>
      </Link>
    </motion.div>
  );
}



export const DoctorList = () => {

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
  const [filterChanges,setFilterChanges]=useState(true)    
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

  },[filterData,filterChanges])
  return (
    <div className='flex w-full flex-col'>
        <Filter filterData={filterData} setFilterData={setFilterData}/>
        <div className="min-h-screen  py-10 px-4 flex justify-center flex-wrap  gap-2 sm:gap-4">

            {
              loading && Array(4).fill(0).map((_,index)=>(<LoadingCard key={index} className='flex-1 max-w-[200px] sm:max-w-[300px] md:max-w-[450px] min-w-[300px]' />))
            }

     {     
      !loading && doctorList && doctorList?.length>0 ? doctorList.map(doctor=>{
        return (<DoctorCard key={doctor?._id}doctor={doctor} />)
      }):<NoDoctorsFound/> }
      

    </div>
    </div>
  )
}

