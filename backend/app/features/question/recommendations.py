from flask import Blueprint, jsonify, request
from .models import Question
from app.features.submission.models import Submission
import random

recommendations_bp = Blueprint('recommendations', __name__)

@recommendations_bp.route('/', methods=['GET'])
def recommend_questions():
    user_id = request.args.get('user_id')
    if user_id:
        # Get all solved question IDs for this user
        solved_ids = {s.question_id for s in Submission.query.filter_by(user_id=user_id, status='solved').all()}
        # Recommend questions not yet solved
        questions = Question.query.filter(~Question.id.in_(solved_ids)).all()
        if not questions:
            # If all solved, fallback to random
            questions = Question.query.all()
    else:
        questions = Question.query.all()
    recommended = random.sample(questions, min(5, len(questions))) if questions else []
    return jsonify([{'id': q.id, 'title': q.title, 'difficulty': q.difficulty} for q in recommended]) 