import { instance as http } from '@/api/request';

export const getEvents = () => http.get('/events');
export const getEvent = (id: string) => http.get(`/events/${id}`);
export const createEvent = (data: any) => http.post('/events', data);

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
