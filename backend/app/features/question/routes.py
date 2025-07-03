from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from marshmallow import ValidationError
from .models import Question
from .schemas import QuestionSchema
from app.core.extensions import db
from app.services.dsa_service import Trie

questions_bp = Blueprint('questions', __name__)
question_schema = QuestionSchema()
questions_schema = QuestionSchema(many=True)

# In-memory Trie for demo (should be persisted in production)
trie = Trie()

def refresh_trie():
    trie.__init__()
    for q in Question.query.all():
        trie.insert(q.title.lower())

@questions_bp.route('/', methods=['GET'])
def get_questions():
    questions = Question.query.all()
    return jsonify(questions_schema.dump(questions))

@questions_bp.route('/', methods=['POST'])
@jwt_required()
def add_question():
    try:
        data = question_schema.load(request.get_json())
    except ValidationError as err:
        return jsonify({'error': 'Validation failed', 'messages': err.messages}), 422
    if Question.query.filter_by(title=data['title']).first():
        return jsonify({'error': 'Question already exists'}), 409
    question = Question(**data)
    db.session.add(question)
    db.session.commit()
    refresh_trie()
    return jsonify(question_schema.dump(question)), 201

@questions_bp.route('/<int:question_id>', methods=['PUT'])
@jwt_required()
def update_question(question_id):
    question = Question.query.get_or_404(question_id)
    data = request.get_json()
    try:
        validated = question_schema.load(data, partial=True)
    except ValidationError as err:
        return jsonify({'errors': err.messages}), 400
    for key, value in validated.items():
        setattr(question, key, value)
    db.session.commit()
    refresh_trie()
    return jsonify(question_schema.dump(question))

@questions_bp.route('/<int:question_id>', methods=['DELETE'])
@jwt_required()
def delete_question(question_id):
    question = Question.query.get_or_404(question_id)
    db.session.delete(question)
    db.session.commit()
    refresh_trie()
    return jsonify({'message': 'Question deleted'})

@questions_bp.route('/search', methods=['GET'])
def search_questions():
    prefix = request.args.get('q', '')
    if not prefix:
        return jsonify([])
    titles = trie.autocomplete(prefix)
    questions = Question.query.filter(db.func.lower(Question.title).in_([t.lower() for t in titles])).all()
    return jsonify(questions_schema.dump(questions))

@questions_bp.route('/<int:question_id>', methods=['GET'])
def get_question(question_id):
    q = Question.query.get_or_404(question_id)
    return jsonify({
        'id': q.id,
        'title': q.title,
        'description': q.description,
        'difficulty': q.difficulty,
        'tags': q.tags
    }) 