import './index.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BsFillFileEarmarkFill } from 'react-icons/bs';
function App() {
  return (
    <div className="container">
     <div className='main'>
       <div className='mt-5 heading'>
       <h2>Upload Anything, from anywhere</h2>
         <p>Daily limits left : <b style={{color: "red"}}>10</b></p>
       </div>
       <div className="inputbox">
         <input type="file" multi className='upload'/>
       </div>
       <div>
       
         <div className="singleData"><div ><BsFillFileEarmarkFill className='context'/> File</div> <div><button className="btn btn-danger">DELETE</button></div><div><button className="btn btn-success">DOWNLOAD</button></div></div>
       
       </div>
     </div>
    </div>
  );
}

export default App;
