
'use client'
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FaUserMd,
  FaMapMarkerAlt,
  FaStethoscope,
  FaMoneyBillWave,
} from "react-icons/fa";

export const DoctorCard = ({ doctor }) => {
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
      className="bg-white   rounded-3xl overflow-hidden w-full max-w-sm cursor-pointer will-change-transform transform transition p-2 flex flex-wrap max-h-[300px]  min-w-[200px] sm:min-w-[300px]"
    >
        <span className="flex items-center gap-2 flex-wrap">
             <Image
        src={doctor.image || "doctor-placeholder.jpg"}
        width={50}
        height={50}
        
        alt={doctor.name || "doctor image"}
        className="size-[80px]  rounded-full "
      />
    
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
     
      <div className="p-5 space-y-2">
        
        <p className="flex items-center gap-2 text-gray-600">
          <FaMapMarkerAlt className="text-blue-500" />
          {doctor.location}
        </p>
        <p className="flex items-center gap-2 text-gray-600">
          🗓️ {doctor.experience} years experience
        </p>
        <p className="flex items-center gap-2 text-green-600 font-semibold">
          <FaMoneyBillWave />
          ₹{doctor.fee}
        </p>
      </div>
    </motion.div>
  );
}
