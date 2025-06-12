import { instance as http } from '@/api/request';

export const getEvents = () => http.get('/events');
export const getEvent = (id: string) => http.get(`/events/${id}`);
export const createEvent = (data: any) => http.post('/events', data);

export const getClubs = () => http.get('/clubs');
export const getSports = () => http.get('/sports');
export const getPlayers = () => http.get('/players');
