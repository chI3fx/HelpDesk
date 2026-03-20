<template>
  <div class="toji-home">
    <!-- Hero -->
    <div class="hero-modern">
      <div class="hero-badge">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
        <span>Staff Portal</span>
      </div>
      <h1 class="hero-title">
        <span class="title-line">TOJI<span class="hero-accent">LIFTS</span></span>
        <span class="title-sub">Helpdesk Response Library</span>
      </h1>
      <p class="hero-description">
        Know the answer every time. Access standardized responses, track performance, and master customer service.
      </p>
    </div>

    <!-- Stats Dashboard -->
    <StatsDashboard />

    <!-- Quick Actions -->
    <div class="quick-actions">
      <router-link to="/entries" class="action-card action-card--view">
        <div class="action-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 6h3a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>
        </div>
        <div class="action-content">
          <h3>View All Responses</h3>
          <p>Browse and search the complete library</p>
        </div>
        <div class="action-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </div>
      </router-link>

      <router-link to="/entries/new" class="action-card action-card--new">
        <div class="action-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </div>
        <div class="action-content">
          <h3>Add New Entry</h3>
          <p>Create a new response template</p>
        </div>
        <div class="action-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </div>
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
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ── Modern Hero ── */
.hero-modern {
  margin-bottom: 3rem;
  padding: 2rem 0;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: rgba(57, 255, 106, 0.1);
  border: 1px solid rgba(57, 255, 106, 0.2);
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #39ff6a;
  margin-bottom: 1.5rem;
  animation: slideDown 0.6s ease;
}

.hero-badge svg {
  width: 12px;
  height: 12px;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.hero-title {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.title-line {
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1;
  color: #f0f0f0;
  font-family: 'Impact', 'Arial Black', sans-serif;
  animation: slideUp 0.6s ease 0.1s both;
}

.title-sub {
  font-size: clamp(1.2rem, 4vw, 1.8rem);
  font-weight: 600;
  color: #666;
  letter-spacing: -0.01em;
  animation: slideUp 0.6s ease 0.2s both;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.hero-accent {
  background: linear-gradient(135deg, #39ff6a 0%, #2de05c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 1.1rem;
  color: #999;
  line-height: 1.7;
  max-width: 640px;
  animation: fadeIn 0.6s ease 0.3s both;
}

/* ── Quick Actions ── */
.quick-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;
  animation: fadeIn 0.6s ease 0.4s both;
}

.action-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(22, 22, 22, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  text-decoration: none;
  overflow: hidden;
  transition: all 0.3s ease;
}

.action-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, transparent 0%, rgba(57, 255, 106, 0.05) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.action-card:hover::before {
  opacity: 1;
}

.action-card:hover {
  border-color: rgba(57, 255, 106, 0.3);
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(57, 255, 106, 0.1);
}

.action-card--new {
  border-color: rgba(57, 255, 106, 0.2);
}

.action-card--new::before {
  background: linear-gradient(135deg, transparent 0%, rgba(57, 255, 106, 0.1) 100%);
}

.action-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(57, 255, 106, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #39ff6a;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.action-card:hover .action-icon {
  background: rgba(57, 255, 106, 0.2);
  transform: scale(1.1);
}

.action-content {
  flex: 1;
  position: relative;
  z-index: 1;
}

.action-content h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #f0f0f0;
  margin: 0 0 0.3rem;
  transition: color 0.3s ease;
}

.action-card:hover .action-content h3 {
  color: #39ff6a;
}

.action-content p {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
}

.action-arrow {
  color: #444;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

.action-card:hover .action-arrow {
  color: #39ff6a;
  transform: translateX(4px);
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .hero-modern {
    padding: 1rem 0;
  }
  
  .quick-actions {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
