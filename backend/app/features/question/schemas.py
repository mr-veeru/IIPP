from marshmallow import Schema, fields, validate

class QuestionSchema(Schema):
    id = fields.Int(dump_only=True)
    title = fields.Str(required=True, validate=validate.Length(min=5))
    description = fields.Str(required=True)
    difficulty = fields.Str(required=True)
    tags = fields.Str() 