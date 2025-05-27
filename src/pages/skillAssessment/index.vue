<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-white">
    <Card class="w-full max-w-4xl p-8 shadow-md rounded-xl">
      <CardHeader class="text-center mb-6">
        <CardTitle class="text-2xl font-semibold">
          Initial Skill Assessment
        </CardTitle>
        <CardDescription>
          Answer a few questions to match you with the right opponents.
        </CardDescription>
      </CardHeader>

      <div class="flex gap-6">
        <!-- Stepper Sidebar -->
        <div class="w-1/3">
          <Stepper v-model="currentStep" orientation="vertical" class="mx-auto flex w-full max-w-md flex-col justify-start gap-10">
            <StepperItem
              v-for="(step, index) in stepsSelector"
              :key="step + index"
              v-slot="{ state }"
              class="relative flex w-full gap-6"
              :step="index"
            >
              <StepperSeparator
                v-if="step !== steps[steps.length - 1]"
                class="absolute left-[26px] top-[45px] block h-[105%] w-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-green-600"
              />

              <StepperTrigger as-child>
                <span>
                  <Button
                    :variant="state === 'completed' || state === 'active' ? 'default' : 'outline'"
                    size="icon"
                    class="z-10 rounded-full shrink-0"
                    :class="cn(
                      [state === 'active' && 'ring-2 ring-ring ring-offset-2 ring-offset-background'],
                      [state === 'completed' && 'bg-green-600 text-primary-foreground'])"
                  >
                    <Check v-if="state === 'completed'" class="size-5" />
                    <Circle v-if="state === 'active'" />
                    <Dot v-if="state === 'inactive'" />
                  </Button>
                </span>
              </StepperTrigger>

              <div class="flex flex-col gap-1">
                <StepperTitle
                  :class="[state === 'active' && 'text-primary']"
                  class="text-sm font-semibold transition lg:text-base"
                >
                  {{ step }}
                </StepperTitle>
              </div>
            </StepperItem>
          </Stepper>
        </div>

        <!-- Step Content -->
        <div class="w-2/3 space-y-4">
          <div v-for="(step, index) in steps" v-show="currentStep === index" :key="index">
            <h2 v-if="currentStep > 0" class="text-lg font-semibold mb-2">
              <span>
                Question #{{ currentStep }}.
              </span>
              {{ steps[currentStep].label }}
            </h2>
            <p class="text-sm text-muted-foreground whitespace-pre-line mb-4" v-html="steps[currentStep].content" />
            <Input
              v-if="steps[currentStep].input.type === 'date'"
              v-model="form[steps[currentStep].input.model]"
              type="date"
              :placeholder="steps[currentStep].input.placeholder"
              class="w-full"
            />
            <Input
              v-else
              v-model="form[steps[currentStep].input.model]"
              type="text"
              :placeholder="steps[currentStep].input.placeholder"
              class="w-full"
            />
          </div>

          <div class="pt-6">
            <Button class="w-full" @click="nextStep">
              Next <ArrowRight class="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>

    <footer class="text-xs text-muted-foreground mt-12">
      © 2025 sportreview.com
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/shares/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/shares/ui/card';
import { Input } from '@/components/shares/ui/input';
import { Stepper, StepperItem, StepperSeparator, StepperTitle, StepperTrigger } from '@/components/shares/ui/stepper';
import { cn } from '@/utils';
import { ArrowRight, Check, Circle, Dot } from 'lucide-vue-next';
import { ref } from 'vue';

const currentStep = ref(0);
const stepsSelector = [
  'Birthday',
  'Court Coverage',
  'Shot Quality',
  'Consistency / Control',
  'Power',
  'Anticipation & Strategy',
];

function nextStep() {
  if (currentStep.value < stepsSelector.length - 1) {
    currentStep.value++;
  }
}

const form = ref({
  birthday: '',
  courtCoverage: '',
  shotQuality: '',
  consistency: '',
  power: '',
  anticipation: '',
});

const steps = [
  {
    label: 'Birthday',
    content: `
      **Your answers to this survey will be kept confidential. Only your initial rating, once generated, will be public on your account.
    `,
    input: {
      type: 'date',
      model: 'birthday',
      placeholder: 'Birthday',
    },
  },
  {
    label: 'Court Coverage',
    content: `
      (1) I can reach shots 1 step away and sometimes return to a neutral position

      (5~6) I can cover the entire court somewhat consistently, but sometimes over-extending puts me off-balance or out of position for the following shot.

      (10) I can cover all shots and recover to a neutral position consistently, and in doubles can cover some of my partner's responsibilities as well.
    `,
    input: {
      type: 'text',
      model: 'courtCoverage',
      placeholder: 'Please make your selection',
    },
  },
  {
    label: 'Shot Quality',
    content: `
      (1) I can hit only basic shots to most areas on the court, but not able to hit all the shots I would like.

      (5~6) I can hit all shots to and from anywhere on the court if I am in a favorable position, and can add elements of deception to some shots.

      (10) I can hit all shots to and from anywhere on the court even if I am in an unfavorable position (eg. backhand clear), and can include elements of deception at will.
    `,
    input: {
      type: 'text',
      model: 'shotQuality',
      placeholder: 'Please make your selection',
    },
  },
  {
    label: 'Consistency / Control',
    content: `
      (1) I'm not very consistent yet. Unforced errors are fairly common. I am beginning to learn how to control the speed and direction of the shuttle.

      (5~6) When comfortable, I'm mostly consistent, but shot control decreases in high pressure scenarios when the pace and intensity of the rally increases. Unforced errors are still somewhat common.

      (10) I'm very consistent and shot control remains steady even in high pressure scenarios. Unforced errors are rare.
    `,
    input: {
      type: 'text',
      model: 'consistency',
      placeholder: 'Please make your selection',
    },
  },
  {
    label: 'Power',
    content: `
      (1) I cannot clear the shuttle from baseline to baseline (full court) easily.

      (5~6) I can clear the shuttle from baseline to baseline repeatedly, but I will start to fatigue.

      (10) Clearing the shuttle from baseline to baseline repeatedly does not require much effort, and can even be done easily even from an off-balanced/recovery position from the deep corners of the court.
    `,
    input: {
      type: 'text',
      model: 'power',
      placeholder: 'Please make your selection',
    },
  },
  {
    label: 'Anticipation & Strategy',
    content: `
      (1) I tend to react to shots one-at-a-time and it can be difficult to execute a specific strategy during a rally.

      (5~6) I can anticipate some shots my opponent will hit, and some basic tendencies. I may approach a match with a simple strategy and adjust my strategy at some point during a match.

      (10) I can recognize patterns and tendencies in my opponent's play as well as my own, and use that knowledge to make several adjustments throughout a match.
    `,
    input: {
      type: 'text',
      model: 'anticipation',
      placeholder: 'Please make your selection',
    },
  },
];
</script>
