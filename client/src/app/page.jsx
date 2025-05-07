import  {DoctorList}  from "./doctor-list/page";
import Head from "next/head";

// app/layout.js
export const metadata = {
  title: {
    default: 'Hospital WebApp',
    template: '%s | Hospital WebApp',
  },
  description: 'Search, compare, and book appointments with expert doctors across multiple specialties.',
  keywords: ['hospital', 'online consultation', 'doctor booking', 'healthcare platform', 'medical help'],
  robots: 'index, follow',
  icons: {
    icon: '/logo.png',
  }
  ,
  openGraph: {
    title: 'Hospital WebApp',
    description: 'Smart and simple platform to find doctors and manage appointments online.',
    url: process.env.NEXT_PUBLIC_API_BASE_URL,
    siteName: 'Hospital WebApp',
    images: [
      {
        url:`${ process.env.NEXT_PUBLIC_API_BASE_URL}/logo.png`,
        width: 1200,
        height: 630,
        alt: 'Hospital WebApp Preview',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hospital WebApp',
    description: 'Find expert doctors and book appointments easily with our digital healthcare platform.',
    images: [`${ process.env.NEXT_PUBLIC_API_BASE_URL}/logo.png`],
    creator: '@YourTwitterHandle',
  },
};

const page = () => {
  //  getDoctorDetails()


  // useEffect(()=>{

  // //  getDoctorDetails()
  // },[])
  return (
    <>
     <Head>
        <title>DoctorList – Find Trusted Doctors Near You</title>
        <meta name="description" content="Search and book appointments with verified doctors across India. Filter by specialty, location, and availability." />
        <meta property="og:title" content="DoctorList – Find Trusted Doctors Near You" />
        <meta property="og:description" content="Search and book appointments with verified doctors across India. Filter by specialty, location, and availability." />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_API_BASE_URL} />
        <meta property="og:type" content="website" />
      </Head>
    
    <DoctorList/>
    
    </>

  )
}

export default page