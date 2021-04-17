document.write('<div class="wrapper"><canvas id="signature-pad" class="signature-pad" width=400 height=200></canvas></div>');

var canvas = document.getElementById('signature-pad');
ctx = canvas.getContext("2d");
//https://stackoverflow.com/questions/38894822/how-to-add-a-background-image-to-signature-pad
var background = new Image();
background.src = Microsoft.Dynamics.NAV.GetImageResource("Images/demoimage.png");
background.onload = function() {
    ctx.drawImage(background, 0, 0);
};
background.setAttribute('crossorigin', 'anonymous');
// Adjust canvas coordinate space taking into account pixel ratio,
// to make it look crisp on mobile devices.
// This also causes canvas to be cleared.
function resizeCanvas() {
    // When zoomed out to less than 100%, for some very strange reason,
    // some browsers report devicePixelRatio as less than 1
    // and only part of the canvas is cleared then.
    var ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
   

// Make sure the image is loaded first otherwise nothing will draw.
  
}



window.onresize = resizeCanvas;
resizeCanvas();

var signaturePad = new SignaturePad(canvas, {
    backgroundColor: 'rgb(255, 255, 255)' // necessary for saving image as JPEG; can be removed is only saving as PNG or SVG
});

Microsoft.Dynamics.NAV.InvokeExtensibilityMethod('OnControlAddInReady');



function SaveSignature(image = "") {
    Microsoft.Dynamics.NAV.InvokeExtensibilityMethod('AfterSaveSignature', [canvas.toDataURL()]);
};


function ClearPad() {
    signaturePad.clear();

};

function Undo() {
    var data = signaturePad.toData();
    if (data) {
        data.pop(); // remove the last dot or line
        signaturePad.fromData(data);
    }

};
