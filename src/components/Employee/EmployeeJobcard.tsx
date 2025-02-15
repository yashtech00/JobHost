import { useEffect, useState } from "react"


export function Empjobcard(){
    const[jobs,setjobs] = useState([])
    useEffect(()=>{ 
        const fetchjobs =async()=>{
            try{
                const res = await fetch('/api/jobstream',{
                    method:"GET",
                    credentials:"include",
                    headers:{
                        "content-type":"Apllication/json"
                    },
                    body:JSON.stringify(jobs)
                })
                const json  = await res.json();
                setjobs(json);
            }catch(e){
                console.error(e);
            }
        }
        fetchjobs()
    },[])
    

    return (
        <div>
            <div>
                
            </div>
        </div>
    )
}