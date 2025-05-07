import axios from "axios"
import qs from 'qs'
axios.defaults.baseURL=process.env.NEXT_PUBLIC_API_BASE_URL
export const getDoctorDetails=async(filterData)=>{
try {
    
    console.log(filterData,process.env.NEXT_PUBLIC_API_BASE_URL);
    
    
    return await axios.get("/api/doctor-detail",{
        params:filterData,
        paramsSerializer: params => qs.stringify(params, { arrayFormat: 'indices' ,  allowDots: true,
            encode: false}),
        withCredentials:true,
    })
} catch (error) {
    return error
}

}

export const postDoctorDetail=async(formData)=>{

    try {
        
        return axios.post('/api/add-doctor',formData,{
            withCredentials:true
        })
    } catch (error) {
        
        return error
    }
}