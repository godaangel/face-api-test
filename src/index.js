/**
 * es6测试代码
 * 符号在webpack.config.js的alias里面配置 alias原理去百度吧~
 */
import Ctp from '@/lib/console-to-page'; // 导入输出工具
Ctp('欢迎使用es6代码编辑测试');

import * as faceapi from 'face-api.js';
import {fabric} from 'fabric'

let canvasContext = document.getElementById("canvas").getContext("2d")
var video = document.getElementById('video')

faceapi.nets.ssdMobilenetv1.load('/models').then(() => {
    faceapi.nets.faceLandmark68Net.load('/models').then(() => {
        faceapi.nets.tinyFaceDetector.load('/models').then(() => {
            openCamera()
        })
    })
})

function startDetect() {
    let input = document.getElementById('video')
    faceapi.detectAllFaces(input).withFaceLandmarks().then((res) => {
        console.log(res)
        let landmarks = res[0].landmarks
        const rightEyebrowPoints = landmarks.getRightEyeBrow();
        const leftEyebrowPoints = landmarks.getLeftEyeBrow();
        const outlinePoints = landmarks.getJawOutline();

        console.log(rightEyebrowPoints, leftEyebrowPoints, outlinePoints)
        
        drawBox(res[0].detection)
    }).catch((err) => {
        console.log(err)
    })
}

function openCamera() {
    navigator.mediaDevices.getUserMedia({ audio: false, video: {
        width: 300,
        height: 200
    }})
    .then(function(stream) {
      /* 使用这个stream stream */
      console.log('----', stream)
      video.srcObject = stream;
      video.onloadedmetadata = function(e) {
        video.play();
        drawCanvas()
      };
    })
    .catch(function(err) {
      /* 处理error */
    });
}

function drawCanvas() {
    startDetect()
    setTimeout(() => {
        drawCanvas()
    }, 34);
}

function drawBox(res) {
    let {x, y, width, height} = res.box
    const getFaceRadian = (jawPos, midPointOfEyebrows) =>
    Math.PI - Math.atan2(jawPos.x - midPointOfEyebrows.x, jawPos.y - midPointOfEyebrows.y);

    canvasContext.drawImage(video, 0, 0, 300, 200);
    canvasContext.strokeStyle = "red";
    canvasContext.lineWidth = 4;
    canvasContext.strokeRect(x, y, width, height);
}


