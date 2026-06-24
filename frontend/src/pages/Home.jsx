import { useNavigate } from "react-router-dom";

function Home() {

    const navigate =
        useNavigate();
   




    const recent =

        JSON.parse(

            localStorage.getItem(
                "recentQuiz"
            )

            ||

            "null"

        );
 



  
}

export default Home;