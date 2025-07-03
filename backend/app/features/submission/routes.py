from flask import Blueprint, request, jsonify
import subprocess
import tempfile
import os
from .models import Submission
from .schemas import SubmissionSchema
from app.core.extensions import db

submissions_bp = Blueprint('submissions', __name__)

submission_schema = SubmissionSchema()

@submissions_bp.route('/execute', methods=['POST'])
def execute_code():
    data = request.get_json()
    code = data.get('code')
    language = data.get('language', 'python')
    stdin = data.get('input', '')
    if language != 'python':
        return jsonify({'error': 'Only Python is supported for now.'}), 400
    if not code:
        return jsonify({'error': 'No code provided.'}), 400
    try:
        with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False) as f:
            f.write(code)
            temp_path = f.name
        result = subprocess.run(
            ['python', temp_path],
            input=stdin.encode(),
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            timeout=5
        )
        os.remove(temp_path)
        return jsonify({
            'stdout': result.stdout.decode(),
            'stderr': result.stderr.decode(),
            'exit_code': result.returncode
        })
    except subprocess.TimeoutExpired:
        return jsonify({'error': 'Code execution timed out.'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@submissions_bp.route('/record', methods=['POST'])
def record_submission():
    data = request.get_json()
    user_id = data.get('user_id')
    question_id = data.get('question_id')
    status = data.get('status', 'attempted')
    if not user_id or not question_id:
        return jsonify({'error': 'user_id and question_id required'}), 400
    submission = Submission(user_id=user_id, question_id=question_id, status=status)
    db.session.add(submission)
    db.session.commit()
    return jsonify(submission_schema.dump(submission)), 201

@submissions_bp.route('/user/<int:user_id>', methods=['GET'])
def get_user_submissions(user_id):
    submissions = Submission.query.filter_by(user_id=user_id).all()
    return jsonify(submission_schema.dump(submissions, many=True))

@submissions_bp.route('/user/<int:user_id>', methods=['DELETE'])
def delete_user_submissions(user_id):
    deleted = Submission.query.filter_by(user_id=user_id).delete()
    db.session.commit()
    return jsonify({'message': f'Deleted {deleted} submissions.'}), 200

@submissions_bp.route('/<int:submission_id>', methods=['DELETE'])
def delete_submission(submission_id):
    sub = Submission.query.get_or_404(submission_id)
    db.session.delete(sub)
    db.session.commit()
    return jsonify({'message': 'Submission deleted.'}), 200 