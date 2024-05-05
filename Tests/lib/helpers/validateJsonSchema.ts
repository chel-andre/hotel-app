import { expect } from '@playwright/test';
import Ajv from 'ajv';

export async function validateJsonSchema(body: object) {

    const ajv = new Ajv({ formats });
    const validate = ajv.compile(hotelSchema);
    const validRes = validate(body);
    expect(validRes).toBe(true);
}

const formats = {
    'date-time': (value) => {
        return !isNaN(Date.parse(value));
    },
};

const hotelSchema = {
    '$schema': 'http://json-schema.org/draft-07/schema#',
    'type': 'object',
    'properties': {
        'success': { 'type': 'boolean' },
        'message': { 'type': 'string' },
        'data': {
            'type': 'array',
            'items': {
                'type': 'object',
                'properties': {
                    '_id': { 'type': 'string' },
                    'userId': { 'type': 'string' },
                    'name': { 'type': 'string' },
                    'city': { 'type': 'string' },
                    'country': { 'type': 'string' },
                    'description': { 'type': 'string' },
                    'type': { 'type': 'string' },
                    'adultCount': { 'type': 'integer' },
                    'childCount': { 'type': 'integer' },
                    'facilities': {
                        'type': 'array',
                        'items': { 'type': 'string' },
                    },
                    'pricePerNight': { 'type': 'number' },
                    'starRating': { 'type': 'number' },
                    'isFeatured': { 'type': 'boolean' },
                    'imageUrl': {
                        'type': 'array',
                        'items': { 
                            'type': 'string',
                            'pattern': '^https?://.+',
                        },
                    },
                    'lastUpdated': { 'type': 'string', 'format': 'date-time' },
                },
                'required': [
                    '_id',
                    'userId',
                    'name',
                    'city',
                    'country',
                    'description',
                    'type',
                    'adultCount',
                    'childCount',
                    'facilities',
                    'pricePerNight',
                    'starRating',
                    'isFeatured',
                    'imageUrl',
                    'lastUpdated',
                ],
            },
        },
    },
    'required': ['success', 'message', 'data'],
};

