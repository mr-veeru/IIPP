import pytest
from app import create_app
from app.extensions import db
from app.models.user import User
from app.models.question import Question

@pytest.fixture
def client():
    app = create_app()
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    with app.app_context():
        db.create_all()
        yield app.test_client()
        db.session.remove()
        db.drop_all()

def register(client, username, email, password):
    return client.post('/api/auth/register', json={
        'username': username,
        'email': email,
        'password': password
    })

def login(client, username, password):
    return client.post('/api/auth/login', json={
        'username': username,
        'password': password
    })

def test_register_and_login(client):
    resp = register(client, 'testuser', 'test@example.com', 'password123')
    assert resp.status_code == 201
    resp = login(client, 'testuser', 'password123')
    assert resp.status_code == 200
    data = resp.get_json()
    assert 'access_token' in data

def test_question_crud(client):
    register(client, 'testuser', 'test@example.com', 'password123')
    login_resp = login(client, 'testuser', 'password123')
    token = login_resp.get_json()['access_token']
    headers = {'Authorization': f'Bearer {token}'}
    # Add question
    resp = client.post('/api/questions/', json={
        'title': 'Two Sum',
        'description': 'Find two numbers that add up to target.',
        'difficulty': 'Easy',
        'tags': 'array,hashmap'
    }, headers=headers)
    assert resp.status_code == 201
    # Get questions
    resp = client.get('/api/questions/')
    assert resp.status_code == 200
    data = resp.get_json()
    assert len(data) == 1
    # Update question
    qid = data[0]['id']
    resp = client.put(f'/api/questions/{qid}', json={
        'difficulty': 'Medium'
    }, headers=headers)
    assert resp.status_code == 200
    # Delete question
    resp = client.delete(f'/api/questions/{qid}', headers=headers)
    assert resp.status_code == 200
    # Confirm deletion
    resp = client.get('/api/questions/')
    assert resp.status_code == 200
    assert resp.get_json() == [] 