
$('#irow').click(function(){
		num_rows = $('#row').val()
    if($('#row').val()){
    for(let i = 0; i < 2*num_rows+1; i++){
        $('#lmatable tbody').append($("#lmatable tbody tr:last").clone());
        $('#lmatable tbody tr:last :checkbox').attr('checked',false);
        $('#lmatable tbody tr:last td:first').html(num_rows - i/2);
        }
    }else{alert('Enter Video Length in Seconds');}
});


 $('#icol').click(function(){
    if(lmaSel){
        $('#lmatable tr').append($("<td>"));
        $('#lmatable thead tr>td:last').html(lmaSel);
        $('#lmatable tbody tr').each(function(){$(this).children('td:last').append($('<input class="checkbox" type="checkbox"  data-checked="0">'))});
    }else{alert('Choose LMA Concept');}
});

   $('.checkbox').click(function() {
   if ($(this).data("checked") === 0) {
      $(this).data("checked", "1")
   } else {
      $(this).data("checked", "0")
     }
  });

// function changeOptions() {
//     let col = document.getElementById("col").value;
//     let id = `options-${col}`;
//     let itemSelection = document.getElementById("itemSelection");
//     for (let optgroup of itemSelection.children) {
//         let match = optgroup.id === id;
//         optgroup[(match ? "remove" : "set") + "Attribute"]("hidden", "hidden");
//         if (match) {
//             itemSelection.value = optgroup.children[0].value;
//         }
//
//     let itemSelection2 = document.getElementById("itemSelection2");
//     for (let optgroup of itemSelection2.children) {
//         let match = optgroup.id === id;
//         optgroup[(match ? "remove" : "set") + "Attribute"]("hidden", "hidden");
//         if (match) {
//             itemSelection2.value = optgroup.children[0].value;
//         }
//     }
// }
// }

// changeOptions();

var lmaObject = {
    "Body": {
        "Parts": ["Head","Center of Levity","Waist","Center of Gravity","Shoulder L","Shoulder R","Elbow L","Elbow R","Wrist L","Wrist R","Fingers L","Fingers R","Hip L","Hip R","Knee L","Knee R","Ankle L","Ankle R","Toes L","Toes R"],
        "Basic Body Actions": ["Change of Support (act)","Change of Support (travel)","Posture","Gesture","Condense","Expand","Rotate","Hold","Focus","Vocalize","Touch","Travel","Roll","Slide","Walk","Run","Jump","1:1 Same","1:1 Other","1 to 2","2 to 1","2 to 2"],
				"Features": ["Axis of Length", "Upper","Lower","Midline","Left","Right","Core","Proximal","Distal","Face"],
				"Breath": ["Breath", "Inhale","Exhale"],
				"Sensing": ["Weight Sensing", "Flow Sensing"],
				"Patterns": ["Radial Symmetry","Spinal","Core/Distal","Head/Tail","Upper/Lower","Right/Left","Cross-lateral"]
    },
    "Space": {
        "Zones": ["High","Low","Right","Left","Front","Back"],
        "Reach Space": ["Near","Middle","Far"],
				"Planes": ["Vertical Plane","Sagittal Plane","Horizontal Plane"],
				"Pathways": ["Central","Peripheral","Transverse"],
				"Spatial Direction": ["Middle","Forward Middle","Left Middle","Right Middle","Back Middle","Place Middle","Left Forward Middle","Right Forward Middle","Left Back Middle","Right Back Middle","Low","Forward Low","Left Low","Right Low","Back Low","Place Low","Left Forward Low","Right Forward Low","Left Back Low","Right Back Low","High","Forward High","Left High","Right High","Back High","Place High","Left Forward High","Right Forward High","Left Back High","Right Back High"]
    },
		"Shape": {
				"Still Shapes": ["Pin","Ball","Wall","Tetrahedron","Screw"],
				"Primary Shape Patterns": ["Concave","Convex","Gather","Scatter"],
				"Modes of Shape Change": ["Shape Flow","Directional","Arc-like","Spoke-like","Shaping","Inner Shaping"],
				"Shape Qualities": ["Rising","Spreading","Enclosing","Retreating","Advancing","Sinking"]
		},
		"Effort": {
				"All Efforts": ["Sudden", "Sustained","Strong","Light","Direct","Indirect","Free","Bound"]
		},
		"Timing": {
			  "Phrasing": ["Even","Impulsive","Impactive","Swing","Becoming","Diminishing","Vibratory"]
		}
}
// window.onload = function () {
//     var lmaSel = document.getElementById("lmaSel"),
//         lmasubSel = document.getElementById("lmasubSel"),
//         lmasubsubSel = document.getElementById("lmasubsubSel");
//     for (var state in lmaObject) {
//         lmaSel.options[lmaSel.options.length] = new Option(state, state);
//     }
//     lmaSel.onchange = function () {
//         lmasubSel.length = 1; // remove all options bar first
//         lmasubsubSel.length = 1; // remove all options bar first
//         if (this.selectedIndex < 1) return; // done
//         for (var county in lmaObject[this.value]) {
//             lmasubSel.options[lmasubSel.options.length] = new Option(county, county);
//         }
//     }
//     // lmaSel.onchange(); // reset in case page is reloaded
//     lmasubSel.onchange = function () {
//         lmasubsubSel.length = 1; // remove all options bar first
//         if (this.selectedIndex < 1) return; // done
//         // var cities = lmaObject[lmasubSel.value][this.value];
//         for (var city in lmaObject[lumasubSel.value][this.value]) {
//             lmasubsubSel.options[lmasubsubSel.options.length] = new Option(city, city);
//         }
//     }
// }
var lmaSel;
window.onload = function () {
    var stateSel = document.getElementById("stateSel"),
        countySel = document.getElementById("countySel"),
        citySel = document.getElementById("citySel");
    for (var state in lmaObject) {
        stateSel.options[stateSel.options.length] = new Option(state, state);
    }
    stateSel.onchange = function () {
        countySel.length = 1; // remove all options bar first
        citySel.length = 1; // remove all options bar first
        if (this.selectedIndex < 1) return; // done
        for (var county in lmaObject[this.value]) {
            countySel.options[countySel.options.length] = new Option(county, county);
        }
    }
    stateSel.onchange(); // reset in case page is reloaded
    countySel.onchange = function () {
        citySel.length = 1; // remove all options bar first
        if (this.selectedIndex < 1) return; // done
        var cities = lmaObject[stateSel.value][this.value];
        for (var i = 0; i < cities.length; i++) {
            citySel.options[citySel.options.length] = new Option(cities[i], cities[i]);
        }
    }
		stateSel.onchange(); // reset in case page is reloaded
		citySel.onchange = function () {
			lmaSel = this.value;
			window.alert(lmaSel);
		}
}

