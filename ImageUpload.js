import React, { useState } from 'react';
import axios from 'axios';
import EmotionCharts from './EmotionCharts';
import { generateEmotionReport } from './emotionReport';
import './ImageUpload.css';

function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [emotionData, setEmotionData] = useState(null);
  const [report, setReport] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    setPrediction(null);
    setEmotionData(null);
    setReport('');
  };

  const handleSubmit = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('file', selectedImage);

    try {
      const res = await axios.post('http://127.0.0.1:5000/predict', formData);
      setPrediction(res.data);
      setEmotionData(res.data.distribution);
      const generated = generateEmotionReport(res.data.distribution);
      setReport(generated);
    } catch (error) {
      console.error('Prediction error:', error);
      setPrediction({ error: 'Prediction failed. Check backend logs.' });
    }
  };

  return (
    <div className="upload-container">
      <h2 className="upload-title">🎯 Upload an Image for Emotion Detection</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} className="file-input" />

      {previewUrl && <img src={previewUrl} alt="Preview" className="image-preview" />}

      <button onClick={handleSubmit} className="predict-button">
        Predict Emotion
      </button>

      {prediction && (
        <div className="prediction-box">
          {prediction.error ? (
            <p className="error-message">{prediction.error}</p>
          ) : (
            <>
              <p><strong>Emotion:</strong> {prediction.emotion}</p>
              <p><strong>Confidence:</strong> {(prediction.confidence * 100).toFixed(2)}%</p>
            </>
          )}
        </div>
      )}

      {emotionData && <EmotionCharts data={emotionData} />}

      {report && (
        <div className="report-box">
          <h3>📋 Emotion Analysis Report:</h3>
          <pre>{report}</pre>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
