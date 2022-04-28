import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

function Home() {

  const [token] = useCookies(['auth'])
  const [respon, setResp] = useState(null)
  
  // check if user is login or not 
  useEffect(()=>{
    if(!token['auth']) window.location.href="/login"
  },[])

  const Submit = () => {
    // convert csv file into JSON string
    var fileUpload = document.getElementById("fileUpload");
    var fullpath = fileUpload.value.toLowerCase();
    var filename = fullpath.replace(/^.*[\\\/]/, '')
    filename = filename.slice(0,-4)
    var reader = new FileReader();
    reader.onload = function (e) {
        
      var rows = e.target.result.split("\n");
      var column_name=[]
      var cells = rows[0].split(",");
      for(var i=0 ; i < cells.length - 1  ; i++){
        column_name.push(cells[i])
      }
      var last_column = cells[cells.length - 1];
      last_column=last_column.slice(0,-1)//"\n will append with last cell so deal with it seprately"
      column_name.push(last_column)
      var file_data=[]
          
      for (var i = 1; i < rows.length; i++) {
          var obj={};
          var cells = rows[i].split(",");
          if (cells.length > 1) {
              
              for (var j = 0; j < cells.length - 1; j++) {
                obj[column_name[j]]=cells[j];
              }
              var last_value = cells[cells.length - 1];
              last_value = last_value.slice(0,-1)
              obj[last_column]=last_value
          }
          file_data.push(obj)
      }
      
      // sending JSON data
      fetch(`${process.env.REACT_APP_API_URL}/api/uploadjson`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token["auth"]}`,
        },
        body: JSON.stringify(file_data),
    })
    .then((resp) => resp.json())
    .then((res) => {setResp(res['msg'])})
    .catch( error => console.log(error,"rrr"))
    }
    reader.readAsText(fileUpload.files[0]); 



  }
  return(
      <div>
          <h1>Upload Your CSV File</h1>
          <form>
          <input type="file" id="fileUpload" name="file" accept=".csv"></input><br/><br/>
          <button type="button" class="btn btn-primary" onClick={()=>Submit()}>Submit</button>
          
          {respon?
            <div>{respon}</div>
          :
            null 
          }

          </form>
      </div>
  );
}

export default Home;
