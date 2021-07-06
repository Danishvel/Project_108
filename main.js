Prediction_1 = "";
Prediction_2 = "";

Webcam.set({
    width:350,
    height:300,
    image_formate:'png',
    png_quality:'100'
});

camera = document.getElementById("camera");

Webcam.attach(camera);

function Snaps(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="cap_img" src="'+ data_uri +'"/>'
    });
}

console.log("Version : ", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/YO5iw_dET/model.json", modelloaded);

function modelloaded() {
    console.log("Loaded!!!!!!");
}

function Speak() {
    var synth = window.speechSynthesis;

    Speak_data1 = "The Prediction 1 is" + Prediction_1;
    Speak_data2 = "The Prediction 2 is" + Prediction_2;

    var utterthis = new SpeechSynthesisUtterance(Speak_data1 + Speak_data2);

    synth.speak(utterthis);
}

function Check() {
    img = document.getElementById("cap_img");
    classifier.classify(img, gotresult);
}

function gotresult(error, results) {
    if (error) {
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML =results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        Prediction_1 = results[0].label;
        Prediction_2 = results[1].label;
        Speak();
        if (results[0].label == "best") {
            document.getElementById("Update_emotion").innerHTML = "&#128077;";
        }
        if (results[0].label == "victory") {
            document.getElementById("Update_emotion").innerHTML = "&#9996;";
        }
        if (results[0].label == "amazing") {
            document.getElementById("Update_emotion").innerHTML = "&#128076;";
        }
        if (results[1].label == "best") {
            document.getElementById("Update_emotion2").innerHTML = "&#128077;";
        }
        if (results[1].label == "victory") {
            document.getElementById("Update_emotion2").innerHTML = "&#9996;";
        }
        if (results[1].label == "amazing") {
            document.getElementById("Update_emotion2").innerHTML = "&#128076;";
        }
    }
}