
'use client'
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FaUserMd,
  FaMapMarkerAlt,
  FaStethoscope,
  FaMoneyBillWave,
  FaLocationArrow,
} from "react-icons/fa";
import { SiTaichilang } from "react-icons/si";
import { MdMiscellaneousServices } from "react-icons/md";

 const DoctorCard = ({ doctor }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",y:-10 }}
      transition={{
        type: "tween", // smoother than spring for UI
        ease: "easeInOut",
        duration: 0.3,
      }}
      style={{
        transformStyle: "preserve-3d", // Optional but helps smoothness
        backfaceVisibility: "hidden",
      }}
      className="bg-white capitalize  rounded-3xl overflow-hidden w-full max-w-sm cursor-pointer will-change-transform transform transition p-2 flex flex-col justify-around place-items-stretch max-h-[300px]  flex-1 min-w-[200px] sm:min-w-[300px] lg:min-w-[500px] lg:px-10"
    >
        <span className="flex items-center gap-2 flex-wrap">

          <span className="relative size-[80px]">
          <Image
        src={doctor.image || "doctor-placeholder.jpg"}
        // width={50}
        // height={50}
      loading="lazy"
        layout="fill"
        objectFit="fill"
        // placeholder="blur" 
        alt={doctor.name || "doctor image"}
        className="size-[100px] relative  rounded-full "
      />
      <p className={`absolute bottom-0 right-3 size-3 z-20 ${doctor?.available?'bg-green-400':'bg-red-400' } rounded-full `} ></p>
          </span>
             
    
    <span className="">
    <h3 className="text-xl font-bold text-blue-700 flex items-center gap-2">
          <FaUserMd />
          {doctor.name}
        </h3>
        <p className="flex items-center gap-2 text-gray-600">
          <FaStethoscope className="text-blue-500" />
          {doctor.specialty}
        </p>
    </span>
        </span>
     
      <div className="p-4 grid grid-cols-2 gap-2">
        
        <p className="flex flex-1 items-center gap-2 text-gray-600">
          <FaMapMarkerAlt className="text-blue-500" />
          {doctor.location}
        </p>
        <p className="flex shrink  w-full text-gray-600">
          🗓️ {doctor.experience} years 
        </p>
        <p className="flex items-center gap-2 text-green-600 font-semibold">
          <FaMoneyBillWave />
          ₹{doctor.fee}
        </p>

      { doctor && doctor?.facility.length>0 &&  <p className="flex items-center gap-2 font-medium">
<MdMiscellaneousServices className="text-sky-800 text-xl"/>
{doctor?.facility?.join(",")}
        </p>}

        { doctor?.languages && doctor?.languages?.length>0 &&  <p className="flex items-center gap-2 font-medium">


<SiTaichilang className="text-sky-800 text-md"/>

{doctor?.languages?.join(',')}
        </p>}
      </div>

      <div className="flex">
        <button type="button" onClick={()=>alert("✅ Booked your slot")} className="p-2 bg-violet-700 rounded-md flex-1 text-slate-300 hover:bg-violet-500 cursor-pointer hover:text-slate-100">Book for {doctor?.consultType}</button>
      </div>
    </motion.div>
  );
}

export default DoctorCard
