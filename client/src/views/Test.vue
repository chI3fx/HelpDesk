<template>
  <div style="max-width:680px;margin:0 auto">
    <h2 class="fw-bold mb-1 quiz-title">Staff Training Quiz 🏋️</h2>
    <p class="fw-bold mb-4 introduction-text" >Test your knowledge of standard member response procedures.</p>
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

<style scoped>
.introduction-text {
  color: #ffffff;
}
.quiz-title {
  color: #39ff6a; /* Change this hex code to your preferred color */
}
</style>