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
              v-for="(step, index) in questions"
              :key="`${step.id}-${index}`"
              v-slot="{ state }"
              class="relative flex w-full gap-6"
              :step="index"
              disabled
            >
              <StepperSeparator
                v-if="step !== questions[questions.length - 1]"
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
                  class="text-sm font-semibold transition lg:text-base capitalize"
                >
                  {{ step.category }}
                </StepperTitle>
              </div>
            </StepperItem>
          </Stepper>
        </div>

        <!-- Step Content -->
        <form class="w-2/3 space-y-4" @submit.prevent="handleSubmit">
          <div v-for="(step, index) in questions" v-show="currentStep === index" :key="index">
            <h2 class="text-lg font-semibold mb-2">
              <span>
                Question #{{ currentStep + 1 }}.
              </span>
              <span class="capitalize">
                {{ step.category }}
              </span>
            </h2>
            <p class="text-sm text-muted-foreground whitespace-pre-line mb-4">
              {{ step.text }}
            </p>
            <Input
              v-model="form[step.id]"
              :name="step.category"
              type="number"
              :placeholder="`${step.minValue} ~ ${step.maxValue}`"
              class="w-full"
              :max="step.maxValue"
              :min="step.minValue"
            />
            <div
              v-if="form[step.id] !== undefined && !(form[step.id] >= step.minValue && form[step.id] <= step.maxValue)"
              :key="step.id"
              class="text-destructive"
            >
              Value should be between {{ step.minValue }} and {{ step.maxValue }}
            </div>

            <div class="pt-6 flex flex-col gap-2">
              <div class="flex gap-2">
                <Button
                  v-if="currentStep > 0"
                  class="flex-1"
                  type="button"
                  variant="outline"
                  @click="currentStep--"
                >
                  Back
                </Button>
                <Button
                  v-if="currentStep === questions.length - 1"
                  class="flex-1"
                  type="submit"
                  :disabled="!form[step.id]"
                >
                  Submit <ArrowRight class="ml-2 h-4 w-4" />
                </Button>
                <Button
                  v-else
                  class="flex-1"
                  type="button"
                  :disabled="!(form[step.id] || form[step.id] >= step.minValue && form[step.id] <= step.maxValue)"
                  @click="nextStep(step.id, form[step.id], form[step.id] >= step.minValue && form[step.id] <= step.maxValue)"
                >
                  Next <ArrowRight class="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Card>

    <footer class="text-xs text-muted-foreground mt-12">
      © 2025 sportreview.com
    </footer>
  </div>
</template>

<script setup lang="ts">
import { answerSelfAssessment, selfAssessmentQuestions } from '@/api/user';
import { Button } from '@/components/shares/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/shares/ui/card';
import { Input } from '@/components/shares/ui/input';
import { Stepper, StepperItem, StepperSeparator, StepperTitle, StepperTrigger } from '@/components/shares/ui/stepper';
import { notify } from '@/composables/notify';
import { useUserStore } from '@/stores/user';
import { cn } from '@/utils';
import { ArrowRight, Check, Circle, Dot } from 'lucide-vue-next';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

type Question = {
  id: number;
  category: string;
  text: string;
  minValue: number;
  maxValue: number;
  orderIndex: number;
};

const userStore = useUserStore();
const router = useRouter();

const questions = ref<Question[]>([]);
const answers = ref<{ questionId: number; answerValue: number; playerId: number }[]>([]);
const form = ref<Record<string, number>>({});
const currentStep = ref(0);

async function fetchQuestions() {
  try {
    const { data } = await selfAssessmentQuestions();
    questions.value = data.sort((a: Question, b: Question) => a.orderIndex - b.orderIndex);
  } catch (error) {
    notify.error(error as string);
  }
}

const playerId = computed(() => userStore?.userDetails.playerId || null);

onMounted(() => {
  fetchQuestions();
});

function handleSubmit() {
  // Collect all answers before submit
  const lastStep = questions.value[currentStep.value];
  if (lastStep && form.value[lastStep.id] !== undefined) {
    nextStep(lastStep.id, form.value[lastStep.id], true);
  }
  submitQuestions();
}

async function submitQuestions() {
  try {
    await answerSelfAssessment({ answers: answers.value });
    userStore.setAssessmentStatus(true);
    router.push({ name: 'DashboardPage' });
    notify.success('Assessment submitted successfully!');
  } catch (error) {
    notify.error(error as string);
  }
}
function nextStep(questionId: number, value: number, isValid: boolean) {
  if (!isValid)
    return;
  if (currentStep.value < questions.value.length - 1) {
    currentStep.value++;
  }

  const existingAnswer = answers.value.find(ans => ans.questionId === questionId);
  if (existingAnswer) {
    existingAnswer.answerValue = value;
  } else {
    answers.value.push({
      questionId,
      answerValue: value,
      playerId: playerId.value as number,
    });
  }
}
</script>
