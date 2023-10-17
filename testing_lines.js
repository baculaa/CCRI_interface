//Canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
//Variables
var canvasx = $(canvas).offset().left;
var canvasy = $(canvas).offset().top;
var width = canvas.width
var height = canvas.height
var last_mousex = last_mousey = 0;
var mousex = mousey = 0;
var mousedown = false;
// var background = new Image();

let line_points = Array(height).fill().map(() => Array(width).fill(0));


// background.src = "https://i.imgur.com/NHSs8cT.png";
//
// background.onload = function(){
//     ctx.drawImage(background,0,0,width,height);
// }

//Mousedown
$(canvas).on('mousedown', function(e) {
    last_mousex = parseInt(e.clientX-canvasx);
	  last_mousey = parseInt(e.clientY-canvasy);
    mousedown = false;
});

//Mouseup
$(canvas).on('mouseup', function(e) {
  mousex = parseInt(e.clientX-canvasx);
	mousey = parseInt(e.clientY-canvasy);
    mousedown = true;
});



//Mousemove
$(canvas).on('mousemove', function(e) {
    /* mousex = parseInt(e.clientX-canvasx);
      mousey = parseInt(e.clientY-canvasy); */
    if(mousedown) {
        /* ctx.clearRect(0,0,canvas.width,canvas.height) */ //clear canvas
      ctx.beginPath();
 			 ctx.strokeStyle = "#000"; //Change Line Color
  	ctx.lineWidth = 2; //Change Line Width/Thickness
  ctx.moveTo(last_mousex,last_mousey);
  ctx.lineTo(last_mousex,mousey);
  ctx.stroke();
  for(let i=mousey; i < last_mousey; i++){
  line_points[i][last_mousex] = 1;}
    }
    //Output
    /* $('#output').html('current: '+mousex+', '+mousey+'<br/>last: '+last_mousex+', '+last_mousey+'<br/>mousedown: '+mousedown); */
});



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
			// window.alert(lmaSel);
		}
}


function addFixedLineToArray(x,starty,endy){
	// window.alert("Fixed Line to Array");
	for(let i=starty; i < endy; i++){
		// window.alert(i);
  line_points[i][x] = 2;}
    }

var columnCount = 1;
var hLinePlace = 30;
var lmaSelectedCols = [];
function addLMAColumn(){
	ctx.setLineDash([0, 0])
	ctx.beginPath();
	ctx.strokeStyle = "#7a7a7a"; //Change Line Color
	ctx.lineWidth = 2; //Change Line Width/Thickness
	var columnWidth = 30
	ctx.textAlign ="middle";
	ctx.font = "13px serif";
	ctx.fillStyle = "black";
	hLinePlace += (lmaSel.toString().length*10);
	ctx.fillText(lmaSel.toString(), hLinePlace-5, 10,500);
	ctx.moveTo(hLinePlace,0);
	ctx.lineTo(hLinePlace,height);
	ctx.stroke();
	addFixedLineToArray(hLinePlace,0,height);
	line_points[0][hLinePlace] = lmaSel;
	lmaSelectedCols.push(lmaSel);
	// columnCount+=1;
}

function makeTimeColumn(){
	var num_rows=3;
	var increment = 5;
	var spacing = canvas.height/(increment*num_rows);
	ctx.setLineDash([5, 10]);
	for(let i = 0; i < increment*num_rows+1; i++){

		ctx.beginPath();
		ctx.strokeStyle = "#7a7a7a"; //Change Line Color
		ctx.lineWidth = 2; //Change Line Width/Thickness
		ctx.moveTo(0,i*spacing);
		ctx.lineTo(width,i*spacing);
		// ctx.endPath();
		ctx.stroke();
	}
	ctx.setLineDash([0, 0])
	ctx.beginPath();
	ctx.strokeStyle = "#7a7a7a"; //Change Line Color
	ctx.lineWidth = 2; //Change Line Width/Thickness
	ctx.moveTo(30,0);
	ctx.lineTo(30,height);
	ctx.stroke();
	addFixedLineToArray(30,0,height);
	var j =0;
	while(j< increment*num_rows+1){
		// window.alert(j);
		ctx.textAlign ="right";
		ctx.font = "13px serif";
		ctx.fillStyle = "black";
		ctx.fillText((num_rows-(j/increment)).toFixed(1), 25, (j*spacing)+15,500);
		j+=1;
		// window.alert(j);
	}

}



function getRidBlankColumns(array_name){
	var numFilledCols = 0;
	var colsToSave = [];
	for (var i=0; i<array_name[0].length; i++){
		columnCheck=0;
		for (var j=0; j<array_name.length; j++){
			columnCheck += array_name[j][i];
		}
		if (columnCheck > 0 && columnCheck < height+2){
			numFilledCols += 1;
			colsToSave.push(i)
      /* window.alert(i) */;
      window.alert(colsToSave);
		}
	}
	let condensedArray = Array(height+1).fill().map(() => Array(numFilledCols).fill(0));
  for (var k=0; k<numFilledCols; k++){
  columnNumber = colsToSave[k];
  for (var i=0; i<height; i++){
  condensedArray[i][k] = array_name[i][columnNumber];
	condensedArray[0][k] = lmaSelectedCols[k];
  }
  }
  return condensedArray;
}




// To CSV
function exportToCsv(filename, rows) {
        var processRow = function (row) {
            var finalVal = '';
            for (var j = 0; j < row.length; j++) {
                var innerValue = row[j] === null ? '' : row[j].toString();
                if (row[j] instanceof Date) {
                    innerValue = row[j].toLocaleString();
                };
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

function clearAllButton(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	makeTimeColumn();
}


function downloadCSV(){
exportToCsv('export.csv', getRidBlankColumns(line_points))}


// /* VIDEO CONTROLS */
//
const video = document.querySelector(".video");
const toggleButton = document.querySelector(".toggleButton");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress__filled");

function togglePlay() {
  if (video.paused || video.ended) {
    video.play();
  } else {
    video.pause();
  }
}

function updateToggleButton() {
  toggleButton.innerHTML = video.paused ? "►" : "❚ ❚";
}

function handleProgress() {
  const progressPercentage = (video.currentTime / video.duration) * 100;
  progressBar.style.height = `${progressPercentage}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetY / progress.offsetHeight) * video.duration;
  video.currentTime = scrubTime;
}
//
toggleButton.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateToggleButton);
video.addEventListener("pause", updateToggleButton);

video.addEventListener("timeupdate", handleProgress);
progress.addEventListener("click", scrub);