var tableValues = [];
 function tableToArray(){
window.alert("HERE");
//gets table
var oTable = document.getElementById("lmatable");
window.alert(oTable)

//gets rows of table
var rowLength = oTable.rows.length;

//loops through rows
for (i = 0; i < rowLength; i++){

  //gets cells of current row
   var oCells = oTable.rows.item(i).cells;

   //gets amount of cells of current row
   var cellLength = oCells.length;
   if (oCells.item(0).innerHTML = "<"){

   // window.alert(oCells);

   } else {
   //loops through each cell in current row
   for(var j = 0; j < cellLength; j++){
      // get your cell info here

      var cellVal = oCells.item(j).innerHTML;
      console.log(cellVal);


  if (cellVal){

      }
      tableValues.push(cellVal);
      }
   }
}
window.alert(tableValues);

}

 // To CSV
function exportToCsv(filename, rows) {
        var processRow = function (row) {
            var finalVal = '';
            for (var j = 0; j < row.length; j++) {
                var innerValue = row[j] === null ? '' : row[j].toString();
                if (row[j] instanceof Date) {
                    innerValue = row[j].toLocaleString();
                }
                var result = innerValue.replace(/"/g, '""');
                if (result.search(/("|,|\n)/g) >= 0)
                    result = '"' + result + '"';
                if (j > 0)
                    finalVal += ',';
                finalVal += result;
            }
            return finalVal + '\n';
        };

        var csvFile = '';
        for (var i = 0; i < rows.length; i++) {
            csvFile += processRow(rows[i]);
        }

        var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

		// $('#downloadCSV').click(function () {
		// // Initialize an array to store the checkbox values
		// var data = [];
		//
		// // Iterate through each checkbox and add its state (checked or not) to the array
		// $('.checkbox').each(function () {
		// 		data.push($(this).prop('checked') ? '1' : '0');
		// });
		//
		// // Convert the data array to a CSV string
		// var csvContent = 'Name,Selected\n';
		// for (var i = 0; i < data.length; i++) {
		// 		csvContent += 'Item ' + (i + 1) + ',' + data[i] + '\n';
		// }
		//
		// // Create a data URI for the CSV content
		// var blob = new Blob([csvContent], { type: 'text/csv' });
		// var url = URL.createObjectURL(blob);
		//
		// // Create a download link and trigger the download
		// var a = document.createElement('a');
		// a.href = url;
		// a.download = 'checkbox_data.csv';
		// a.click();
		// URL.revokeObjectURL(url);

function downloadCSV(){
window.alert("here in downloadCSV")
tableToArray()
exportToCsv('export.csv', tableValues)
}
/* $("[id$=exportButton]").click(function(e) {
    window.open('data:application/vnd.ms-excel,' + encodeURIComponent( $('div[id$=divTableDataHolder]').html()));
    e.preventDefault();
});
 */
