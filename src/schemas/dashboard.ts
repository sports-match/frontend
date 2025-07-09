import type { Event, Team } from '@/schemas/events';
import type { Player } from '@/schemas/players';

export type Dashboard = {
  doubleEventRating: number;
  doubleEventRatingChanges: number;
  doubleEventRatingHistory: any[];
  player: Player;
  singleEventRating: number;
  singleEventRatingChanges: number;
  singleEventRatingHistory: any[];
  totalEvent: number;
  upcomingEvents: Event[];
  eventToday: Event | undefined;
  lastMatch: LastMatch | undefined;
};

export type LastMatch = {
  id: number;
  scoreA: number;
  scoreB: number;
  scoreVerified: boolean;
  teamA: Team;
  teamB: Team;
  teamAWin: boolean;
  teamBWin: boolean;
};
