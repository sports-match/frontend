import { instance as http } from '@/api/request';

export type LoginCredential = {
  username?: string;
  password?: string;
};

type SignupPayload = {
  username?: string;
  email?: string;
  phone?: string;
  password?: string;
};

export const login = (data?: LoginCredential) => http.post(`${import.meta.env.VITE_API_URL}/auth/login`, data);
export const register = (data?: SignupPayload) => http.post(`${import.meta.env.VITE_API_URL}/auth/register`, data);
export const verifyEmail = (data?: { code: string; email: string }) => http.post(`${import.meta.env.VITE_API_URL}/auth/verify-email`, data);

export const selfAssessmentQuestions = () => http.get(`/questions/self-assessment`);
export const answerSelfAssessment = (data: any) => http.post(`/player-answers/submit-assessment`, data);

export const playersDashboard = (playerId: number) => http.get(`/players/${playerId}/dashboard`);
export const getPlayerEvents = (playerId: string) => http.get(`/players/${playerId}/events-summary`);
