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

export type Pagination = {
  page?: number;
  size?: number;
};

export type PaginationWithName = Pagination & {
  name?: string;
};

export const getEvents = (query?: any) => http.get('/events', { params: query });
export const getEvent = (id: string, query?: any) => http.get(`/events/${id}`, { params: query });
export const createEvent = (data: any) => http.post('/events', data);
export const deleteEvent = (id: string) => http.delete(`/events/${id}`);
export const getEventPlayers = (eventId: string, params?: PaginationWithName) => http.get(`/events/${eventId}/players`, { params });
export const updateEventStatus = (eventId: string, status: string) => http.patch(`/events/${eventId}/status/${status}`);
export const checkinEvent = (eventId: number, data?: any) => http.post(`/events/${eventId}/check-in`, data);
export const withdrawEvent = (eventId: number, data?: any) => http.post(`/events/${eventId}/withdraw`, data);
export const joinEvent = (eventId: number, data: any) => http.post(`/events/${eventId}/join`, data);
export const getEventGroups = (eventId: string) => http.get(`/events/${eventId}/groups`);
export const getEventMatches = (eventId: string) => http.get(`/events/${eventId}/matches`);
export const startCheckIn = (eventId: number) => http.patch(`/events/${eventId}/status/CHECK_IN`);
export const teamPlayerAssign = (data: any) => http.post('/team-players/reassign', data);

export const getClubs = (params?: PaginationWithName) => http.get('/clubs', { params });
export const getSports = () => http.get('/sports');
export const getPlayers = (params?: PaginationWithName) => http.get('/players', { params });

export const getPlayersDoubleStats = (params?: PaginationWithName) => http.get('/players/doubles-stats', { params });
export const getTags = () => http.get('/tags');

export const sendEventReminder = (eventId: number, data: any) => http.post(`/events/${eventId}/remind`, data);

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
export const generateMatches = (eventId: string) => http.post(`/events/${eventId}/generate-matches`);

export const organizersClub = (params?: any) => http.get(`/organizers/club`, { params });
export const addClubToOrganizer = (organizerId: number, data: { clubs: number[] }) => http.post(`organizers/${organizerId}/clubs`, data);
