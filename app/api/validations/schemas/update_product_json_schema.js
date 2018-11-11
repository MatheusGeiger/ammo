const jsonUpdate = {
    "definitions": {},
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "http://example.com/root.json",
    "type": "object",
    "title": "The Root Schema",
    "required": [
        "photos",
        "_id",
        "title",
        "category",
        "price",
        "percentageDiscount"
    ],
    "properties": {
        "photos": {
            "$id": "#/properties/photos",
            "type": "array",
            "title": "The Photos Schema",
            "minLength": 4,
            "items": {
                "$id": "#/properties/photos/items",
                "type": "object",
                "title": "The Items Schema",
                "required": [
                    "id",
                    "url"
                ],
                "properties": {
                    "id": {
                        "$id": "#/properties/photos/items/properties/id",
                        "type": "integer",
                        "title": "The Id Schema",
                        "default": 0,
                        "examples": [
                            1
                        ]
                    },
                    "url": {
                        "$id": "#/properties/photos/items/properties/url",
                        "type": "string",
                        "title": "The Url Schema",
                        "default": "",
                        "examples": [
                            "http://cade.com"
                        ],
                        "pattern": "^(.*)$"
                    }
                }
            }
        },
        "_id": {
            "$id": "#/properties/_id",
            "type": "string",
            "title": "The _id Schema",
            "default": "",
            "minLength": 1,
            "examples": [
                "5be5e1a9a4f03e0030405b4d"
            ],
            "pattern": "^(.*)$"
        },
        "title": {
            "$id": "#/properties/title",
            "type": "string",
            "title": "The Title Schema",
            "default": "",
            "minLength": 1,
            "examples": [
                "teste"
            ],
            "pattern": "^(.*)$"
        },
        "category": {
            "$id": "#/properties/category",
            "type": "string",
            "title": "The Category Schema",
            "default": "",
            "minLength": 1,
            "examples": [
                "Classi"
            ],
            "pattern": "^(.*)$"
        },
        "price": {
            "$id": "#/properties/price",
            "type": "number",
            "title": "The Price Schema",
            "minLength": 1,
            "default": 0,
            "examples": [
                981
            ]
        },
        "percentageDiscount": {
            "$id": "#/properties/percentageDiscount",
            "type": "integer",
            "title": "The Percentagediscount Schema",
            "minLength": 1,
            "minimum": 0, 
            "maximum": 100,
            "default": 0,
            "examples": [
                20
            ]
        }
    }
};

function getUpdateSchemaJson(){
    return jsonUpdate
};

module.exports = getUpdateSchemaJson;
