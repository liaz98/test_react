import {useState} from 'react'
import {Data} from './Components/Data'
import * as XLSX from 'xlsx'

function App() {
  
  // on change states
  const [excelFile, setExcelFile]=useState(null);
  const [excelFileError, setExcelFileError]=useState(null);  
  
  // submit
  const [excelData, setExcelData]=useState(null);
  // it will contain array of objects

  // handle File
  const handleFile = (e)=>{
    let selectedFile = e.target.files[0];
    if(selectedFile){
      // console.log(selectedFile.type);
      let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload=(e)=>{
          setExcelFileError(null);
          setExcelFile(e.target.result);
        } 
     
      // else{
      //   setExcelFileError('Please select only excel file types');
      //   setExcelFile(null);
      // }
    }
    else{
      console.log('plz select your file');
    }
  }

  // submit function
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(excelFile!==null){
      const importRange = "E11:H22";
      const headers = 11;
      
      const workbook = XLSX.read(excelFile,{type:'buffer'});
      const worksheetName = workbook.SheetNames[0];
      const worksheet=workbook.Sheets[worksheetName];
      var range = XLSX.utils.decode_range(worksheet['!ref']);
      const data = XLSX.utils.sheet_to_json(worksheet);
      let excelRowsObjArr = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[worksheetName]);
      console.log(data);
      // console.log(excelRowsObjArr.length);
      console.log(range);
      setExcelData(data);
    }
    else{
      setExcelData(null);
    }
  }
  
  return (
    <div className="container">

      {/* upload file section */}
      <div className='form'>
        <form className='form-group' autoComplete="off"
        onSubmit={handleSubmit}>
          <label><h5>Upload Excel file</h5></label>
          <br></br>
          <input type='file' className='form-control'
          onChange={handleFile} required></input>                  
          {excelFileError&&<div className='text-danger'
          style={{marginTop:5+'px'}}>{excelFileError}</div>}
          <button type='submit' className='btn btn-success'
          style={{marginTop:5+'px'}}>Submit</button>
        </form>
      </div>

      <br></br>
      <hr></hr>

      {/* view file section */}
      <h5>View Excel file</h5>
      <div className='viewer'>
        {excelData===null&&<>No file selected</>}
        {excelData!==null&&(
          <div className='table-responsive'>
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>ID</th>
                  <th scope='col'>First Name</th>
                  <th scope='col'>Last Name</th>
                  <th scope='col'>Gender</th>
                  <th scope='col'>Country</th>                 
                </tr>
              </thead>
              <tbody>
                <Data excelData={excelData}/>
              </tbody>
            </table>            
          </div>
        )}       
      </div>

    </div>
  );
}

export default App;