import { instance as http } from '@/api/request';

export type Event = {
  id: string;
  name: string;
  description: string;
  location: string;
  date: string;
  time: string;
  sport: string;
  club: string;
  image: string;
  eventTime: string;
  status: string;
};

export const getEvents = (query?: any) => http.get('/events', { params: query });
export const getEvent = (id: string, query?: any) => http.get(`/events/${id}`, { params: query });
export const createEvent = (data: any) => http.post('/events', data);
export const getEventPlayers = (eventId: string) => http.get(`/events/${eventId}/players`);
export const updateEventStatus = (eventId: string, status: string) => http.patch(`/events/${eventId}/status/${status}`);
export const checkinEvent = (eventId: string, data?: any) => http.post(`/events/${eventId}/check-in`, data);
export const withdrawEvent = (eventId: string, data?: any) => http.post(`/events/${eventId}/withdraw`, data);
export const joinEvent = (eventId: string, data: any) => http.post(`/events/${eventId}/join`, data);
export const getEventGroups = (eventId: string) => http.get(`/events/${eventId}/groups`);
export const getEventMatches = (eventId: string) => http.get(`/events/${eventId}/matches`);

export const getClubs = () => http.get('/clubs');
export const getSports = () => http.get('/sports');
export const getPlayers = () => http.get('/players');
export const getTags = () => http.get('/tags');

export const sendEventReminder = (eventId: string, data: any) => http.post(`/events/${eventId}/remind`, data);

export function uploadImage(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  return http.post('/localStorage/pictures', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
export const getImage = (path: string) => http.get(`${path}`);

export const generateGroups = (eventId: string) => http.post(`/events/${eventId}/generate-groups`);
