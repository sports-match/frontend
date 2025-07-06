<template>
  <div class="flex flex-col md:flex-row gap-4">
    <!-- Left: Matchups and Scores -->
    <div class="flex-1 flex flex-col gap-4">
      <Accordion type="multiple" class="w-full space-y-4" :default-value="groups[0]?.id?.toString()">
        <AccordionItem v-for="group in groups" :key="group.name" :value="group.name">
          <AccordionTrigger class="bg-primary text-white px-4 py-3 rounded-xl data-[state=open]:rounded-b-none">
            {{ group.name }} Matchups and Scores
          </AccordionTrigger>
          <AccordionContent class="bg-white rounded-b-lg border border-t-0 p-0">
            <!-- Matchups Table -->
            <div class="overflow-auto ">
              <table class="min-w-full text-sm text-left">
                <thead class="bg-gray-100 text-gray-700">
                  <tr>
                    <th class="px-4 py-2">
                      Game
                    </th>
                    <th class="px-4 py-2">
                      Players
                    </th>
                    <th class="px-4 py-2">
                      Scores
                    </th>
                    <th class="px-4 py-2">
                      Players
                    </th>
                    <th class="px-4 py-2">
                      Scores
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(match, index) in group.matches" :key="index" class="border-t align-top">
                    <!-- Game number and extra info -->
                    <td class="px-4 py-2 whitespace-nowrap align-top">
                      <div class="font-semibold">
                        #{{ index + 1 }}
                      </div>
                      <div class="text-xs text-gray-500">
                        <!-- {{ match?.eventDate }} -->
                      </div>
                    </td>
                    <!-- Team 1 -->
                    <td class="px-4 py-2 align-top">
                      <div class="flex items-center gap-2">
                        <span class="inline-flex items-center justify-center rounded-full bg-gray-100 w-8 h-8 font-semibold text-xs">
                          #{{ match.teamA?.id }}
                        </span>
                        <div>
                          <div v-for="(p, i) in match.teamA.teamPlayers" :key="i" class="leading-tight">
                            <span>{{ p.player?.name }}</span>
                            <!-- <span v-if="p.icon" class="ml-1">{{ p.icon }}</span> -->
                            <span v-if="p.player?.playerSportRating" class="text-xs text-gray-500 ml-1">({{ match.teamA.averageScore }})</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <!-- Team 1 Score -->
                    <td class="px-4 py-2 align-top">
                      <span>{{ match.scoreA }}</span>
                    </td>

                    <!-- Team 2 -->
                    <td class="px-4 py-2 align-top">
                      <div class="flex items-center gap-2">
                        <span class="inline-flex items-center justify-center rounded-full bg-gray-100 w-8 h-8 font-semibold text-xs">
                          #{{ match.teamB?.id }}
                        </span>
                        <div>
                          <div v-for="(p, i) in match.teamB.teamPlayers" :key="i" class="leading-tight">
                            <span>{{ p.player?.name }}</span>
                            <!-- <span v-if="p.icon" class="ml-1">{{ p.icon }}</span> -->
                            <span v-if="p.player?.playerSportRating" class="ml-1 text-xs text-gray-500">({{ match.teamB.averageScore }})</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <!-- Team 2 Score -->
                    <td class="px-4 py-2 align-top">
                      <span>{{ match.scoreB }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- Individual Results -->
            <div class="border-t py-2">
              <div class="overflow-x-auto">
                <!-- <div class="bg-white rounded-lg border border-gray-200 overflow-auto"> -->
                <div class="flex justify-between items-center px-4 py-3 border-b">
                  <h2 class="text-lg font-semibold">
                    Individual Results
                  </h2>
                  <button class="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600">
                    <CalendarIcon class="w-4 h-4" />
                    Add another game
                  </button>
                </div>

                <!-- <table class="min-w-full divide-y divide-gray-200 text-sm text-left">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-4 py-2 font-semibold text-gray-700">
                        Players
                      </th>
                      <th
                        v-for="n in maxScores(group.individualResults)"
                        :key="n"
                        class="px-4 py-2 font-semibold text-gray-700 text-center"
                      >
                        <span v-if="n === 1">
                          Scores
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-100">
                    <tr v-for="(result, index) in group.individualResults" :key="index">
                      <td class="px-4 py-2 align-top">
                        <div class="flex items-center gap-2">
                          <span class="inline-flex items-center justify-center rounded-full bg-gray-100 w-8 h-8 font-semibold">
                            {{ result.match }}
                          </span>
                          <div>
                            <div v-for="(p, i) in result.team" :key="i" class="leading-tight">
                              <span>{{ p.name }}</span>
                              <span v-if="p.rating" class="ml-1 text-xs text-gray-500">({{ p.rating }})</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        v-for="n in maxScores(group.individualResults)"
                        :key="n"
                        class="px-4 py-3 text-center align-top"
                      >
                        <span v-if="result.scores[n - 1]">{{ result.scores[n - 1] }}</span>
                      </td>
                    </tr>
                  </tbody>
                </table> -->
                <!-- </div> -->
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>

    <!-- Right: Group Players -->
    <div class="w-full md:w-80 flex flex-col gap-4">
      <Accordion type="multiple" class="w-full space-y-4">
        <AccordionItem v-for="group in groups" :key="`${group.name}-players`" :value="`${group.name}-players`">
          <AccordionTrigger class="bg-primary text-white px-4 py-3 rounded-xl data-[state=open]:rounded-b-none">
            {{ group.name }} Players
          </AccordionTrigger>
          <AccordionContent class="bg-white rounded-b-lg border border-t-0 p-0">
            <div class="overflow-x-auto">
              <table class="min-w-full text-sm text-left">
                <thead class="bg-gray-100 text-gray-700">
                  <tr>
                    <th class="px-4 py-2">
                      Name
                    </th>
                    <th class="px-4 py-2">
                      Rank
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(player, index) in group.players" :key="index" class="border-t">
                    <td class="px-4 py-2 whitespace-nowrap">
                      <div v-for="(member, idx) in player.team" :key="idx" class="flex items-center gap-1">
                        <span>{{ member.name }}</span>
                        <span v-if="member.rating" class="text-xs text-gray-400">({{ member.rating }})</span>
                      </div>
                    </td>
                    <td class="px-4 py-2">
                      <div class="flex items">
                        <span class="text-sm">{{ player.rank }}</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Group, Match } from '@/schemas/events';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/shares/ui/accordion';
