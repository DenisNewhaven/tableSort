
function GetRtable(){
var n=document.getElementById("nRows").value
var k=document.getElementById("nCols").value
var q=makeTable (n,k,"experiment")
document.getElementById("tableDivName").innerHTML=q;
document.getElementById("tableType").innerHTML="Random-string table, size "+n+"X"+k;
}
function makeTable(nRows,nCols,nm){
	var z="<table id="+nm+">"
	for (var i=0;i<nRows;++i){
		z+="<tr>"
		for (var j=0;j<nCols;++j) z+="<td>"+ranval()+"</td>";
		z+="</tr>"
	}
	z+="</table>";
	return z;
}
function ranval(){
	var S="abcdefghijklmnopqrstuvwxyzABCDEFHIJKLMNOPQRSTIVWXYZ1234567890";
	var mChars=S.length;
	var nChars=parseInt(+4+1*Math.random()*10);
	if (nChars>0 ){
		var q=""
		for (var j=0;j<nChars;++j){
			var k=parseInt(Math.random()*mChars);
			if (k<mChars) q+=S.substring(k,+1+k)
		}
	} else q="EMPTY"
	return q;
}


function sortexample(){
var indexes=[];
var separator= " ::: "// anything that won't occur in the stuff to be sorted
var q=["pqr","xyx","abc","mnp"]
var data=["I belong to pqr","I belong to xyx","I belong to abc","I belong to mnp"]
key=[];
var z="";
for (var j=0;j<q.length;++j) { key.push(q[j]+separator+j); z+=", " +key[j];}
//alert ("modified keys before sort: "+z);
var key2=key.sort();
var z="";
for (var j=0;j<q.length;++j) z+="\r"+key2[j]
//alert ("sorted modified keys: "+z)
z="";
for (j=0;j<key2.length;++j) {
	var v=key2[j];
	var i=v.indexOf(separator);
	var k=v.substr(i+separator.length);
	indexes[j]=k;
	z+= indexes[j]+", ";
	 
}
//alert("indices: "+z);
var data2=[];
for (var j=0; j<indexes.length;++j) data2[indexes[j]]=data[j];
var z="Before sort";
for (j=0 ;j<data.length;++j) z+="\r"+data[j];
//alert(z)
z="";
z+="After Sort"
for (j=0 ;j<data2.length;++j) z+="\r"+data2[j];
//alert(z);
}

function show2Array(XX,caption){
var z="";
for (j=0;j<XX.length;++j) {
var X=XX[j];
var y="";
for (var k=0;k<X.length;++k) y+=(y!=""? " ,  ":"")+X[k]
z+="\r"+y;
}
var q=""
if ( caption!=undefined) q=caption; 
alert(q+"\r"+z)

}
function showArray(X,caption){
var z="",q="";
for (j=0;j<X.length;++j) z+="\r"+X[j];
if ( caption!=undefined) q=caption; 
alert(q+"\r"+z)
}
function tableToArray2(mytable) {

		var t= document.getElementById(mytable).innerHTML;
//get rid of all superflous html in the table
// NOTE: this won't cope with style, merged columns or anything except simplest table
// using  myReplace  instead of Replace to avoid possible complications with reserved chars in regexp
// should cope with  mytable  being the actual table or a div containing it
		t=myReplace(t,"</tr>","","</td>","","<tbody>","","</tbody>","","<table>","","</table>","");
		var Rows=t.split("<tr>");
		var RowArray=[];
		for (var k=1;k<Rows.length;++k){
		var x=Rows[k];
		x=x.replace("<td>","");
		var thisRow=x.split("<td>");
		RowArray[k-1]=thisRow;
	}
	return RowArray ;
}
function array2toTable(T,nm) {
	var z="<table id="+nm+">";
	for (var j=0;j<T.length;++j){
		var R=T[j];
		z+="<tr>"
		for (var k=0;k<R.length;++k) z+="<td>"+R[k]+"</td>";
		z+="</tr>"
	}
	z+="</table>"
	return z;
}