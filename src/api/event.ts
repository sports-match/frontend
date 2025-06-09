import { instance as http } from '@/api/request';

export const getEvents = () => http.get('/event');
export const getEvent = (id: string) => http.get(`/event/${id}`);
export const createEvent = (data: any) => http.post('/event', data);

export const getClubs = () => http.get('/club');
export const getSports = () => http.get('/sport');
