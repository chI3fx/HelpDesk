<template>
  <div>
    <div v-if="loading" class="text-center py-5">
      <div class="toji-spinner"></div>
      <p class="mt-3" style="color:#c0c0c0;font-size:0.85rem;letter-spacing:0.1em;text-transform:uppercase;">
        Loading stats…
      </p>
    </div>

    <div v-else>
      <!-- ── Top stat cards ── -->
      <div class="stat-grid mb-4">

        <!-- Total entries -->
        <div class="stat-card stat-card--accent">
          <div class="stat-card__label">Total Responses</div>
          <div class="stat-card__number">{{ entries.length }}</div>
          <div class="stat-card__sub">in the library</div>
        </div>

        <!-- Category breakdown -->
        <div class="stat-card">
          <div class="stat-card__label">By Category</div>
          <div class="badge-grid mt-2">
            <span
              v-for="(count, cat) in categoryCounts"
              :key="cat"
              class="toji-badge"
              :style="badgeStyle(cat)"
            >
              {{ cat }}: <strong>{{ count }}</strong>
            </span>
          </div>
        </div>

        <!-- Most recent -->
        <div class="stat-card stat-card--recent">
          <div class="stat-card__label">Most Recently Added</div>
          <template v-if="latestEntry">
            <div class="recent-key">{{ latestEntry.key }}</div>
            <p class="recent-value">{{ latestEntry.value }}</p>
            <span class="toji-badge" :style="badgeStyle(latestEntry.category)">
              {{ latestEntry.category }}
            </span>
          </template>
          <p v-else style="color:#c0c0c0;font-size:0.85rem;">No entries yet.</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const CATEGORY_COLORS = {
  Membership:       { bg: '#1a2a3a', text: '#5bc8f5', border: '#1e4a6a' },
  Billing:          { bg: '#1a2e1a', text: '#39ff6a', border: '#1e4a1e' },
  Bookings:         { bg: '#2a1a3a', text: '#b47dff', border: '#4a1e6a' },
  Facilities:       { bg: '#2e2a14', text: '#f5c542', border: '#5a4a10' },
  'Health & Safety':{ bg: '#2e1a1a', text: '#ff6b6b', border: '#5a1e1e' },
};

export default {
  name: 'StatsDashboard',
  data() {
    return { entries: [], loading: true };
  },
  computed: {
    categoryCounts() {
      return this.entries.reduce((acc, e) => {
        acc[e.category] = (acc[e.category] || 0) + 1;
        return acc;
      }, {});
    },
    latestEntry() {
      return this.entries.length ? this.entries[0] : null;
    },
  },
  methods: {
    badgeStyle(category) {
      const c = CATEGORY_COLORS[category] || { bg: '#1e1e1e', text: '#aaa', border: '#333' };
      return `background:${c.bg};color:${c.text};border-color:${c.border};`;
    },
  },
  async created() {
    try {
      const res = await axios.get('/api/entries');
      this.entries = res.data;
    } catch (err) {
      console.error(err);
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
/* ── Grid ── */
.stat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

/* ── Cards ── */
.stat-card {
  background: #161616;
  border: 1px solid #252525;
  border-radius: 8px;
  padding: 1.4rem 1.6rem;
  transition: border-color 0.2s;
}

.stat-card:hover {
  border-color: #333;
}

.stat-card--accent {
  border-color: #39ff6a33;
  background: #0f1f0f;
}

.stat-card--recent {
  border-left: 3px solid #39ff6a;
}

.stat-card__label {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #c5c5c5;
  margin-bottom: 0.6rem;
}

.stat-card__number {
  font-size: 3.5rem;
  font-weight: 900;
  color: #39ff6a;
  line-height: 1;
  font-family: 'Impact', 'Arial Black', sans-serif;
}

.stat-card__sub {
  font-size: 0.75rem;
  color: #c0c0c0;
  margin-top: 0.2rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* ── Recent entry ── */
.recent-key {
  font-family: 'Courier New', monospace;
  font-size: 1.1rem;
  font-weight: 700;
  color: #f0f0f0;
  margin-bottom: 0.5rem;
  letter-spacing: 0.05em;
}

.recent-value {
  font-size: 0.82rem;
  color: #cfcfcf;
  margin-bottom: 0.75rem;
  line-height: 1.5;
}

/* ── Badges ── */
.badge-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.toji-badge {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  padding: 0.25rem 0.65rem;
  border-radius: 3px;
  border: 1px solid;
  text-transform: uppercase;
}

/* ── Spinner ── */
.toji-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #1e1e1e;
  border-top-color: #39ff6a;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
