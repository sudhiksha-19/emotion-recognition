import numpy as np
import cv2
from tensorflow.keras.models import load_model
from utils.fuzzy_logic import apply_fuzzy_logic

# Load the model
model = load_model('model/emotion_model.h5')

# Define the emotion classes
emotion_labels = ['Angry', 'Fear', 'Happy', 'Neutral', 'Sad', 'Surprise']

def predict_emotion(image_path):
    try:
        img = cv2.imread(image_path)
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        face = cv2.resize(gray, (48, 48))
        face = face.astype('float32') / 255.0
        face = np.expand_dims(face, axis=0)
        face = np.expand_dims(face, axis=-1)

        predictions = model.predict(face)[0]
        predicted_index = np.argmax(predictions)
        predicted_emotion = emotion_labels[predicted_index]
        confidence = float(predictions[predicted_index])

        # Convert to list for frontend
        prediction_distribution = predictions.tolist()
        emotion_distribution = {
            emotion_labels[i]: round(float(prob) * 100, 2)
            for i, prob in enumerate(predictions)
        }

        fuzzy_result = apply_fuzzy_logic(emotion_distribution, emotion_labels)


        return {
            'emotion': predicted_emotion,
            'confidence': confidence,
            'distribution': emotion_distribution,
            'analysis': fuzzy_result
        }

    except Exception as e:
        print(f"❌ Prediction failed: {e}")
        return {
            'error': 'Prediction failed. Check backend logs.'
        }
