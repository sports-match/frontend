import { instance as http } from '@/api/request';

export const getEvents = () => http.get('/event');
