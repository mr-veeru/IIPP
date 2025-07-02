from flask import Blueprint, request, jsonify
import subprocess
import tempfile
import os

submissions_bp = Blueprint('submissions', __name__)

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