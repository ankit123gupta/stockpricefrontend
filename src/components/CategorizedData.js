import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

function CategorizedData() {

    const [token] = useCookies("auth")
    const [data, setData] = useState(null)
    
    useEffect(() => {
        // check if user is login or not 
        if(!token['auth']) window.location.href="/login"

        // fetch all data in categorized form form DB
        fetch(`${process.env.REACT_APP_API_URL}/api/showcategorizeddata`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Token ${token["auth"]}`,
            },
        })
        .then((resp) => resp.json())
        .then((res) => setData(res))
        .catch( error => console.log(error))
        },[])
        
    // wait while data is fetched
    if(!data)
        return(<h1>Fetching Data...</h1>);

    return(
        <div>
            <h1>Show Only First 20 Records of every company</h1>
            <br/>
            {data?
                Object.keys(data).map(v=>{
                    return(
                        <div>
                            <br/>
                            <h5>{v}</h5>
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="">#</th>
                                        <th scope="">Date</th>
                                        <th scope="">Symbol</th>
                                        <th scope="">Prev Close</th>
                                        <th scope="">Open</th>
                                        <th scope="">High</th>
                                        <th scope="">Low</th>
                                        <th scope="">Last</th>
                                        <th scope="">Close</th>
                                        <th scope="">VWAP</th>
                                        <th scope="">Volume</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data[v]?
                                        data[v].map((item,index) => {
                                            if(index>20) return null
                                            return(
                                                <tr key={index}>
                                                    <th scope="row">{index}</th>
                                                    <td>{item['date']}</td>
                                                    <td>{item['symbol']}</td>
                                                    <td>{item['prevClose']}</td>
                                                    <td>{item['open']}</td>
                                                    <td>{item['high']}</td>
                                                    <td>{item['low']}</td>
                                                    <td>{item['last']}</td>
                                                    <td>{item['close']}</td>
                                                    <td>{item['vwap']}</td>
                                                    <td>{item['volume']}</td>
                                                </tr>
                                            );
                                        })
                                    :null}
                                </tbody>
                            </table>
                        </div>
                    );
                })
            :
                null
            }
        </div>
    );
}

export default CategorizedData;