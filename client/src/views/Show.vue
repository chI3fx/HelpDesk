<template>
  <div style="max-width:640px">
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-warning"></div>
    </div>

    <div v-else-if="entry">
      <div class="d-flex align-items-center gap-3 mb-4">
        <h2 class="fw-bold font-monospace mb-0">{{ entry.key }}</h2>
        <span :class="badgeClass(entry.category)" class="badge fs-6">
          {{ entry.category }}
        </span>
      </div>

      <div class="card border-0 shadow-sm p-4 mb-4">
        <p class="mb-0 fs-5 text-secondary">{{ entry.value }}</p>
      </div>

      <p class="text-muted small">
        Added: {{ new Date(entry.createdAt).toLocaleString() }}
      </p>

      <div class="d-flex gap-2 mt-3">
        <router-link :to="'/entries/' + entry._id + '/edit'" class="btn btn-primary">
          Edit
        </router-link>
        <router-link to="/entries" class="btn btn-outline-secondary">
          ← Back to list
        </router-link>
      </div>
    </div>

    <div v-else class="alert alert-danger">Entry not found.</div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Show',
  data() {
    return { entry: null, loading: true };
  },
  methods: {
    badgeClass(category) {
      const map = {
        Membership: 'bg-primary',
        Billing: 'bg-success',
        Bookings: 'bg-info text-dark',
        Facilities: 'bg-warning text-dark',
        'Health & Safety': 'bg-danger',
      };
      return map[category] || 'bg-secondary';
    },
  },
  async created() {
    try {
      const res = await axios.get(`/api/entries/${this.$route.params.id}`);
      this.entry = res.data;
    } catch (err) {
      console.error(err);
    } finally {
      this.loading = false;
    }
  },
};
</script>