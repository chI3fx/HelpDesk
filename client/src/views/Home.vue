<template>
  <div class="toji-home">
    <!-- Hero -->
    <div class="hero mb-5">
      <div class="hero-eyebrow">Staff Portal</div>
      <h1 class="hero-title">TOJI<span class="hero-accent">LIFTS</span></h1>
      <p class="hero-sub">Helpdesk Response Library — know the answer every time.</p>
    </div>

    <StatsDashboard />

    <div class="cta-row mt-5">
      <router-link to="/entries" class="btn-toji btn-toji--outline">
        View All Responses
      </router-link>
      <router-link to="/entries/new" class="btn-toji btn-toji--primary">
        + Add New Entry
      </router-link>
    </div>
  </div>
</template>

<script>
import StatsDashboard from '../components/StatsDashboard.vue';
export default {
  name: 'Home',
  components: { StatsDashboard },
};
</script>

<style scoped>
.toji-home {
  padding-top: 1rem;
}

.hero {
  border-left: 4px solid #39ff6a;
  padding-left: 1.5rem;
  margin-bottom: 2.5rem;
}

.hero-eyebrow {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #39ff6a;
  margin-bottom: 0.4rem;
}

.hero-title {
  font-size: clamp(2.8rem, 8vw, 5rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1;
  color: #f0f0f0;
  margin: 0 0 0.6rem;
  font-family: 'Impact', 'Arial Black', sans-serif;
}

.hero-accent {
  color: #39ff6a;
}

.hero-sub {
  font-size: 1rem;
  color: #8a8a8a;
  margin: 0;
  max-width: 480px;
}

.cta-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-toji {
  display: inline-flex;
  align-items: center;
  padding: 0.65rem 1.6rem;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.15s ease;
}

.btn-toji--primary {
  background: #39ff6a;
  color: #111;
  border: 2px solid #39ff6a;
}

.btn-toji--primary:hover {
  background: #2de05c;
  border-color: #2de05c;
  color: #111;
}

.btn-toji--outline {
  background: transparent;
  color: #f0f0f0;
  border: 2px solid #444;
}

.btn-toji--outline:hover {
  border-color: #39ff6a;
  color: #39ff6a;
}
</style>