from utils.predict import predict_emotion
emotion, scores = predict_emotion("static/uploads/")
print(emotion)
print(scores)
