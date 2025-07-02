import type { Event } from '@/schemas/events';
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
};
