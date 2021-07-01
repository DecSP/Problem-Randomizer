problemurl="https://codeforces.com/problemset/problem/"
problem=""
url = "https://codeforces.com/api/problemset.problems";
var problemset;

(function() {
	$.getJSON(url,function(result){
		console.log("oke");
		problemset=result.result;
		document.getElementById("btn").toggleAttribute("hidden");
	});
} )();

function randomizing(){
	lwr=parseInt(document.getElementById("lwr").value)
	upr=parseInt(document.getElementById("upr").value)
	l=[];
	len=problemset.problems.length;
	for (i=0;i<len;++i){
		if ("rating" in problemset.problems[i]){
			rating=problemset.problems[i].rating;
			if (rating<=upr&&rating>=lwr) l.push(i);
		}
	}
	
	nlen=l.length;
	ridx=Math.floor(Math.random()*nlen);
	// console.log(ridx);
	// console.log(problemset.problems[l[ridx]]);
	problemobj=problemset.problems[l[ridx]];
	problem=problemobj.contestId+'/'+problemobj.index;
	document.getElementById("problink").innerHTML=`Problem: <a href="${problemurl}${problem}" target="_blank" rel="noopener noreferrer">${problemobj.name}</a> (Rating: ${problemobj.rating})`
}