"use client"

import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaUserMd, FaStethoscope, FaMapMarkerAlt, FaMoneyBillWave, FaCloudUploadAlt } from "react-icons/fa";
import * as z from "zod";
import { TiTick } from "react-icons/ti";
import { postDoctorDetail } from "../services/doctor";


// 🛡️ Validation Schema
const schema = z.object({
  name: z.string().min(2, "Name is required"),
  specialty: z.string().min(2, "Specialty is required"),
  experience: z.number().min(0, "Must be a valid number"),
  location: z.string().optional(),
  fee: z.number().min(0, "Fee must be a valid number"),

  consultType: z.array(z.string()).min(1, "Select at least one"),
  facility: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),
  available: z.boolean().default(true),
});


export  function AddDoctorForm() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    watch
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      specialty: "",
      experience: 0,
      location: "",
      fee: 0,
      consultType: [],
      facility: [],
      languages: [],
      available: true,
    },
  });

  const onSubmit = async (data) => {
    setMessage("Uploading...");
    try {

  
      
      const formData = new FormData();
      Object.entries(data).forEach(([key, val]) => formData.append(key, val));
      if (image) formData.append("image", image);

      await postDoctorDetail(formData).then(result=>{

      setMessage("✅ Doctor added!");
      reset();
      setImage(null);
      setPreviewUrl(null);
      }).catch((error)=>{
        return error
      })
     
    } catch (err) {
      console.error(err);
      setMessage("❌ Error adding doctor.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center p-4">
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-xl rounded-3xl p-8 max-w-2xl w-full space-y-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center text-blue-700">Add New Doctor</h2>

        <div className="flex flex-col flex-wrap gap-4">
          <InputField icon={<FaUserMd />} label="Name" error={errors.name?.message}>
            <input {...register("name")} placeholder="Doctor's Name" className="input" />
          </InputField>

          <InputField icon={<FaStethoscope />} label="Specialty" error={errors.specialty?.message}>
            <input {...register("specialty")} placeholder="Specialty" className="input" />
          </InputField>

          <InputField icon={<FaUserMd />} label="Experience" error={errors.experience?.message}>
            <input type="number" {...register("experience", { valueAsNumber: true })} className="input" />
          </InputField>

          <InputField icon={<FaMapMarkerAlt />} label="Location">
            <input {...register("location")} placeholder="Location" className="input" />
          </InputField>

          {/* Consult Type */}
<InputField  label="Consultation Type" className={""}>
  <select {...register("consultType")} multiple className="input max-h-[100px]">
    
    {
      [{value:'online',title:"online"},{value:'hospital',title:"Hospital"}].map((item,index)=>{
        return(
          <option key={index}  className="p-2 cursor-pointer hover:text-slate-200 flex mt-1 items-center justify-between capitalize hover:bg-gray-600 rounded-md" value={item.value}>{item.title} {register("consultType").name} {watch("consultType")?.includes(item?.value) && <TiTick />}  </option>
        )
      })
    }
 
  </select>
</InputField>

{/* Facility */}
<InputField label="Facilities (comma separated)">
  <input
    className="input"
    placeholder="e.g. ICU, Lab, Pharmacy"
    onChange={(e) =>
      setValue("facility", e.target.value.split(",").map(f => f.trim()))
    }
  />
</InputField>

{/* Languages */}
<InputField label="Languages (comma separated)">
  <input
    className="input"
    placeholder="e.g. English, Hindi, Bengali"
    onChange={(e) =>
      setValue("languages", e.target.value.split(",").map(l => l.trim()))
    }
  />
</InputField>

{/* Availability */}
<InputField label="Available">
  <input type="checkbox" {...register("available")} />
</InputField>


          <InputField icon={<FaMoneyBillWave />} label="Consultation Fee" error={errors.fee?.message}>
            <input type="number" {...register("fee", { valueAsNumber: true })} className="input" />
          </InputField>
        </div>

        {/* 📸 Image Upload Section */}
        <div className="space-y-2">
          <label className="font-medium text-gray-700">Profile Image</label>
          <div
            className="w-full border-2 border-dashed border-blue-400 p-4 rounded-xl text-center hover:bg-blue-50 transition cursor-pointer"
            onClick={() => document.getElementById("upload").click()}
          >
            <FaCloudUploadAlt className="text-4xl text-blue-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Click to upload image</p>
            {previewUrl && (
              <img src={previewUrl} alt="Preview" className="mt-3 w-32 h-32 object-cover rounded-full mx-auto shadow" />
            )}
          </div>
          <input id="upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
        >
          Submit Doctor Details
        </button>

        {message && <p className="text-center text-sm text-blue-600">{message}</p>}
      </motion.form>
    </div>
  );
}

function InputField({ icon, label,className, children, error }) {
  return (
    <div>
      <label className={className + "flex-1 flex items-center gap-2 mb-1 text-gray-700 font-medium"}>
        {icon}
        {label}
      </label>
      {children}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}


const page = () => {
  return (
  <AddDoctorForm/>
  )
}

export default page