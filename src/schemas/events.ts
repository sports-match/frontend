import { z } from 'zod';

export type Event = {
  allowSelfCheckIn: boolean;
  allowWaitList: boolean;
  canSignUp: boolean;
  checkInEnd: string;
  checkInStart: string;
  clubId: number;
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
