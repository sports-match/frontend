import { z } from 'zod';

export type Event = {
  allowSelfCheckIn: boolean;
  allowWaitList: boolean;
  canSignUp: boolean;
  checkInEnd: string;
  checkInStart: string;
  clubId: number;
  club?: Club;
  coHostPlayers: any[];
  createBy: number;
  createTime: string;
  currentParticipants: number;
  description: string;
  eventTime: string;
  format: string;
  groupCount: number;
  id: number;
  image: string;
  joined: boolean;
  location: string;
  maxParticipants: number;
  name: string;
  posterImage: string;
  sportId: number;
  status: string;
  tags: any[];
  updateTime: string;
  playerStatus?: string;
  isPublic?: boolean;
};

export type EventParams = {
  eventTime?: string;
  eventTimeFilter?: string;
  location?: string;
  name?: string;
  page?: number;
  size?: number;
  status?: string;
  sort?: string;
};

export const eventSchema = z.object({
  allowSelfCheckIn: z.boolean(),
  allowWaitList: z.boolean(),
  clubId: z.string().nullable(),
  coHostPlayers: z.array(z.string()),
  description: z.string().optional(),
  eventTime: z.string().min(1, 'Date is required'),
  format: z.enum(['SINGLE', 'DOUBLE']),
  groupCount: z.string().refine(val => Number.parseInt(val) >= 0, 'Must be 0 or more'),
  image: z.string().optional(),
  location: z.string().optional(),
  maxParticipants: z.string().refine(val => Number.parseInt(val) > 0, 'Must be greater than 0'),
  name: z.string().min(1, 'Event name is required'),
  posterImage: z.string().nullable(),
  sportId: z.string().min(1, 'Sport is required'),
  tags: z.array(z.string()),
});

export type EventForm = z.infer<typeof eventSchema>;

export type PlayerSportRating = {
  createTime: string;
  format: string;
  id: number;
  provisional: boolean;
  rateScore: number;
  sportId: number;
  updateTime: string;
};

export type Player = {
  createTime: string;
  description: string;
  id: number;
  name: string;
  playerSportRating: PlayerSportRating[];
  updateTime: string;
  userId: number;
};

export type TeamPlayer = {
  id: number;
  player: Player;
  status: string;
};

export type Team = {
  averageScore: number;
  id: number;
  name: string;
  teamPlayers: TeamPlayer[];
  teamSize: number;
};

export type Group = {
  courtNumbers: string;
  groupTeamSize: number;
  id: number;
  matches: Match[];
  name: string;
  teams: Team[];
  matrix?: Matrix[];
};

type Matrix = {
  team: Team;
  matches: Match[];
};;

export type Match = {
  id: number;
  scoreA: number;
  scoreB: number;
  scoreVerified: boolean;
  teamA: Team;
  teamAWin: boolean;
  teamB: Team;
  teamBWin: boolean;
  myScore?: number;
  otherScore?: number;
  otherTeam?: Team;
};

export type Club = {
  id: number;
  name: string;
  description: string;
  icon: string;
  location: string;
  latitude: number;
  longitude: number;
  enabled: boolean;
  sort: number;
  createTime: string;
  updateTime: string;
};

export type EventPlayerRates = {
  losses: number;
  name: string;
  newRating: number;
  previousRating: number;
  ratingChanges: number;
  wins: number;
};
