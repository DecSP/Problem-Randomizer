sitesurl={"cf":"https://codeforces.com/problemset/problem/",
			"ac":"https://atcoder.jp/contests/"
		};
apiurl={"cf":"https://codeforces.com/api/problemset.problems",
			"ac":"https://kenkoooo.com/atcoder/resources/problems.json",
			"ac2":"https://kenkoooo.com/atcoder/resources/problem-models.json"
		};
var problem;
var problemset;
var choice;
var timer;
var timerrunning=false;
var timersecs;
var secs;
var ouput = '';
const upr = document.getElementById('upr');
const lwr = document.getElementById('lwr');

function cfget() {
	upr.min=lwr.min=800;
	upr.max=lwr.max=3500;
	$.getJSON(apiurl["cf"],function(result){
		console.log("okecf");
		problemset=result.result;
		document.getElementById("btn").disabled=false;
		document.getElementById("status").innerHTML="Idle";

	});
	
}

function acget() {
	upr.min=lwr.min=100;
	upr.max=lwr.max=4400;
	$.getJSON(apiurl["ac"],function(result){
		problemset=result;
		$.getJSON(apiurl["ac2"],function(result){
			tmp=result;
			for (i=0;i<problemset.length;++i){
				if (problemset[i].id in tmp){
					tmp2=tmp[problemset[i].id].difficulty;
					contestname=problemset[i].contest_id;
					if (typeof(tmp2)!="number") continue;
					if (!((contestname.substr(0,3)=="abc" && parseInt(contestname.substr(3))>47)||
					(contestname.substr(0,3)=="arc" && parseInt(contestname.substr(3))>57) ||
					(contestname.substr(0,3)=="agc" && parseInt(contestname.substr(3))>1) )) {
						problemset[i].rating=0;
						continue;
					}
					let rating=tmp[problemset[i].id].difficulty;
					problemset[i].rating=rating;
				}
			}
			console.log("okeac");
			document.getElementById("btn").disabled=false;
			document.getElementById("status").innerHTML="Idle";
		});
	});
	
}

function getdata(){
	choice=document.getElementById("site").value;
	document.getElementById("btn").disabled=true;
	document.getElementById("status").innerHTML="Fetching data...";
	if (choice=="cf") cfget();
	else if (choice=="ac") acget();

}

getdata();

function randomizingcf(){
	rcnt=parseInt(document.getElementById("rcnt").value)
	l=[];
	len=(rcnt==0)?problemset.problems.length:rcnt;
	for (i=0;i<len;++i){
		if ("rating" in problemset.problems[i]){
			rating=problemset.problems[i].rating;
			if (rating<=upr.value&&rating>=lwr.value) l.push(i);
		}
	}
	
	nlen=l.length;
	ridx=Math.floor(Math.random()*nlen);
	// console.log(ridx);
	// console.log(problemset.problems[l[ridx]]);
	problemobj=problemset.problems[l[ridx]];
	problem=problemobj.contestId+'/'+problemobj.index;
	output = `<div class="item">Problem: <a href="${sitesurl["cf"]}${problem}" target="_blank" rel="noopener noreferrer">${problemobj.name}</a> (Rating: ${problemobj.rating})</div>`;
	// document.getElementById("problink").innerHTML=`Problem: <a href="${sitesurl["cf"]}${problem}" target="_blank" rel="noopener noreferrer">${problemobj.name}</a> (Rating: ${problemobj.rating})`;
	document.getElementById("problink").innerHTML+=output;
}
function randomizingac(){
	rcnt=parseInt(document.getElementById("rcnt").value)
	l=[];
	len=problemset.length;
	for (i=0;i<len;++i){
		if ("rating" in problemset[i]){
			rating=problemset[i].rating;
			if (rating<=upr.value&&rating>=lwr.value) l.push(i);
		}
	}
	
	nlen=l.length;
	ridx=Math.floor(Math.random()*nlen);
	problemobj=problemset[l[ridx]];
	problem=problemobj.contest_id+'/tasks/'+problemobj.id;
	output=`<div class="item">Problem: <a href="${sitesurl["ac"]}${problem}" target="_blank" rel="noopener noreferrer">${problemobj.title}</a> (Rating: ${problemobj.rating})</div>`;
	// document.getElementById("problink").innerHTML=`Problem: <a href="${sitesurl["ac"]}${problem}" target="_blank" rel="noopener noreferrer">${problemobj.title}</a> (Rating: ${problemobj.rating})`;
	document.getElementById("problink").innerHTML += output;
}
function randomizing(){
	if (choice=='cf') {
		randomizingcf();
	}
	else if (choice=='ac') {
		randomizingac();
	}
	if (timerrunning) {
		timerrunning=false;
		clearInterval(timer);
		document.getElementById("title").innerHTML='Problem Randomizer';
	}
	secs=parseInt(document.getElementById("timer").value)*60;
	timersecs=secs;
	if (secs>0){
		timerrunning=true;
		timer=setInterval(function(){
			secs-=1;
			document.getElementById("timerstatus").innerHTML=`Time left: ${parseInt((secs-secs%60)/60)}:${parseInt(secs%60)}`;
			document.getElementById("title").innerHTML=`Time left: ${parseInt((secs-secs%60)/60)}:${parseInt(secs%60)}`;
			document.getElementById("time").style.opacity = '1';
			if (secs<0){
				clearInterval(timer);
				timerrunning=false;
				document.getElementById("timerstatus").innerHTML=`Time is up! Try harder next time ^^`;
				document.getElementById("title").innerHTML='Problem Randomizer';
				alert("Timeout");
			}
		},1000)
	}
	else if(secs == 0){
		document.getElementById("time").style.opacity = '0';
	}
}

function finishProblem(){
	if (timerrunning){
		clearInterval(timer);
		timerrunning=false;
		document.getElementById("timerstatus").innerHTML=`Congratulations! You solved it ^^`;	
		document.getElementById("title").innerHTML='Problem Randomizer';
		tmp=timersecs-secs;
		alert(`Congratulations! You solved the problem in ${parseInt((tmp-tmp%60)/60)} minute(s) and ${parseInt(tmp%60)} second(s)!`);
	}
}
