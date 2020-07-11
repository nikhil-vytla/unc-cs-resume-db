import React, {useState} from "react"
import Card from 'react-bootstrap/Card'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import ZoomInOutlinedIcon from '@material-ui/icons/ZoomInOutlined';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import StarIcon from '@material-ui/icons/Star';


function CandidateCard (props) {
    const [starToggle, setStarToggle] = useState(false);

    var star
    if(!starToggle) {
        star= <StarBorderOutlinedIcon className="icon" onClick={ () => setStarToggle(true)} />
    } else {
        star = <StarIcon onClick={ () => setStarToggle(false)} className="icon" style={ {color: '#4B9CD3'}}  />
    }
    
   
    

    return(
                <Card  className="card " > 
                    <Card.Header className=" bg-white m-0 p-0 " style={{ borderRadius: "15px"}}>
                        <div className="d-flex">
                            <img className="rounded-circle cardImg" src={require('../../Static/BlankUser.jpg')} height="75px" width="75px" alt="" ></img>
                            <div style={{width: '75px'}}>
                                <div className="cardHeaderTextDiv">
                                    <h1 className='cardHeaderText BreeSerif' style={{color: '#000000'}}>Adam</h1>
                                    <h1 className='cardHeaderText BreeSerif' style={{color: '#000000'}}>Winek</h1>
                                    <h2 className='cardHeaderText'>2022</h2>
                                </div>
                                
                            </div>
                        </div> 
                       
                        
                        <div className="cardHeader d-flex justify-content-center">
                            <p className="cardHeaderText BreeSerif" >UNC Chapel Hill</p>
                            
                        </div>
                    </Card.Header>
                    <Card.Body className="p-0">
                        <div className="bg-white BreeSerif d-flex justify-content-start w-100 flex-wrap" style={{padding : '10px'}}>
                            <p className="tag BreeSerif">Hack NC</p>
                            <p className="tag BreeSerif">CSS</p>
                            <p className="tag BreeSerif">JavaScript</p>
                            <p className="tag BreeSerif">Swift</p>
                            <p className="tag BreeSerif">Angular</p>

                        </div>
                        <div className=" d-flex justify-content-around cardIcons">
                                {star}
                                <MailOutlineIcon className="icon"/>
                               
                                <ZoomInOutlinedIcon className="icon" onClick={() => props.toggleResumeView()} />
                        </div>
                    </Card.Body>
                </Card>
        
    )
}
export default CandidateCard