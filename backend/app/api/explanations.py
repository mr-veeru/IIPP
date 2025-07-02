from flask import Blueprint, request, jsonify
from ..services.nlp_service import analyze_explanation

explanations_bp = Blueprint('explanations', __name__)

@explanations_bp.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    text = data.get('text', '')
    if not text:
        return jsonify({'error': 'No explanation provided.'}), 400
    result = analyze_explanation(text)
    return jsonify(result) 