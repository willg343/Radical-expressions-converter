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
    		return f_net.replace(/.\^0/g,'')
                      .replace(/^ +/g,'')
                         .replace(/^(-)?1 ?(?=\D)/,q=>q[1]?'-':'')
                            .replace(/\^1(?=\D|$)/g,'').replace(/(?<=\D)1(?=[a-z])/ig,'')
                                .replace(/ ?root 1.+/g,'').replace(/ ?root \d+ of (1|)$/g,'')
                                    .replace(/- /,'-') || "1";
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
    		return f_nett.replace(/.\^0/g,'')
                        .replace(/\^1(?=\D|$)/g,'')
                          .replace(/(?<=\D)1(?=[a-z])/ig,'')
                            .replace(/root 1 of /g,'')
                              .replace(/root \d+ of 1$/g,'')
                                .replace(/- /,'-') || "1";
}
