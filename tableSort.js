
var usingdiv;
var tableSpecWas; // records the initial table specification
// extracts the interhtml of the first column of each row in a table represented by an array of rows, AR
function column1Of(AR,start){
	var C=[];
	//alert("AR.length "+AR.length);
	for (var j=start;j<AR.length;++j){
		var x=AR[j];
		var j0=x.indexOf("<td");
		var j1=x.indexOf(">",j0);
		var j2=x.indexOf("</td>",j1)
		var y=x.substring(+1+j1,j2);
		C.push(y);
	}
	//showArray(C);
	return C;
}
function tableToArray(mytable) {

		var t= document.getElementById(mytable).innerHTML;
		usingdiv=/<table/i.test(t);

		if (usingdiv) {
			var j2=t.indexOf(">") ; // looking for end of <table.... >
			tableSpecWas=t.substring(0,j2);
			t=t.substring(++j2);
		} else tableSpecWas="";
		t=myReplace(t,"</tr>","","<tbody>","","</tbody>","","</table>","","<thead>","","<.thead>","");
		t=myReplace(t,"<th","<td","</th","</td");
		var Rows=t.split("<tr");
		var RowArray=[];
		for (var k=1;k<Rows.length;++k) RowArray[k-1]=Rows[k];
		return RowArray ;
}
//sort  an Html table by the values in the first column, then make another html table from it showing the sorted values

function sortTable(divID,skipline1,reverse){

	newHtml=sortTableHtml(divID,skipline1,reverse);
	document.getElementById(divID).innerHTML=newHtml;// copy the sorted table into place held for it.
}
function sortTableHtml(divID,skipFirstLine,reverse1){
	var reverse=false,skipline1=false;
	if (skipFirstLine != undefined)if (skipFirstLine!="")skipline1=skipFirstLine;
	if (reverse1 != undefined)if (reverse != "") reverse=reverse1

// copy the table values into a 2-D array.
	var T=tableToArray (divID);

//  copy the first column into an array which we will sort on
	var sortingKey=column1Of(T,skipline1?1:0);
//showArray(sortingKey,"Sorting keys");
// modify the sortingKeys, concatenating each with a separtor and a number being its own position in the array
	var indexes=[];
	var separator= " ::: "// anything that won't occur in the stuff to be sorted
	key=[];// this will be the array of modified sorting keys with separator+index attached,
	for (var j=0;j<sortingKey.length;++j) {
		var thisKey=sortingKey[j];
		thisKey=myReplace(thisKey,"\r","","\n","","\t","");// strip of white-space characters in keys, except space
		thisKey=thisKey.toLowerCase();
		if (typeof customsort != "undefined" ) thisKey=customsort(thisKey);
		key.push(thisKey+separator+j) 
	}
	
// do the actual sort
	var sortedKeys=key.sort();// SORTED
	//showArray(sortedKeys,"Sorted Keys");
//form and array of  index values, in their new order, by splitting them off from the sorted values (after the separator) 
	for (j=0;j<sortedKeys.length;++j) {
		var v=sortedKeys[j];
		var i=v.indexOf(separator);
		var k=v.substr(i+separator.length);
		if (skipline1)++k;
		indexes[j]=k	 
	}
// now re-arrange the array in the order of the index values
	var sorted_Array=[];
	var n=indexes.length;
	for (var j=0; j<n;++j) {
		var kk=indexes[j];
		var jj= reverse1? n-j-1: j;
		sorted_Array[jj]=T[kk];
	}

 // sorted _Array is an array of html  coded table rows
	sorted_Table=tableSpecWas;
	if (skipline1) sorted_Table+=T[0]
	for (var k=0;k<sorted_Array.length;++k) sorted_Table+="<tr"+sorted_Array[k]+"</tr>"
	if (usingdiv) sorted_Table+="</table>";
	return sorted_Table;
}


function myReplace() {// sometimes easier to use than the Jscript version because doesnt get confused b regexp reserved characters. 
// Parameter Array:  string to be sorted
//          then    pairs,  string to be replaced, replacement  
// eg: value of  myReplace("mr green and mrs green","mr","Mr","green","Green")  
// is: Mr Green and Mrs Green  (replacement is always global. Order may matter, and is done in paramater order
	var s=arguments[0];
	if (typeof s=="undefined") return "";
	for (var ja=1;ja<arguments.length;ja+=2){
		var a=arguments[ja];
		var b=arguments[ja+1];
		if (s=="" || a=="") return s;
		var p=s.split(a);// ie Issue
		var m = p.length;
		var z="";
		for ( var j=0;j<m;++j) { z=z+p[j]; if (j<m-1) z=z+b; }
		s=z;
	}
	return s;
}
