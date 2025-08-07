def apply_fuzzy_logic(distribution, labels):
    dominant_emotion = max(distribution, key=distribution.get)
    level = distribution[dominant_emotion]

    # Just sample logic — customize this
    if dominant_emotion in ['Sad', 'Angry', 'Fear']:
        return f"High stress detected. Emotion: {dominant_emotion} at {level}%.\nRecommended to relax and take deep breaths."
    elif dominant_emotion == 'Happy':
        return f"You're happy and energetic! Keep enjoying your day 🎉"
    elif dominant_emotion == 'Surprise':
        return f"You seem surprised, possibly from a sudden event. Stay calm and grounded!"
    else:
        return "Emotion is neutral. You're stable and composed."
