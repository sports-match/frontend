import { instance as http } from '@/api/request';

export const getEvents = (query?: any) => http.get('/events', { params: query });
export const getEvent = (id: string, query?: any) => http.get(`/events/${id}`, { params: query });
export const createEvent = (data: any) => http.post('/events', data);
export const getEventPlayers = (eventId: string) => http.get(`/events/${eventId}/players`);
export const checkinEvent = (eventId: string, data?: any) => http.post(`/events/${eventId}/check-in`, data);
export const widthdrawEvent = (eventId: string) => http.post(`/events/${eventId}/withdraw`);
export const joinEvent = (eventId: string, data: any) => http.post(`/events/${eventId}/join`, data);

export const getClubs = () => http.get('/clubs');
export const getSports = () => http.get('/sports');
export const getPlayers = () => http.get('/players');

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

export const generateGroups = (eventId: string) => http.patch(`/events/${eventId}/generate-groups`);
