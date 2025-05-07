'use client';
import React, { memo, useCallback, useState } from 'react'
import { FaAngleDown } from "react-icons/fa6";
import { IoFilter } from "react-icons/io5";
import { GiCrossMark } from "react-icons/gi";


const Filter = ({filterData,setFilterData}) => {
    const [active, setActive] = useState({
        filter: false,
        sort: true,
        status: false
    })


    const [select,setSelect]=useState("consultType");
    const FilterOpr = () => {

     const filterFields=[
            {
            select:{
                title:"Consult type",
                value:"consultType"
            },
            fields:[{
                value:"hospital",
                title:"hospital Visit"
            },
            {
                value:"online",
                title:"online Consult"
            },
        ]
        },
        {
            select:{
                title:"Experiences(In Years)",
                value:"experience"
            },
            fields:[{
                value:{min:0,max:5},
                title:"0-5"
            },
            {
                value:{min:6,max:10},
                title:"6-10"
            },

            {
                value:{min:11,max:16},
                title:"11-16"
            },
            {
                value:{min:16,max:null},
                title:"16+"
            },
        ]
        },

        {
            select:{
                title:"Fee (In Rupees)",
                value:"fee"
            },
            fields:[{
                value:{min:100,max:500},
                title:"100-500"
            },
            {
                value:{min:500,max:1000},
                title:"500-1000"
            },

            {
                value:{min:1000,max:null},
                title:"1000+"
            },
        ]
        },

        {
            select:{
                title:"Language",
                value:"language"
            },
            fields:[{
                value:"english",
                title:"English"
            },
            {
                value:"hindi",
                title:"Hindi"
            },
        ]
        },
        {
            select:{
                title:"facility",
                value:"facility"
            },
            fields:[{
                value:"hospital",
                title:"hospitals "
            },
            {
                value:"other",
                title:"Other Clinics"
            },
        ]
        },

    ]

    const onHandle=(e)=>{

        const {name,value}=e.target;      
        const parsedValue=JSON.parse(value);

        if(name=="experience" || name=="fee"){

            const {min,max}=parsedValue
            return setFilterData(prev => {
                const exists = prev[select].some(e => e.min === min && e.max === max);
                const updated = exists
                  ? prev[select].filter(e => !(e.min === min && e.max === max)) // remove
                  : [...prev[select], { min, max }]; // add
            
                return { ...prev, [select]: updated };
              });
        }

       if(filterData[select]?.find(i=>i==parsedValue)){
      
        setFilterData(prev=>({...prev,[name]: prev[name].filter(data => data !==parsedValue)}))


       }
       else{

           setFilterData(prev=>({...prev,[name]:[...prev[name],parsedValue]}))
       }
     
        
    
    }

    const RadioInput=useCallback(({checkedStatus,value,name,title,id})=>{
        
        if(name=="fee" || name=="experience")
            return (
                <label  htmlFor={id} className='flex gap-2 capitalize cursor-pointer '>
                <input type="checkbox"  checked={filterData[select].some(e => e.min === value.min && e.max === value.max)} onChange={onHandle
                } 
                id={id}
                 name={name} value={JSON.stringify(value)}  />
                <p>{title}</p>
            </label>
        )
        else
        return(
            
            <label  htmlFor={id} className='flex gap-2 capitalize cursor-pointer '>
            <input type="checkbox"  checked={filterData[select]?.find(i=>i==value)?true:false} onChange={onHandle
            } 
            id={id}
             name={name} value={JSON.stringify(value)}  />
            <p>{title}</p>
        </label>
        )
    },[select,filterData])

        return (
            <div className="flex flex-col  flex-1 h-full">

<header className='relative p-4'>
                    <h4 className='relative after:h-1 after:bg-orange-500 after:rounded-md after:absolute after:w-24 after:left-0 after:-bottom-1 '>Apply Filter </h4>
                    {/* <p className=''></p> */}
                </header>
           
           <div className="mt-8 flex flex-col flex-1 px-4  ">

            <span className="flex flex-1 gap-2">

            <span className="flex flex-col gap-2 pr-2 capitalize flex-1 border-r-2 border-slate-600 ">
                {
                    filterFields.map((item,index)=>{

                        return(
                            <span onClick={(e)=>setSelect(item.select.value)} className={`${select==item.select?.value && "bg-slate-200"} p-2 rounded-md hover:bg-gray-600 cursor-pointer hover:text-slate-200 transition ease duration-500`} key={index}>{item?.select.title}</span>
                        )

                    })
                }
            </span>
            <span className="flex-1">
                {
        
filterFields.filter(item=>item?.select.value==select).map((item,indx)=>{

   return item?.fields.map((detail,index)=>{
        
        return(

            <RadioInput  key={index} id={JSON.stringify(detail?.value) + index} name={item.select.value} value={detail?.value} title={detail.title}/>
        )
    })
    
})
                }
            </span>

            </span>

           <div className="btn flex flex-1 gap-2 max-h-[100px]">

<button onClick={()=>console.log( filterFields.filter(item=>item?.select.value==select))
} type="button" className=' transition ease duration-500 flex-1 border-1 p-2 rounded-lg active:scale-90 will-change-transform cursor-pointer border-sky-900 text-slate-200 max-h-[40px]'>
cancel
</button>

<button  onClick={()=>console.log(filterData)} type="button" className=' transition ease duration-500 flex-1 border-1 p-2 rounded-lg active:scale-90 will-change-transform cursor-pointer border-sky-900 text-slate-200 max-h-[40px]'>
apply
</button>
</div>
           </div>
            </div>
        )
    }
    const Sort = () => {
        const options = [{ title: 'Relevance', value: "relevance" },
        { title: 'Availability', value: "available" },
        { title: 'Nearby', value: "nearby" },
        { title: 'Price - low to high', value: "lowToHigh" },
        { title: 'Price - High to low', value: "highToLow" },
        { title: 'Years of Experience', value: "experience" },
        { title: 'Most Liked', value: "like" }]
        return (
            <div className="p-4 pt-8 flex flex-col g">

                <header className='relative'>
                    <h4 className='relative after:h-1 after:bg-orange-500 after:rounded-md after:absolute after:w-16 after:left-0 after:-bottom-1 '>Sort By </h4>
                    {/* <p className=''></p> */}
                </header>

                <span className='flex mt-6 flex-col gap-2'>
                    {
                        options?.map((item, index) => {

                            return (

                                <label key={index} htmlFor={"sort" + index} className='flex gap-2 cursor-pointer transition ease duration-700 items-center has-checked:bg-indigo-50 has-checked:text-indigo-900 has-checked:ring-indigo-200 p-2 rounded-md hover:bg-slate-100'>
                                    <input type="radio" className='cursor-pointer checked:border-indigo-500 '
                                    checked={filterData?.sort==item?.value}
                                    onChange={(e)=>setFilterData(prev=>({...prev,sort:e.target.value}))} name="sort" value={item?.value} id={"sort" + index} />

                                    {item?.title}
                                </label>

                            )
                        })
                    }

                </span>
            </div>
        )
    }

   
    return (
        <div className="w-full">

            <div className='flex padding-px py-2 w-full items-center border-b-1 border-t-1 gap-2'>

                <span onClick={() => setActive(prev => ({ ...prev, status: !prev.status,sort:true,filter:false }))} className="center cursor-pointer bg-sky-300 p-2 rounded-md gap-2">

                    Availability
                    <FaAngleDown />
                </span>

                <span  onClick={() => setActive(prev => ({ ...prev, status: !prev.status,filter:true,sort:false }))} className="center cursor-pointer border-1 border-sky-900 p-2 rounded-md gap-2">

                    Filter
                    <IoFilter />
                </span>



            </div>


            <div className={`w-full mt-10 h-[77vh]  fixed left-0 rounded-t-2xl z-500 transition duration-150 ease-in-out bg-slate-500 ${active?.status ? " opacity-100 translate-y-[0vh] visible" : "translate-y-[77vh] invisible"}`}>

                <span onClick={()=>setActive(prev=>({...prev,status:false,filter:false,sort:false}))} className="size-[35px] center absolute right-4 top-4 border border-slate-200 text-slate-300 rounded-full cursor-pointer duration-700 transition ease active:scale-90 z-20">
                    <GiCrossMark />
                </span>

                {active?.sort && <Sort />}
                {active?.filter && <FilterOpr />}

            </div>
        </div>
    )
}

export default Filter