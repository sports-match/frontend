<template>
  <div class="min-h-screen bg-gradient-to-b from-[#0f111b] to-[#1a1d2e] text-white">
    <div class="space-y-12 px-4">
      <!-- Header -->
      <header class="flex justify-between items-center px-6 py-8">
        <img src="@/assets/images/main-logo.png" alt="SportRevive Logo" class="h-16 invert">
        <div class="space-x-2">
          <Button
            variant="ghost" class="text-white border border-white"
            @click="$router.push({ name: 'AuthSignupPage' })"
          >
            Sign Up
          </Button>
          <Button @click="$router.push({ name: 'AuthLoginPage' })">
            Sign In
          </Button>
        </div>
      </header>

      <!-- Hero Section -->
      <section class="text-center space-y-4 max-w-xl mx-auto">
        <h1 class="text-5xl font-bold">
          SportRevive
        </h1>
        <p class="text-2xl">
          Find Your Game. Find Your People.
        </p>
        <p class="text-xl text-gray-300">
          Badminton ladders are live – be part of the very first season in Washington!
        </p>
        <Button class="mt-4">
          Explore Competitive Ladders
        </Button>
      </section>

      <!-- Why Badminton -->
      <section class="bg-[#181E29] rounded-xl p-10 text-center max-w-5xl mx-auto">
        <h2 class="text-2xl font-semibold mb-6">
          Why Badminton First?
        </h2>
        <p class="text-gray-300">
          Badminton is one of the fastest-growing racquet sports in the U.S. We're starting here to perfect our rating system (SRR) and event flow before expanding to tennis, pickleball, and all other sports.
        </p>
      </section>

      <!-- Modes Section -->
      <section class="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <!-- Competitive Ladders -->
        <div class="bg-[#181E29] p-6 rounded-xl space-y-6">
          <h3 class="text-lg font-semibold">
            Competitive (Ladders)
          </h3>
          <p class="font-medium flex items-center gap-1">
            Status: <span class="text-green-400 flex items-center gap-1">Available <CircleCheck class="size-4" /></span>
          </p>
          <p class="text-gray-300">
            Join weekly ladders, track your SRR, and climb the local leaderboard.
          </p>
          <Button variant="ghost" class="text-white border border-white">
            View Ladders
          </Button>
        </div>

        <!-- Casual Matches -->
        <div class="bg-[#181E29] p-6 rounded-xl space-y-6">
          <h3 class="text-lg font-semibold">
            Casual Matches
          </h3>
          <p class="font-medium flex items-center gap-1">
            Status: <span class="text-red-400 flex items-center gap-1">Coming Soon <Clock class="size-4" /></span>
          </p>
          <p class="text-gray-300">
            Meet nearby players for friendly games matched by time, skill and location.
          </p>
          <Button variant="ghost" class="text-white border border-white">
            Join Waitlist
          </Button>
        </div>
      </section>

      <!-- Ladder Highlights -->
      <section class="max-w-5xl mx-auto space-y-6">
        <h2 class="text-2xl font-semibold">
          Competitive Ladder Highlights
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="border border-white/20 rounded-xl p-6 space-y-2">
            <div class="">
              <img src="@/assets/images/struture.svg" alt="Competitive Ladders" class="size-16">
            </div>
            <h3 class="font-semibold text-lg">
              Structured play
            </h3>
            <p class="text-sm text-gray-300">
              Singles & doubles brackets every week.
            </p>
          </div>
          <div class="border border-white/20 rounded-xl p-6 space-y-2">
            <div class="flex items-center mb-2">
              <ChartNoAxesCombined class="size-16" />
            </div>
            <h3 class="font-semibold text-lg">
              Real-time SRR
            </h3>
            <p class="text-sm text-gray-300">
              Beat stronger opponents, earn more points.
            </p>
          </div>
          <div class="border border-white/20 rounded-xl p-6 space-y-2">
            <div class="flex items-center mb-2">
              <Users class="size-16" />
            </div>
            <h3 class="font-semibold text-lg">
              Group fairness
            </h3>
            <p class="text-sm text-gray-300">
              Admins balance groups by SRR & court availability.
            </p>
          </div>
        </div>
      </section>

      <!-- How It Works -->
      <section class="max-w-5xl mx-auto space-y-6">
        <h2 class="text-2xl font-semibold">
          How It Works
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-[#181E29] rounded-xl p-10 text-center space-y-2">
            <div class="flex justify-center items-center mb-2">
              <User class="size-16" />
            </div>
            <h3 class="font-semibold text-lg">
              Create your profile
            </h3>
            <p class="text-sm text-gray-300">
              Self-assess your starting SRR.
            </p>
          </div>
          <div class="bg-[#181E29] rounded-xl p-10 text-center space-y-2">
            <div class="flex justify-center items-center mb-2">
              <FileCheck class="size-16" />
            </div>
            <h3 class="font-semibold text-lg">
              Join a ladder
            </h3>
            <p class="text-sm text-gray-300">
              Get confirmed or wait-listed automatically.
            </p>
          </div>
          <div class="bg-[#181E29] rounded-xl p-10 text-center space-y-2">
            <div class="flex justify-center items-center mb-2">
              <CalendarCheck2 class="size-16" />
            </div>
            <h3 class="font-semibold text-lg">
              Check in on event day
            </h3>
            <p class="text-sm text-gray-300">
              Play, log scores, watch your SRR evolve.
            </p>
          </div>
        </div>
      </section>
    </div>

    <!-- Call to Action -->
    <section
      class="mt-10 w-full bg-cover bg-center footer-bg"
    >
      <div class="text-center space-y-6 max-w-2xl mx-auto py-16">
        <h2 class="text-2xl font-bold">
          Join the Movement
        </h2>
        <p class="text-gray-200">
          SportRevive is reinventing community play. Whether you're rediscovering a sport you love or trying something completely new — there's a spot waiting for you.
        </p>
        <div class="flex flex-col md:flex-row justify-center gap-4">
          <Button class="bg-blue-600 hover:bg-blue-700">
            Explore Ladders
          </Button>
          <Button variant="ghost" class="text-white border border-white">
            Join Casual Waitlist
          </Button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-[#0d101a] text-gray-400 px-6 py-10 mt-0">
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div class="flex items-center gap-2 mb-4">
            <img src="@/assets/images/main-logo.png" alt="Logo" class="h-12 invert">
          </div>
          <p class="font-semibold text-white">
            60455 Lime Grove, Antwanborough 51316-0006
          </p>
          <p class="text-sm mt-2">
            Lorem ipsum dolor sit amet consectetur. Ultricies ac nibh laoreet mattis lacinia amet egestas. Amet ut luctus in lorem tortor imperdiet massa.
          </p>
          <p class="text-sm mt-2">
            Copyright © Sports 2025.
          </p>
        </div>
        <div class="flex flex-col justify-end items-start md:items-end space-y-4">
          <div>
            Follow Us
          </div>
          <div class="flex gap-4 mb-4">
            <a href="#" aria-label="Facebook" class="text-white"><Facebook class="size-6" /></a>
            <a href="#" aria-label="Instagram" class="text-white"><Instagram class="size-6" /></a>
            <a href="#" aria-label="Twitter" class="text-white"><Twitter class="size-6" /></a>
            <a href="#" aria-label="YouTube" class="text-white"><Youtube class="size-6" /></a>
          </div>
          <div class="text-sm flex gap-4">
            <a href="#" class="hover:text-white">Privacy Policy</a>
            <a href="#" class="hover:text-white">Term and Condition</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/shares/ui/button';
import { CalendarCheck2, ChartNoAxesCombined, CircleCheck, Clock, Facebook, FileCheck, Instagram, Twitter, User, Users, Youtube } from 'lucide-vue-next';
</script>

<style>
.footer-bg {
  background-image: url('@/assets/images/footer-bg.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
}
.footer-bg::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(15, 17, 27, 0.337);
  backdrop-filter: blur(4px);
  z-index: 0;
}
.footer-bg > * {
  position: relative;
  z-index: 1;
}
</style>
