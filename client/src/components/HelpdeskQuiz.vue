<template>
  <div>
    <!-- Loading -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-warning"></div>
      <p class="mt-2 text-muted">Loading quiz…</p>
    </div>

    <!-- Not enough entries -->
    <div v-else-if="entries.length < 4" class="alert alert-warning">
      You need at least 4 entries in the library to run the quiz.
    </div>

    <!-- Quiz finished -->
    <div v-else-if="finished" class="text-center py-5">
      <div class="display-1 mb-3">{{ scoreEmoji }}</div>
      <h2 class="fw-bold">Quiz Complete!</h2>
      <p class="lead">
        You scored <strong>{{ score }}</strong> out of
        <strong>{{ questions.length }}</strong>
      </p>
      <div class="progress mx-auto mb-4" style="max-width:300px; height:12px">
        <div
          class="progress-bar bg-warning"
          :style="{ width: scorePercent + '%' }"
        ></div>
      </div>
      <button class="btn btn-dark fw-bold px-5" @click="restart">
        🔄 Restart Quiz
      </button>
    </div>

    <!-- Active quiz -->
    <div v-else>
      <!-- Progress -->
      <div class="d-flex justify-content-between align-items-center mb-3">
        <span class="badge bg-dark fs-6">
          Question {{ currentIndex + 1 }} / {{ questions.length }}
        </span>
        <span class="text-muted small">Score: {{ score }}</span>
      </div>
      <div class="progress mb-4" style="height:6px">
        <div
          class="progress-bar bg-warning"
          :style="{ width: progressWidth + '%' }"
        ></div>
      </div>

      <!-- Question card -->
      <div class="card border-0 shadow-sm p-4 mb-4">
        <h5 class="text-muted small text-uppercase fw-bold mb-1">Member Issue Code</h5>
        <div class="font-monospace display-6 fw-bold text-dark mb-0">
          {{ currentQuestion.key }}
        </div>
        <p class="text-muted small mt-2 mb-0">What is the correct staff response to this issue?</p>
      </div>

      <!-- Options -->
      <div class="row g-3 mb-4">
        <div
          v-for="(option, i) in currentQuestion.options"
          :key="i"
          class="col-12"
        >
          <button
            class="btn w-100 text-start py-3 px-4"
            :class="optionClass(option)"
            :disabled="answered"
            @click="answer(option)"
          >
            <span class="fw-bold me-2">{{ labels[i] }}.</span>
            {{ option }}
          </button>
        </div>
      </div>

      <!-- Feedback -->
      <div v-if="answered">
        <div
          class="alert"
          :class="selectedAnswer === currentQuestion.correct ? 'alert-success' : 'alert-danger'"
        >
          <template v-if="selectedAnswer === currentQuestion.correct">
            ✅ Correct!
          </template>
          <template v-else>
            ❌ Incorrect. The correct answer was:
            <strong>{{ currentQuestion.correct }}</strong>
          </template>
        </div>
        <button class="btn btn-dark fw-bold px-4" @click="next">
          {{ currentIndex < questions.length - 1 ? 'Next Question →' : 'See Results' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HelpdeskQuiz',
  data() {
    return {
      entries: [],
      questions: [],
      currentIndex: 0,
      score: 0,
      selectedAnswer: null,
      answered: false,
      finished: false,
      loading: true,
      labels: ['A', 'B', 'C', 'D'],
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentIndex];
    },
    progressWidth() {
      return ((this.currentIndex) / this.questions.length) * 100;
    },
    scorePercent() {
      return Math.round((this.score / this.questions.length) * 100);
    },
    scoreEmoji() {
      const p = this.scorePercent;
      if (p === 100) return '🏆';
      if (p >= 80) return '🌟';
      if (p >= 60) return '👍';
      if (p >= 40) return '🤔';
      return '📚';
    },
  },
  methods: {
    buildQuestions() {
      // Shuffle entries and build one question per entry (up to all entries)
      const shuffled = [...this.entries].sort(() => Math.random() - 0.5);
      this.questions = shuffled.map((entry) => {
        const wrongs = this.entries
          .filter((e) => e._id !== entry._id)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map((e) => e.value);
        const options = [...wrongs, entry.value].sort(() => Math.random() - 0.5);
        return { key: entry.key, correct: entry.value, options };
      });
    },
    answer(option) {
      this.selectedAnswer = option;
      this.answered = true;
      if (option === this.currentQuestion.correct) this.score++;
    },
    next() {
      if (this.currentIndex < this.questions.length - 1) {
        this.currentIndex++;
        this.answered = false;
        this.selectedAnswer = null;
      } else {
        this.finished = true;
      }
    },
    restart() {
      this.currentIndex = 0;
      this.score = 0;
      this.answered = false;
      this.selectedAnswer = null;
      this.finished = false;
      this.buildQuestions();
    },
    optionClass(option) {
      if (!this.answered) return 'btn-outline-secondary';
      if (option === this.currentQuestion.correct) return 'btn-success text-white';
      if (option === this.selectedAnswer) return 'btn-danger text-white';
      return 'btn-outline-secondary opacity-50';
    },
  },
  async created() {
    try {
      const res = await axios.get('/api/entries');
      this.entries = res.data;
      if (this.entries.length >= 4) this.buildQuestions();
    } catch (err) {
      console.error(err);
    } finally {
      this.loading = false;
    }
  },
};
</script>