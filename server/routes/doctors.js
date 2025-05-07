import express from 'express';
import { doctorModel } from '../models/doctor.js';
const doctorRouter=express.Router();
import qs from 'qs'
import  multer from "multer";
import { storage } from '../config/cloudinary.js';

const upload = multer({ storage });
// Add doctor
doctorRouter.post("/add-doctor", upload.single("image"), async (req, res) => {
    try {
      const { name, specialty, experience, location, fee,  
        consultType=[],
        facility=[],
        languages=[],
        available=true, } = req.body;
  
      // Basic field validation
      if (!name || !specialty || !experience) {
        return res.status(400).json({ error: "Name, specialty, and experience are required." });
      }
  
      // Cloudinary file check
      const imageUrl = req.file?.path;
      if (!imageUrl) {
        return res.status(400).json({ error: "Profile image upload failed or missing." });
      }
  
      // Create doctor
      const doctor = new doctorModel({
        name,
        specialty,
        experience,
        location,
        fee,
        image: imageUrl,
        consultType,
        languages,
        available,
        facility
      });
  
      await doctor.save();
      res.status(201).json({ message: "Doctor added successfully", doctor });
    } catch (err) {
      console.error("Add doctor error:", err.message);
      res.status(500).json({ error: "Internal server error. Please try again later." });
    }
  });
  

// List doctors with filter + pagination

// make filter query
const getFilterQurey=(filterData)=>{

  console.log(filterData);
  
  if(!filterData) return 
  const {facility,consultType,experience,fee,language}=filterData
  let query = {};

  if (facility?.length) query.facility = { $in: facility };
  if (consultType?.length) query.consultType = { $in: consultType };
  if (experience?.length) { query.$or = experience.map(({min,max} )=> {

    if(max !== null && max !== undefined && max !== ""){
      return { experience: { $gte: min, $lte: max } };
    }else{
      return { experience: { $gte: min } };
    } 
  })
}
  if (fee?.length) {

    query.$or = fee.map(({min,max}) =>{
      if(max !== null && max !== undefined && max !== ""){
        return { fee: { $gte: min, $lte: max } };
      }else{
        return { fee: { $gte: min } };
      } 
    });

  }
  if (language?.length) query.language = { $in: language };

  return query
}
// make sort query
const getSortQuery = (sort) => {
  if (!sort) return {};

  const sortOptions = {
    available: { available: -1 },
    lowToHigh: { fee: 1 },
    highToLow: { fee: -1 },
    experience: { experience: -1 },
    like: { likes: -1 },
    relevance: { _id: 1 } // fallback or relevance case
  };

  return sortOptions[sort] || { _id: 1 };
};
doctorRouter.get("/doctor-detail", async (req, res) => {
  const parsedQuery = qs.parse(req._parsedUrl.query, { allowDots: true ,depth:10});
  const { sort, page = 1, limit = 5,...filterData } =parsedQuery;
  // console.log(parsedQuery);
  
  const query =getFilterQurey(filterData);
  // console.log(JSON.stringify(query),getSortQuery(sort));
  

  try {
    const doctors = await doctorModel.find(query).sort(getSortQuery(sort))
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await doctorModel.countDocuments(query);
    res.json({ total, page: parseInt(page), data: doctors });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default doctorRouter
