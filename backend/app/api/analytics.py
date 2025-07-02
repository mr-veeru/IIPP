from flask import Blueprint, jsonify, request
from ..models.question import Question
from ..models.user import User
import random

analytics_bp = Blueprint('analytics', __name__)

@analytics_bp.route('/questions', methods=['GET'])
def question_analytics():
    # In production, calculate real analytics from database
    questions = Question.query.all()
    return jsonify({
        'total_questions': len(questions),
        'by_difficulty': {
            'Easy': len([q for q in questions if q.difficulty == 'Easy']),
            'Medium': len([q for q in questions if q.difficulty == 'Medium']),
            'Hard': len([q for q in questions if q.difficulty == 'Hard']),
        }
    })

@analytics_bp.route('/candidates', methods=['GET'])
def candidate_analytics():
    # In production, calculate real candidate analytics
    users = User.query.all()
    return jsonify({
        'total_candidates': len(users),
        'active_candidates': len(users),  # Simplified
        'avg_score': 75.5,  # Mock data
    })

@analytics_bp.route('/question-bank', methods=['GET'])
def question_bank():
    questions = Question.query.all()
    return jsonify([{
        'id': q.id,
        'title': q.title,
        'difficulty': q.difficulty,
        'tags': q.tags,
        'usage_count': random.randint(1, 100)  # Mock data
    } for q in questions]) 