import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

function DeleteData() {

    const [token] = useCookies("auth")
    const [message, setMessage] = useState(null)

    // store list of all company present in DB
    const [company, setCompany] = useState(null)
    

    useEffect(() => {       
        // check if user is login or not 
        if(!token['auth']) window.location.href="/login"

        // fetching list of all company present in DB
        fetch(`${process.env.REACT_APP_API_URL}/api/showdata/companylist`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Token ${token["auth"]}`,
            },
        })
        .then((resp) => resp.json())
        .then((res) => setCompany(res))
        .catch( error => console.log(error))

    },[])

    const Delete = () => {
        // create a filter string which is use to send filter instruction for deletion
        // Ex. date__lte=2008-07-03&date__gte=2008-07-03&symbol=GAIL
        // date__lte => date less than equal to
        // date__gte => date greater than equal to
        // symbol => symbol use by NSE/BSE for any company
        var filter = ""
        var symbol = ""
        var dateLTE = document.getElementById("datelte").value
        if(dateLTE) filter="date__lte="+dateLTE
        var dateGTE = document.getElementById("dategte").value
        if(dateGTE)
        {
            if(filter.length) filter+="&date__gte="+dateGTE
            else filter="date__gte="+dateGTE
        } 

        for(var i=0;company&&i<company.length;i++)
            if(document.getElementById(company[i]).checked)
                symbol+=company[i]+","

        // check if wrong combinition of dates are provided
        if(dateGTE&&dateLTE&&dateLTE<dateGTE)
        {
            alert("You Enter Wrong Date Combination")
            document.getElementById("dategte").value=null
            document.getElementById("datelte").value=null
        }
        else
        {
            if(symbol.length) filter+="&symbol="+symbol;

            fetch(`${process.env.REACT_APP_API_URL}/api/delete/deletedata/?${filter}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Token ${token["auth"]}`,
                },
            })
            .then((resp) => resp.json())
            .then((res) => setMessage("Data Deleted"))
            .catch( error => console.log(error))
        }
    }

    // wait while company list is fetch
    if(!company) return(
        <h1>Fetching Data...</h1>
    );

    return(
        <div>
            <label for="dategte">Starting Date:</label>
            <input type="date" id="dategte" name="dategte" />
            <br/>
            <label for="datelte">Ending Date:</label>
            <input type="date" id="datelte" name="datelte" />
            <br/>
            {company?
                <div>
                    <label for="symbol">Select Company:</label>
                    {company.map(item => {
                        return(
                            <div style={{'marginLeft':'40px'}}>
                                <input type="checkbox" id={item} name={item} value={item} />
                               <label for={item}> {item}</label><br/>
                            </div>
                        );
                    })}
                </div>
            :"No Data Added"}
            <button type="button" class="btn btn-danger" onClick={() => Delete()}>Delete</button>


            <br/>   
            {/* show message */}
            {message?
                <h1>{message}</h1>                
            :
                null
            }
        </div>
    );
}

export default DeleteData;