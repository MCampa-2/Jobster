import { Link, useRouteError } from "react-router-dom";


function ErrorPage(){
    const error = useRouteError();
    console.log(error);
    if(error.status === 404){
        return(
            <div className="error-container">
                <h1>404</h1>
                <h3>Oops! Page not found</h3>
                <Link className="back-home" to="/dashboard">Go back</Link>
            </div>
        )
    };

    return(
        <div className="error-container">
            <h1>Something went wrong</h1>
            <Link className="back-home" to="/dashboard">Go back</Link>
        </div>
    )
};

export default ErrorPage;