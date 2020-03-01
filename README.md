# tableSort
Jacascript procedure to sort an html table by a designated column
Sorting Tables: tableSort.js
The function :
                    sortTable(divID,skipFirstLine,Reverse)

       extracts and sorts the first column of a table in the div referred to, and re-arranges the table in the corresponding order.
Parameters:

        divID                 the ID of a div containing the table. It should not contain anything else.
        skipFirstLine    if present and true, excludes the first row from the sort
        reverse             if present and true, sorts in reverse order

    Alternatively :   the function sortTableHtm, with the same parameters returns the html of the sorted table but does not re-insert it in the div
    The table to be sorted may contain styling and/or cell within-in row merges (that is, colspans are OK but rowspans not)
    
    An example of a table with some styling and some merged columns is provided in tableSort.htm, which also has  facilities for making arbitrarily sized random-string tables, for sorting them, and reporting on the time taken (tableSort.htm requires tableSort.js and also tableSortAux.js)
    
    For now, the first column of the table is assumed to be the one to sort on. 
    It can contain styling in the '<td>' part but not in the text part; 
    So don't use for example, <H2>James Joyce<H2> in the text of the table cell, as this would sort as if <H2> was part of the text. 
   Modifications to allow and exclude styling of this type are possible,but its easy enough to avoid this requirement  by relying on styling within the <td> instead.                                                            
    
    Case:     sorting is now case independent.This could be made optional.
   
   To adjust sorting keys in other ways, the user can  provide a function called 'customKey' which carries out the required operation. 
   EG|:

                    function customKey(key) { key=return replace("^#","") }

or go to line 50 or thereabouts of tableSort.js and insert code to edit the value of textOfKey

Everything needed for sorting a table by first column is in the file    tableSort.js

tableSort1.htm  is  a test-bed for tableSort.js. It includes a facility to generate a large random text file to trest srting spped. Note that the times
reported do mot inlud rendering times which can be significant with a large file.
tableSortAux.js comtains a few utilities needed by tableSort.htm
