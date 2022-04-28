import { useCookies } from "react-cookie";

function Nav() {
    const [token, setToken, deleteToken] = useCookies('auth')    
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="/">Stocks Price</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <a class="nav-link" href="/">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/showdata">ShowData</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/categorizeddata">ShowCategorizedData</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/search">SearchData</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/filter">FilterData</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/delete">DeleteData</a>
            </li>
            {token['auth']?
                <li class="nav-item">
                    <a class="nav-link" onClick={() => {deleteToken(['auth']);document.location.reload()}}>Logout</a>
                </li>
            :
            <li class="nav-item">
                    <a class="nav-link" href="/login">Login</a>
                </li>
            }
            </ul>
        </div>
    </nav>    
);
}

export default Nav;
