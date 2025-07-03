from marshmallow import Schema, fields, post_dump
from datetime import datetime
import pytz

class SubmissionSchema(Schema):
    id = fields.Int(dump_only=True)
    user_id = fields.Int(required=True)
    question_id = fields.Int(required=True)
    status = fields.Str(required=True)
    timestamp = fields.DateTime(format='iso', dump_only=True)

    @post_dump
    def convert_to_ist(self, data, **kwargs):
        if 'timestamp' in data and data['timestamp']:
            utc = pytz.utc
            ist = pytz.timezone('Asia/Kolkata')
            dt = datetime.fromisoformat(data['timestamp'])
            if dt.tzinfo is None:
                dt = utc.localize(dt)
            dt_ist = dt.astimezone(ist)
            data['timestamp'] = dt_ist.isoformat()
        return data 