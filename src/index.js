/**
 * es6测试代码
 * 符号在webpack.config.js的alias里面配置 alias原理去百度吧~
 */
import Ctp from '@/lib/console-to-page'; // 导入输出工具
Ctp('欢迎使用es6代码编辑测试');

import * as faceapi from 'face-api.js';

console.log(faceapi)

faceapi.nets.ssdMobilenetv1.load('/models').then(() => {
    let input = document.getElementById('images')

    faceapi.detectAllFaces(input).then((res) => {
        console.log(res)
    }).catch((err) => {
        console.log(err)
    })
})

