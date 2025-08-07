import React, { useEffect, useRef } from 'react';
import {
  Chart,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  PieController,
  BarController
} from 'chart.js';

// ✅ Register all required components INCLUDING controllers
Chart.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  PieController,
  BarController
);

function EmotionCharts({ data }) {
  const pieRef = useRef(null);
  const barRef = useRef(null);
  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);

  useEffect(() => {
    if (!data) return;

    const labels = Object.keys(data);
    const values = Object.values(data);
    const colors = [
      '#ff6384', '#36a2eb', '#ffcd56',
      '#4bc0c0', '#9966ff', '#ff9f40'
    ];

    // ✅ Destroy old instances
    if (pieChartRef.current) {
      pieChartRef.current.destroy();
    }
    if (barChartRef.current) {
      barChartRef.current.destroy();
    }

    // ✅ PIE Chart
    pieChartRef.current = new Chart(pieRef.current, {
      type: 'pie',
      data: {
        labels,
        datasets: [{
          data: values,
          backgroundColor: colors,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Emotion Distribution (Pie Chart)',
            font: {
              size: 18
            }
          }
        }
      }
    });

    // ✅ BAR Chart
    barChartRef.current = new Chart(barRef.current, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Emotion Level',
          data: values,
          backgroundColor: colors,
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Emotion Levels (Bar Chart)',
            font: {
              size: 18
            }
          }
        }
      }
    });

    // ✅ Cleanup on unmount
    return () => {
      pieChartRef.current?.destroy();
      barChartRef.current?.destroy();
    };
  }, [data]);

  return (
    <div style={{ marginTop: '30px' }}>
      <div style={{ maxWidth: '500px', margin: 'auto' }}>
        <canvas ref={pieRef} width="400" height="400" />
      </div>
      <div style={{ maxWidth: '600px', margin: '40px auto' }}>
        <canvas ref={barRef} width="500" height="400" />
      </div>
    </div>
  );
}

export default EmotionCharts;
