


export function Usercard({userdetail}){
    return(
        <div className="bg-white">  
            <div className="flex ">  
              <div>Profile Pic</div>  
              <div>  
                <div>{userdetail.username}</div>  
                <div>{userdetail.education}</div>  
                <div>{userdetail.firstName}</div>  
                <div>{userdetail.lastName}</div>  
                <div>{userdetail.city}</div>  
                <div>{userdetail.country}</div>  
              </div>  
            </div>  
          </div>  
    )
}