import { CalendarIcon } from 'lucide-vue-next';

defineProps<{
  groups: Group[];
}>();

function maxScores(results: any[]) {
  // return Math.max(...results.map(r => r.scores.length), 0);
}

// Dummy data structure
// const groups = [
//   {
//     name: 'Group A (Court 1,2)',
//     matchups: [
//       {
//         game: '#1',
//         event: 'e:21 - 14.5',
//         team1: {
//           players: [
//             { name: 'ARJUN CHANDRAN', rating: 6612.69 },
//             { name: 'Rijosh Muttichoor Rajan', rating: 7684.71 },
//           ],
//           teamRank: '#1',
//           score: 10,
//         },
//         team2: {
//           players: [
//             { name: 'Saiteja Ghanta', rating: 6976.6 },
//             { name: 'Surya Prakash Gummadi', rating: 6460.0 },
//           ],
//           teamRank: '#2',
//           score: 21,
//         },
//       },
//       {
//         game: '#2',
//         event: 'e:Event',
//         team1: {
//           players: [
//             { name: 'Arun Annamalai', rating: 6320.0 },
//             { name: 'Rama Avula', rating: 6993.12 },
//           ],
//           teamRank: '#3',
//           score: 21,
//         },
//         team2: {
//           players: [
//             { name: 'Srikrishna Patankar', rating: 5520.0 },
//             { name: 'Varun Patankar', rating: 7650.0 },
//           ],
//           teamRank: '#4',
//           score: 10,
//         },
//       },
//       {
//         game: '#3',
//         event: 'e:21 - 14.5',
//         team1: {
//           players: [
//             { name: 'JENIFFERSAN KATHIRESAN', rating: 7069.21 },
//             { name: 'saina jeniffersan' },
//           ],
//           teamRank: '#5',
//           score: 14,
//         },
//         team2: {
//           players: [
//             { name: 'Ashish Yadav', rating: 6200.0 },
//             { name: 'Sumit Kumar Sharma' },
//           ],
//           teamRank: '#6',
//           score: 21,
//         },
//       },
//       {
//         game: '#4',
//         event: 'e:21 - 14.5',
//         team1: {
//           players: [
//             { name: 'ARJUN CHANDRAN', rating: 6612.69 },
//             { name: 'Rijosh Muttichoor Rajan', rating: 7684.71 },
//           ],
//           teamRank: '#1',
//           score: 16,
//         },
//         team2: {
//           players: [
//             { name: 'Arun Annamalai', rating: 6320.0 },
//             { name: 'Rama Avula', rating: 6993.12 },
//           ],
//           teamRank: '#3',
//           score: 21,
//         },
//       },
//       {
//         game: '#5',
//         event: 'e:21 - 14.5',
//         team1: {
//           players: [
//             { name: 'ARJUN CHANDRAN', rating: 6612.69 },
//             { name: 'Rijosh Muttichoor Rajan', rating: 7684.71 },
//           ],
//           teamRank: '#2',
//           score: 10,
//         },
//         team2: {
//           players: [
//             { name: 'Saiteja Ghanta', rating: 6976.6 },
//             { name: 'Surya Prakash Gummadi', rating: 6460.0 },
//           ],
//           teamRank: '#4',
//           score: 21,
//         },
//       },
//       {
//         game: '#6',
//         event: 'e:21 - 14.5',
//         team1: {
//           players: [
//             { name: 'ARJUN CHANDRAN', rating: 6612.69 },
//             { name: 'Rijosh Muttichoor Rajan', rating: 7684.71 },
//           ],
//           teamRank: '#1',
//           score: 10,
//         },
//         team2: {
//           players: [
//             { name: 'Saiteja Ghanta', rating: 6976.6 },
//             { name: 'Surya Prakash Gummadi', rating: 6460.0 },
//           ],
//           teamRank: '#2',
//           score: 21,
//         },
//       },
//       {
//         game: '#7',
//         event: 'e:21 - 14.5',
//         team1: {
//           players: [
//             { name: 'ARJUN CHANDRAN', rating: 6612.69 },
//             { name: 'Rijosh Muttichoor Rajan', rating: 7684.71 },
//           ],
//           teamRank: '#1',
//           score: 10,
//         },
//         team2: {
//           players: [
//             { name: 'Saiteja Ghanta', rating: 6976.6 },
//             { name: 'Surya Prakash Gummadi', rating: 6460.0 },
//           ],
//           teamRank: '#2',
//           score: 21,
//         },
//       },
//       {
//         game: '#8',
//         event: 'e:21 - 14.5',
//         team1: {
//           players: [
//             { name: 'ARJUN CHANDRAN', rating: 6612.69 },
//             { name: 'Rijosh Muttichoor Rajan', rating: 7684.71 },
//           ],
//           teamRank: '#1',
//           score: 10,
//         },
//         team2: {
//           players: [
//             { name: 'Saiteja Ghanta', rating: 6976.6 },
//             { name: 'Surya Prakash Gummadi', rating: 6460.0 },
//           ],
//           teamRank: '#2',
//           score: 21,
//         },
//       },
//     ],
//     individualResults: [
//       {
//         match: '#1',
//         team: [
//           { name: 'ARJUN CHANDRAN', rating: 6613 },
//           { name: 'Rijosh Muttichoor Rajan', rating: 7685 },
//         ],
//         scores: ['10-21', '10-21', '21-14', '7-21', '13-21', '21-18'],
//       },
//       {
//         match: '#2',
//         team: [
//           { name: 'ARJUN CHANDRAN', rating: 6613 },
//           { name: 'Rijosh Muttichoor Rajan', rating: 7685 },
//         ],
//         scores: ['10-21', '10-21', '10-21', '', ''],
//       },
//       {
//         match: '#3',
//         team: [
//           { name: 'ARJUN CHANDRAN', rating: 6613 },
//           { name: 'Rijosh Muttichoor Rajan', rating: 7685 },
//         ],
//         scores: ['10-21', '', '21-14', '10-21', '13-21', '21-18'],
//       },
//       {
//         match: '#4',
//         team: [
//           { name: 'ARJUN CHANDRAN', rating: 6613 },
//           { name: 'Rijosh Muttichoor Rajan', rating: 7685 },
//         ],
//         scores: ['10-21', '10-21', '21-14', '7-21', '', '21-18'],
//       },
//       {
//         match: '#5',
//         team: [
//           { name: 'ARJUN CHANDRAN', rating: 6613 },
//           { name: 'Rijosh Muttichoor Rajan', rating: 7685 },
//         ],
//         scores: ['10-21', '10-21', '21-14', '', '13-21', '21-18'],
//       },
//       {
//         match: '#6',
//         team: [
//           { name: 'ARJUN CHANDRAN', rating: 6613 },
//           { name: 'Rijosh Muttichoor Rajan', rating: 7685 },
//         ],
//         scores: ['10-21', '10-21', '21-14', '7-21', '13-21', '21-18'],
//       },
//     ],
//     players: [
//       {
//         rank: 1,
//         team: [
//           { name: 'ARJUN CHANDRAN', rating: 6613 },
//           { name: 'Rijosh Muttichoor Rajan', rating: 7685 },
//         ],
//       },
//       {
//         rank: 2,
//         team: [
//           { name: 'Saiteja Ghanta', rating: 6977 },
//           { name: 'Surya Prakash Gummadi', rating: 6460 },
//         ],
//       },
//       {
//         rank: 3,
//         team: [
//           { name: 'Arun Annamalai', rating: 6320 },
//           { name: 'Rama Avula', rating: 6993 },
//         ],
//       },
//       {
//         rank: 4,
//         team: [
//           { name: 'Srikrishna Patankar', rating: 5520 },
//           { name: 'Varun Patankar', rating: 7650 },
//         ],
//       },
//       {
//         rank: 5,
//         team: [
//           { name: 'JENIFFERSAN KATHIRESAN', rating: 7069 },
//           { name: 'saina jeniffersan', rating: 5990 },
//         ],
//       },
//       {
//         rank: 6,
//         team: [
//           { name: 'ARJUN CHANDRAN', rating: 6613 },
//           { name: 'Rijosh Muttichoor Rajan', rating: 7685 },
//         ],
//       },
//     ],
//   },
//   {
//     name: 'Group B (Court 3,4)',
//     matchups: [
//       {
//         game: '#1',
//         event: 'e:21 - 14.5',
//         team1: {
//           players: [
//             { name: 'John Doe', rating: 7000 },
//             { name: 'Jane Smith', rating: 7100 },
//           ],
//           teamRank: '#1',
//           score: 18,
//         },
//         team2: {
//           players: [
//             { name: 'Alice Brown', rating: 6900 },
//             { name: 'Bob White', rating: 6800 },
//           ],
//           teamRank: '#2',
//           score: 21,
//         },
//       },
//       {
//         game: '#2',
//         event: 'e:Event',
//         team1: {
//           players: [
//             { name: 'Charlie Black', rating: 6750 },
//             { name: 'Diana Green', rating: 7200 },
//           ],
//           teamRank: '#3',
//           score: 21,
//         },
//         team2: {
//           players: [
//             { name: 'Eve Blue', rating: 6600 },
//             { name: 'Frank Red', rating: 6500 },
//           ],
//           teamRank: '#4',
//           score: 17,
//         },
//       },
//     ],
//     individualResults: [
//       {
//         match: '#1',
//         team: [
//           { name: 'John Doe', rating: 7000 },
//           { name: 'Jane Smith', rating: 7100 },
//         ],
//         scores: ['18-21', '21-19', '21-17'],
//       },
//       {
//         match: '#2',
//         team: [
//           { name: 'Charlie Black', rating: 6750 },
//           { name: 'Diana Green', rating: 7200 },
//         ],
//         scores: ['21-17', '19-21', '21-18'],
//       },
//     ],
//     players: [
//       {
//         rank: 1,
//         team: [
//           { name: 'John Doe', rating: 7000 },
//           { name: 'Jane Smith', rating: 7100 },
//         ],
//       },
//       {
//         rank: 2,
//         team: [
//           { name: 'Alice Brown', rating: 6900 },
//           { name: 'Bob White', rating: 6800 },
//         ],
//       },
//       {
//         rank: 3,
//         team: [
//           { name: 'Charlie Black', rating: 6750 },
//           { name: 'Diana Green', rating: 7200 },
//         ],
//       },
//       {
//         rank: 4,
//         team: [
//           { name: 'Eve Blue', rating: 6600 },
//           { name: 'Frank Red', rating: 6500 },
//         ],
//       },
//     ],
//   },
//   {
//     name: 'Group C (Court 5,6)',
//     matchups: [
//       {
//         game: '#1',
//         event: 'e:21 - 14.5',
//         team1: {
//           players: [
//             { name: 'George King', rating: 7300 },
//             { name: 'Helen Queen', rating: 7400 },
//           ],
//           teamRank: '#1',
//           score: 21,
//         },
//         team2: {
//           players: [
//             { name: 'Ian Prince', rating: 7200 },
//             { name: 'Julia Princess', rating: 7100 },
//           ],
//           teamRank: '#2',
//           score: 19,
//         },
//       },
//       {
//         game: '#2',
//         event: 'e:Event',
//         team1: {
//           players: [
//             { name: 'Kevin Duke', rating: 7000 },
//             { name: 'Laura Duchess', rating: 7050 },
//           ],
//           teamRank: '#3',
//           score: 15,
//         },
//         team2: {
//           players: [
//             { name: 'Mike Earl', rating: 6950 },
//             { name: 'Nina Countess', rating: 6900 },
//           ],
//           teamRank: '#4',
//           score: 21,
//         },
//       },
//     ],
//     individualResults: [
//       {
//         match: '#1',
//         team: [
//           { name: 'George King', rating: 7300 },
//           { name: 'Helen Queen', rating: 7400 },
//         ],
//         scores: ['21-19', '19-21', '21-18'],
//       },
//       {
//         match: '#2',
//         team: [
//           { name: 'Kevin Duke', rating: 7000 },
//           { name: 'Laura Duchess', rating: 7050 },
//         ],
//         scores: ['15-21', '21-19', '18-21'],
//       },
//     ],
//     players: [
//       {
//         rank: 1,
//         team: [
//           { name: 'George King', rating: 7300 },
//           { name: 'Helen Queen', rating: 7400 },
//         ],
//       },
//       {
//         rank: 2,
//         team: [
//           { name: 'Ian Prince', rating: 7200 },
//           { name: 'Julia Princess', rating: 7100 },
//         ],
//       },
//       {
//         rank: 3,
//         team: [
//           { name: 'Kevin Duke', rating: 7000 },
//           { name: 'Laura Duchess', rating: 7050 },
//         ],
//       },
//       {
//         rank: 4,
//         team: [
//           { name: 'Mike Earl', rating: 6950 },
//           { name: 'Nina Countess', rating: 6900 },
//         ],
//       },
//     ],
//   },
//   {
//     name: 'Group D (Court 7,8)',
//     matchups: [
//       {
//         game: '#1',
//         event: 'e:21 - 14.5',
//         team1: {
//           players: [
//             { name: 'Oscar Knight', rating: 7500 },
//             { name: 'Paula Lady', rating: 7600 },
//           ],
//           teamRank: '#1',
//           score: 21,
//         },
//         team2: {
//           players: [
//             { name: 'Quentin Baron', rating: 7400 },
//             { name: 'Rachel Baroness', rating: 7350 },
//           ],
//           teamRank: '#2',
//           score: 20,
//         },
//       },
//       {
//         game: '#2',
//         event: 'e:Event',
//         team1: {
//           players: [
//             { name: 'Steve Viscount', rating: 7200 },
//             { name: 'Tina Marquess', rating: 7250 },
//           ],
//           teamRank: '#3',
//           score: 21,
//         },
//         team2: {
//           players: [
//             { name: 'Uma Count', rating: 7150 },
//             { name: 'Victor Countess', rating: 7100 },
//           ],
//           teamRank: '#4',
//           score: 17,
//         },
//       },
//     ],
//     individualResults: [
//       {
//         match: '#1',
//         team: [
//           { name: 'Oscar Knight', rating: 7500 },
//           { name: 'Paula Lady', rating: 7600 },
//         ],
//         scores: ['21-20', '20-21', '21-19'],
//       },
//       {
//         match: '#2',
//         team: [
//           { name: 'Steve Viscount', rating: 7200 },
//           { name: 'Tina Marquess', rating: 7250 },
//         ],
//         scores: ['21-17', '17-21', '21-18'],
//       },
//     ],
//     players: [
//       {
//         rank: 1,
//         team: [
//           { name: 'Oscar Knight', rating: 7500 },
//           { name: 'Paula Lady', rating: 7600 },
//         ],
//       },
//       {
//         rank: 2,
//         team: [
//           { name: 'Quentin Baron', rating: 7400 },
//           { name: 'Rachel Baroness', rating: 7350 },
//         ],
//       },
//       {
//         rank: 3,
//         team: [
//           { name: 'Steve Viscount', rating: 7200 },
//           { name: 'Tina Marquess', rating: 7250 },
//         ],
//       },
//       {
//         rank: 4,
//         team: [
//           { name: 'Uma Count', rating: 7150 },
//           { name: 'Victor Countess', rating: 7100 },
//         ],
//       },
//     ],
//   },
// ];
</script>
