from flask import Blueprint, jsonify, request
from ..models.question import Question
import random

recommendations_bp = Blueprint('recommendations', __name__)

@recommendations_bp.route('/', methods=['GET'])
def recommend_questions():
    # In production, use ML logic based on user history, mistakes, etc.
    user_id = request.args.get('user_id')
    questions = Question.query.all()
    recommended = random.sample(questions, min(5, len(questions))) if questions else []
    return jsonify([{'id': q.id, 'title': q.title, 'difficulty': q.difficulty} for q in recommended]) 