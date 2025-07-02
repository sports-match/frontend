import { defineStore } from 'pinia';

export const useEventStore = defineStore('event', {
  state: () => ({
    events: [],
  }),
  actions: {
    increment() {
      // this.count++;
    },
  },
});
