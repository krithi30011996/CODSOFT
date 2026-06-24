function Home() {

const recent =

JSON.parse(

localStorage.getItem(
"recentQuiz"
)

||

"null"

);

return(

<div>

{/* Your existing Home UI */}

</div>

);

}

export default Home;