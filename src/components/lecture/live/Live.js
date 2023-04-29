import React, { useEffect, useState, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import Webcam from 'react-webcam';
import { loadGraphModel } from '@tensorflow/tfjs-converter';
// import styles from './ModifyAttendence.module.css';

const Live = () => {


  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);

  useEffect(() => {
    async function loadModel() {
      const loadedModel = await tf.loadGraphModel('http://localhost:3000/model');
      setModel(loadedModel);
    }

    async function loadModel() {
        const response = await fetch('/api/live');
        const model = await response.json();
        console.log('모델 로드')
        console.log(model);
        setModel(model);
      }
    loadModel();
    
  }, []);

  useEffect(() => {
    if (model && webcamRef.current) {
      detectFrame();
    }
  }, [model, webcamRef]);

  const detectFrame = () => {
    const video = webcamRef.current.video;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    console.log(model.modelTopology.node[637])
    console.log(model.signature.outputs.Identity_3)


    const modelWidth = model.inputs[0].shape[2];
    const modelHeight = model.inputs[0].shape[1];
    canvas.width = modelWidth;
    canvas.height = modelHeight;
    setInterval(async () => {
      const img = tf.browser.fromPixels(video);
      const resized = tf.image.resizeBilinear(img, [modelHeight, modelWidth]);
      const casted = resized.cast('int32');
      const expanded = casted.expandDims(0);
      const obj = await model.executeAsync(expanded);
      const boxes = await obj[0].array();
      const scores = await obj[1].array();
      const classes = await obj[2].array();
      const detections = [];
      boxes[0].forEach((box, i) => {
        const minY = box[0] * video.videoHeight;
        const minX = box[1] * video.videoWidth;
        const maxY = box[2] * video.videoHeight;
        const maxX = box[3] * video.videoWidth;
        const score = scores[0][i];
        const clazz = classes[0][i];
        if (score > 0.75) {
          detections.push({ minY, minX, maxY, maxX, score, clazz });
        }
      });
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      detections.forEach(detection => {
        const { minY, minX, maxY, maxX } = detection;
        const width = maxX - minX;
        const height = maxY - minY;
        ctx.beginPath();
        ctx.rect(minX, minY, width, height);
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#ff0000';
        ctx.stroke();
      });
      tf.dispose([img, resized, casted, expanded, obj]);
    }, 1000 / 30);
  };

  return (
    <div>
      <Webcam
        ref={webcamRef}
        width={640}
        height={360}
        videoConstraints={{ facingMode: 'user' }}
      />
      <canvas
        ref={canvasRef}
      />
    </div>
  );
}

export default Live;