const request = require('supertest');
const app = require('./app');

const { getTagResults } = require('./services')

describe('Testing Route /api/ping', () => {
    it('GET /api/ping --> Status code: 200', () => {
        return request(app)
        .get('/api/ping')
            .then((response) => {
                expect(response.status).toEqual(200);
            })
    });

    it('GET /api/ping --> response (JSON)', () => {
        return request(app)
            .get('/api/ping')
            .expect('Content-Type', /json/)
    });

    it('GET /api/ping --> message: success', () => {
        return request(app)
            .get('/api/ping')
            .then((response) => {
                expect(response.body).toEqual({ "success": true })
            })
    })
})

describe('Testing Route /api/posts', () => {
    it('GET /api/posts --> Status code: 400', () => {
        return request(app)
        .get('/api/posts')
            .expect(400)
    });

    it('GET /api/posts --> response (JSON)', () => {
        return request(app)
            .get('/api/posts')
            .expect('Content-Type', /json/)
    });
})

describe('Testing Parameters /api/posts', () => {
    it('GET /api/posts --> message: Tags paramenter is required', () => {
        return request(app)
            .get('/api/posts')
            .then((response) => {
                expect(response.body.error).toEqual("Tags parameter is required")
            })
    })

    it('GET /api/posts?tags=a --> returns empty array', () => {
        return request(app)
            .get('/api/posts?tags=a')
            .then((response) => {
                expect(response.body.posts).toEqual([])
            })
    })

    it('GET /api/posts?tags=tech,health --> Status code: 200', () => {
        return request(app)
            .get('/api/posts?tags=a')
            .then((response) => {
                expect(response.status).toEqual(200)
            })
    })

    it('GET /api/posts?tags=tech --> twenty eight(28) results', () => {
        return request(app)
            .get('/api/posts?tags=tech')
            .then((response) => {
                expect(response.body.posts.length).toEqual(28)
            })
    })

    it('GET /api/posts?tags=history --> twenty six(26) results', () => {
        return request(app)
            .get('/api/posts?tags=history')
            .then((response) => {
                expect(response.body.posts.length).toEqual(26)
            })
    })

    it('GET /api/posts?tags=a&sortBy=a --> message: sortBy parameter is invalid', () => {
        return request(app)
            .get('/api/posts?tags=tech&sortBy=a')
            .then((response) => {
                expect(response.body.error).toEqual("sortBy parameter is invalid")
            })
    })

    it('GET /api/posts?tags=tech --> default sorting by id in ascending order', () => {
        return request(app)
            .get('/api/posts?tags=tech')
            .then((response) => {
                expect(response.body.posts[0].id).toBeLessThanOrEqual(response.body.posts[1].id)
            })
    })

    it('GET /api/posts?tags=a&sortBy=id&direction=a --> message: direction parameter is invalid', () => {
        return request(app)
            .get('/api/posts?tags=tech=a&sortBy=id&direction=a')
            .then((response) => {
                expect(response.body.error).toEqual("direction parameter is invalid")
            })
    })

    it('GET /api/posts?tags=history&sortBy=likes&direction=desc --> sorting by likes in descending order', () => {
        return request(app)
            .get('/api/posts?tags=history&sortBy=likes&direction=desc')
            .then((response) => {
                expect(response.body.posts[0].likes).toBeGreaterThanOrEqual(response.body.posts[1].likes)
            })
    })
})