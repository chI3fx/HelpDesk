<template>
  <div style="max-width:680px;margin:0 auto">
    <h2 class="fw-bold mb-1">Staff Training Quiz 🏋️</h2>
    <p class="text-muted mb-4">
      Test your knowledge of standard member response procedures.
    </p>
    <HelpdeskQuiz />
  </div>
</template>

<script>
import HelpdeskQuiz from '../components/HelpdeskQuiz.vue';
export default {
  name: 'Test',
  components: { HelpdeskQuiz },
};
</script>