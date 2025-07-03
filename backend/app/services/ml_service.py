# ML Service: Recommendation logic

from ..models.question import Question
from ..models.submission import Submission
from collections import Counter, defaultdict
import random

def recommend_questions(user_id):
    # Get all solved submissions for this user
    solved_subs = Submission.query.filter_by(user_id=user_id, status='solved').all()
    solved_ids = {s.question_id for s in solved_subs}
    # Count tags and difficulties solved
    tag_counter = Counter()
    diff_counter = Counter()
    for sub in solved_subs:
        q = Question.query.get(sub.question_id)
        if q:
            if q.tags:
                for tag in q.tags.split(','):
                    tag_counter[tag.strip().lower()] += 1
            diff_counter[q.difficulty] += 1
    # Get all unsolved questions
    unsolved = Question.query.filter(~Question.id.in_(solved_ids)).all()
    if not unsolved:
        unsolved = Question.query.all()
    # Score unsolved questions: prioritize tags practiced least, then adaptive difficulty
    tag_min = min(tag_counter.values()) if tag_counter else 0
    def score(q):
        tags = [t.strip().lower() for t in (q.tags or '').split(',') if t.strip()]
        tag_score = sum(tag_counter.get(t, tag_min) for t in tags) if tags else tag_min
        # Lower tag_score = less practiced tags
        diff_score = diff_counter.get(q.difficulty, 0)
        # Lower diff_score = less practiced difficulty
        return (tag_score, diff_score, random.random())
    # Sort by least practiced tags, then least practiced difficulty, then random
    unsolved_sorted = sorted(unsolved, key=score)
    recommended = unsolved_sorted[:5]
    return [{
        'id': q.id,
        'title': q.title,
        'difficulty': q.difficulty,
        'tags': q.tags
    } for q in recommended] 