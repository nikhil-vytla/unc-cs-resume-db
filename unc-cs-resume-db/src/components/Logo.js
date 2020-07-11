import React from "react"

function Logo (props) {

    console.log(props.isLarge)


    if (props.isLarge !== "true"){
        return (
            <div  className="d-flex container-fluid justify-content-between LogoSmallDiv"  >
                <img height="60px" src={require('../Static/CSLogo.png')} alt=" " ></img>
                <h1  className=" BreeSerif float-right text-white mb-0" style={{ fontSize:"30px", width:"260px", height:"60px", lineHeight:"60px"}}>Resume Database</h1>
            </div>
        )
    } else {
        return (
            <div  className="d-flex container-fluid justify-content-between LogoLargeDiv"  >
                <img height="90px" src={require('../Static/CSLogo.png')} alt=" " ></img>
                <h1  className=" BreeSerif float-right text-white mb-0" style={{ fontSize:"50px", width:"410px", height:"90px", lineHeight:"90px"}}>Resume Database</h1>
            </div>
        )
    }
       
    
}
export default Logo