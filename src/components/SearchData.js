import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import './SearchData.css'


function SearchData() {

    const [token] = useCookies("auth")
    const [data, setData] = useState(null)

        // check if user is login or not 
    useEffect(() => {
        if(!token['auth']) window.location.href="/login"
    },[])

    const Submit = () => {
        // requesting for search results
        var fields = document.getElementsByClassName("search-input")[0].value
        fetch(`${process.env.REACT_APP_API_URL}/api/search/?search=${fields}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Token ${token["auth"]}`,
            },
        })
        .then((resp) => resp.json())
        .then((res) => setData(res))
        .catch( error => console.log(error))

    }
    return(
        <div>

            <div class="search-container">
            <div class="search-box">
                <input type="text" class="search-input" placeholder="Search.."/>

                <button class="search-button" onClick={() => Submit()}>
                    <i class="fas fa-search"></i>
                </button>
            </div>
            </div>

            {data?
            <div>
                <h1 style={{'top':'150px','position':'absolute'}} >{data?`${data.length} Results Found`:null}</h1>
                <table class="table table-striped" id="search-result">
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
                        {data?
                            data.map((item,index) => {
                                if(index>100) return null
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
            :
                null
            }



        </div>
    );
}

export default SearchData;