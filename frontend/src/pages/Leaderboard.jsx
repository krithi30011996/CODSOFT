import { useEffect, useState } from "react";

function Leaderboard(){

const [scores,setScores]=
useState([]);

useEffect(()=>{

loadScores();

},[]);

function loadScores(){

const data=

JSON.parse(

localStorage.getItem(
"scores"
)

||

"[]"

);

/* remove duplicates → keep highest score */

const unique={};

data.forEach((item)=>{

if(

!unique[item.user]

||

item.score>

unique[item.user].score

){

unique[item.user]=item;

}

});

const sorted=

Object.values(unique)

.sort(

(a,b)=>

b.score-a.score

);

setScores(
sorted
);

}

return(

<div className="home">

<h1>

🏆 Leaderboard

</h1>

{

scores.length===0

?

<div className="empty">

<h2>

No results yet

</h2>

</div>

:

<div className="cards">

{

scores.map(

(item,index)=>(

<div
className="card"
key={index}
>

<h2>

{

index===0

?

"🥇"

:

index===1

?

"🥈"

:

index===2

?

"🥉"

:

`#${index+1}`

}

</h2>

<h3>

{item.user}

</h3>

<p>

Score: {item.score}%

</p>

</div>

)

)

}

</div>

}

</div>

);

}

export default Leaderboard;