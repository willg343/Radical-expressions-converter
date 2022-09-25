
<!DOCTYPE html>
<html style = "background-color: rgba(197, 253, 154, 0.79)">
<head>
<title>Internet Free Radicals Converter</title>

<meta charset="utf-8">
<script src = "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

</head>
<body>	
	<h1 style = "font-size:20px; margin-left:40px;width:850px;margin-top: 2px"><strong>Radicals Converter. Developed by Will Gusarov. It handles:</strong></h1>

	<ul style = "font-size:20px; list-style-type:square; margin-top:-8px;margin-left:20px; width:850px">
		<li>an infinite amount of single letter variables</li>
		<li>powers up to 4*10^9 </li>
		<li>infinitely large root indexes</li>
		<li>integer coefficients up to 10^7</li>
		<li>negative expressions</li>
		<li>same variable with different powers repeatedly used in an expression</li>
	</ul>
		<p style = "font-size:18px; list-style-type:square; margin-left:20px; width:1000px"> There are several characteristics to consider when using it:<br>1. If a negative expression is combined with an even power, the program will output a warning.<br>2. Due to rounding issues in Java Script the numbers may turn out incorrect when they get above 3*10^15.<br>3.Variables with a power of 1 don't need the power indicated.<br><br>The convention for entering the radicals is the following: 
		<b>coefficient <i>space</i> root <i>space</i> root-index <i>space</i> of <i>space</i> radicand</b><br>Example:<b> 3x^2 root 7 of 11x^3c^4</b></p>
	<form method = "get" >
		<style>
			input[type="text"]{color:black; font-size:30px;}
		</style>
  		<label for="formula"style = "font-size:20px; margin-left:40px">Step 1: Type the radical into the box and press ENTER </label>
  		<input type="text" id="formula" name="formula">
	</form><br>
	<p1 style = "font-size:20px;margin-left:40px">Step 2: Choose the operation, and click on it</p1><br><br>
	<p2 style = "font-size:22px;margin-left:60px;cursor: pointer; padding: 4px; background-color:white;border:solid;border-color:black;border-width: 1px"> Convert to a <strong>mixed</strong> radical </p2>
	<p3 style = "font-size:22px;margin-left:100px;cursor: pointer;background-color:white; padding: 4px; border:solid;border-color:black;border-width: 1px"> Convert to an <strong>entire</strong> radical </p3><br><br>

	
	<p4 style = "font-size:20px;  margin-left:40px">Step 3: Get the result</p4>	

	<ol style = "font-size:22px; list-style-type:square; margin-left:40px; column-count:1; width:1200px">
		<li id = "u_f"> Entered Radical : </li>
		<li id = "u_o"> Choosen Operation : </li>
	</ol>

	<ol style = "font-size:26px; list-style-type:square; margin-left:50px; background-color:white;border:solid; border-width: 1px; padding: 4px; width:800px">
		<li id="res">Result : </li></ol><hr>

	<ul style ="font-size:20px; column-count:2; margin-left:20px; width: 850px">
		<li> &trade; 2021 | Created by Will Gusarov</li>
		<li>Contact me: will.gusarov@gmail.com </li>

	<script>

		function entire_mixed(s){
    			var rad1 = {},idx1={},ctr=0
    			if (s=="Expression <0 can't be here") return s
    			var [a,b,c] = s.split(/[\s]*\s*root\s+(\d+)\s+of\s+(.*)/g).map(c=>c.replace(/-/,function(){ctr+=1;return''}).replace(/.\^0/g,''))
    			if (ctr && b%2==0) return "Expression <0 can't be here"
    			var fora = [...a.matchAll(/([a-z])\^?(\d*)/g)],forc = [...c.matchAll(/([a-z])\^?(\d*)/g)]
    			for (x=0; x<fora.length; x++){
        		idx1[fora[x][1]] = fora[x][1] in idx1? parseInt(idx1[fora[x][1]])+parseInt(fora[x][2] || 1) : fora[x][2] || 1
    			}
    			for (x=0; x<forc.length; x++){
        			rad1[forc[x][1]] = forc[x][1] in rad1? parseInt(rad1[forc[x][1]])+parseInt(forc[x][2] || 1) : forc[x][2] || 1
    			}
    			for(i=0; i<Object.keys(rad1).length;i++){
        			perm = Object.keys(rad1)[i]
        			idx1[perm] = perm in idx1?parseInt(idx1[perm])+Math.floor(parseInt(rad1[perm]||1)/(+b)) : Math.floor(rad1[perm]/b)//||1 is redundant
        			rad1[perm] %= b
    			}
    			var i_a = parseInt((a.match(/^-?\d+/)||[1])[0]),i_c = parseInt((c.match(/^-?\d+/)||[1])[0])
    			for (i=Math.ceil(i_c**(1/b));i>0;i--){
        			if (i_c%i**b==0)    break
    			}
    			var int_a = i_a*i,int_c = Math.floor(i_c/i**b)
    			var finalize = d=>Object.keys(d).sort((_,$)=>d[_]==d[$]?_.charCodeAt(0)-$.charCodeAt(0):d[$]-d[_]).map(v=>`${v}^${d[v]}`).join``
    			var f_net = `${' - '[ctr]}${int_a}${finalize(idx1)} root ${b} of ${int_c}${finalize(rad1)}`
    			return f_net.replace(/.\^0/g,'').
					replace(/^ +/g,'').
						replace(/^(-)?1 ?(?=\D)/,q=>q[1]?'-':'').
							replace(/\^1(?=\D|$)/g,'').
								replace(/(?<=\D)1(?=[a-z])/ig,'').
									replace(/ ?root 1.+/g,'').
										replace(/ ?root \d+ of (1|)$/g,'').
											replace(/- /,'-') || "1"
		}

		function mixed_entire(s){
    			var rad = {},idx={},cor=0
    			if (s=="Expression <0 can't be here") return s
    			var [a,b,c] = s.split(/[\s]*\s*root\s+(\d+)\s+of\s+(.*)/g).map(t=>t.replace(/-/,function(){cor+=1;return''}).replace(/.\^0/g,''))
    			if (cor && b%2==0) return "Expression <0 can't be here"
    			var forc =[...c.matchAll(/([a-z])\^?(\d*)/g)],fora =[...a.matchAll(/([a-z])\^?(\d*)/g)]
    			for (x=0; x<forc.length; x++){
        			rad[forc[x][1]] = forc[x][1] in rad? parseInt(rad[forc[x][1]])+parseInt(forc[x][2] || 1) : forc[x][2] || 1
    			}
    			for (x=0; x<fora.length; x++){
        			rad[fora[x][1]]=fora[x][1] in rad?parseInt(rad[fora[x][1]])+parseInt(fora[x][2]||1)*(+b) : (fora[x][2]||1)*(+b)
    			}
    			vals = Object.keys(rad).sort((_,$)=>rad[_]==rad[$]?_.charCodeAt(0)-$.charCodeAt(0):rad[$]-rad[_]).map(v=>`${v}^${rad[v]}`).join``
    			var ints = parseInt((a.match(/^-?\d+/)||[1])[0])**(+b)*parseInt((c.match(/^-?\d+/)||[1])[0])
    			var f_nett = `root ${b} of ${['','-',''][cor]}${ints}${vals}`
    			return f_nett.replace(/.\^0/g,'').
					replace(/\^1(?=\D|$)/g,'').
						replace(/(?<=\D)1(?=[a-z])/ig,'').
							replace(/root 1 of /g,'').
								replace(/root \d+ of 1$/g,'').
									replace(/- /,'-') || "1"
    	}

		function x(){
			var ghg = document.getElementById("formula").value		
			$("#u_f").text(`Entered radical: ${ghg}`)
		}

		function y(){
			$("#u_o").text("Choosen Operation : convert to a mixed radical. See the answer below.")
			var t = document.getElementById("formula").value
			$("#res").text(`Result : ${entire_mixed(t)}`)

		}

		function y1(){
			$("#u_o").text("Choosen Operation : convert to an entire radical. See the answer below.")
			var t = document.getElementById("formula").value
			$("#res").text(`Result : ${mixed_entire(t)}`)
		}

		$("p2").click(y)
		$("p3").click(y1)

		$('form').keydown(function (inp){
			if (inp.which==13){

				inp.preventDefault();
				x()
      			return false;			
			}
		})
	</script>
	

</body>
</html>
