import { defineStore } from 'pinia';

export const useEventStore = defineStore('event', {
  state: () => ({
    events: [
      {
        date: '26/04/2020, 12:42 AM',
        eventName: 'May 9th Mukilteo Mixer Standard Doubles Mixer',
        location: 'BBC-Mukilteo',
        signedUp: '25/24',
        courts: 4,
        status: 'Publish',
      },
      {
        date: '26/04/2020, 12:42 AM',
        eventName: 'May 9th Mukilteo Mixer Standard Doubles Mixer',
        location: 'BBC-Mukilteo',
        signedUp: '25/24',
        courts: 4,
        status: 'Private',
      },
      {
        date: '26/04/2020, 12:42 AM',
        eventName: 'May 9th Mukilteo Mixer Standard Doubles Mixer',
        location: 'BBC-Mukilteo',
        signedUp: '25/10',
        courts: 4,
        status: 'Publish',
      },
      {
        date: '26/04/2020, 12:42 AM',
        eventName: 'May 9th Mukilteo Mixer Standard Doubles Mixer',
        location: 'BBC-Mukilteo',
        signedUp: '25/15',
        courts: 4,
        status: 'Publish',
      },
      {
        date: '26/04/2020, 12:42 AM',
        eventName: 'May 9th Mukilteo Mixer Standard Doubles Mixer',
        location: 'BBC-Mukilteo',
        signedUp: '25/25',
        courts: 4,
        status: 'Completed',
      },
      {
        date: '26/04/2020, 12:42 AM',
        eventName: 'May 9th Mukilteo Mixer Standard Doubles Mixer',
        location: 'BBC-Mukilteo',
        signedUp: '25/24',
        courts: 4,
        status: 'Publish',
      },
      {
        date: '26/04/2020, 12:42 AM',
        eventName: 'May 9th Mukilteo Mixer Standard Doubles Mixer',
        location: 'BBC-Mukilteo',
        signedUp: '25/24',
        courts: 4,
        status: 'Publish',
      },
      {
        date: '26/04/2020, 12:42 AM',
        eventName: 'May 9th Mukilteo Mixer Standard Doubles Mixer',
        location: 'BBC-Mukilteo',
        signedUp: '25/24',
        courts: 4,
        status: 'Publish',
      },
      {
        date: '26/04/2020, 12:42 AM',
        eventName: 'May 9th Mukilteo Mixer Standard Doubles Mixer',
        location: 'BBC-Mukilteo',
        signedUp: '25/24',
        courts: 4,
        status: 'Publish',
      },
      {
        date: '26/04/2020, 12:42 AM',
        eventName: 'May 9th Mukilteo Mixer Standard Doubles Mixer',
        location: 'BBC-Mukilteo',
        signedUp: '25/24',
        courts: 4,
        status: 'Publish',
      },
      {
        date: '26/04/2020, 12:42 AM',
        eventName: 'May 9th Mukilteo Mixer Standard Doubles Mixer',
        location: 'BBC-Mukilteo',
        signedUp: '25/24',
        courts: 4,
        status: 'Publish',
      },
    ],
  }),
  actions: {
    increment() {
      // this.count++;
    },
  },
});
