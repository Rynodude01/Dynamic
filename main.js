img = "";
objects = [];
status = ""
function setup(){
    canvas = createCanvas(400,400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400,400);
    video.hide();
    objectDetector = ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}
function modelloaded(){
    console.log("model has loaded");
    status = true;
}
function gotresults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results)
    objects = results;
}
function draw(){
    image(video,0,0,400,400);
    if(status != ""){
        objectDetector.detect(video,gotresults);
    for(i = 0; i < objects.length; i++){
        document.getElementById("status").innerHTML = "Status: Objects Detected";
        document.getElementById("number_of_objects").innerHTML = "Number Of Objects Detected Are: "+objects.length;
        fill(255,0,0);
        percent = floor(objects[i].confidence*100);
        text(objects[i].label+" "+percent+"%", objects[i].x,objects[i].y);
        noFill();
        stroke(255,0,0);
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    }
}
}