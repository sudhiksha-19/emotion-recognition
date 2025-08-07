import React from 'react';
import EmotionCharts from './EmotionCharts';
import './EmotionReport.css'; // Optional for styling

export function generateEmotionReport(distribution) {
  const sorted = Object.entries(distribution).sort((a, b) => b[1] - a[1]);
  const topEmotion = sorted[0][0];
  const topConfidence = sorted[0][1];

  let feedback = `🧠 Top Emotion: ${topEmotion} (${topConfidence}%)\n\nEmotional Breakdown:\n`;

  sorted.forEach(([emotion, value]) => {
    feedback += `- ${emotion}: ${value}%\n`;
  });

  if (['Sad', 'Angry', 'Fear'].includes(topEmotion)) {
    feedback += `\n⚠️ You're experiencing high levels of ${topEmotion}. It's recommended to take a break, breathe deeply, or talk to someone.`;
  } else if (['Happy', 'Surprise'].includes(topEmotion)) {
    feedback += `\n😊 You're in a great emotional state. Keep spreading positivity!`;
  } else {
    feedback += `\n🙂 You seem neutral and calm. A balanced mindset is powerful.`;
  }

  return feedback;
}

const EmotionReport = ({ emotionDistribution }) => {
  if (!emotionDistribution || Object.keys(emotionDistribution).length === 0) {
    return <p style={{ textAlign: 'center', color: 'gray' }}>No emotion data available.</p>;
  }

  const report = generateEmotionReport(emotionDistribution);

  return (
    <div style={{ padding: '20px' }}>
      <EmotionCharts data={emotionDistribution} />
      <div className="emotion-report-box">
        <h3>📋 Detailed Emotion Report</h3>
        <pre>{report}</pre>
      </div>
    </div>
  );
};

export default EmotionReport;
