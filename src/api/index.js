import ajax from './ajax'
const BASE_URL = 'http://localhost:4000/api'
export const req_head_banner = () => ajax('http://localhost:3002/api/news_head_banner')