from app import create_app
from app.extensions import db
from app.models.question import Question

sample_questions = [
    {
        'title': 'Two Sum',
        'description': 'Given an array of integers, return indices of the two numbers such that they add up to a specific target.',
        'difficulty': 'Easy',
        'tags': 'array,hashmap',
    },
    {
        'title': 'Reverse Linked List',
        'description': 'Reverse a singly linked list.',
        'difficulty': 'Easy',
        'tags': 'linkedlist',
    },
    {
        'title': 'Merge Intervals',
        'description': 'Given a collection of intervals, merge all overlapping intervals.',
        'difficulty': 'Medium',
        'tags': 'array,sorting',
    },
    {
        'title': 'Word Ladder',
        'description': 'Given two words and a dictionary, find the length of shortest transformation sequence.',
        'difficulty': 'Hard',
        'tags': 'bfs,graph',
    },
    {
        'title': 'LRU Cache',
        'description': 'Design and implement a data structure for Least Recently Used (LRU) cache.',
        'difficulty': 'Medium',
        'tags': 'design,hashmap',
    },
]

app = create_app()

with app.app_context():
    for q in sample_questions:
        if not Question.query.filter_by(title=q['title']).first():
            db.session.add(Question(**q))
    db.session.commit()
    print('Sample questions added!') 