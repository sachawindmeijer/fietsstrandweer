import jwtDecode from "jwt-decode";

function isTokenValid(token) {
    try {


        const decodedToken = jwtDecode(token);
        console.log("jwtdecode", decodedToken)

        if (!decodedToken.exp) {
            console.error("Token mist claim voor vervaltijd .");
            return false;
        }


        const expirationTime = decodedToken.exp;


        const currentTime = Math.floor(Date.now() / 1000); // More efficient for seconds
        return expirationTime > currentTime;
    } catch (error) {
        console.error("Fout bij het decoderen van token:", error.message);
        return false;
    }
}

export default isTokenValid;