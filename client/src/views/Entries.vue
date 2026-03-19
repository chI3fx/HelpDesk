<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="fw-bold mb-0">All Entries</h2>
      <router-link to="/entries/new" class="btn btn-warning fw-bold">
        + Add Entry
      </router-link>
    </div>

    <!-- Live search -->
    <input
      v-model="search"
      type="text"
      class="form-control mb-4"
      placeholder="🔍 Search by key or category…"
    />

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-warning"></div>
    </div>

    <div v-else-if="filtered.length === 0" class="alert alert-info">
      No entries match your search.
    </div>

    <div v-else class="table-responsive">
      <table class="table table-hover align-middle">
        <thead class="table-dark">
          <tr>
            <th>Key</th>
            <th>Value</th>
            <th>Category</th>
            <th class="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entry in filtered" :key="entry._id">
            <td class="font-monospace fw-bold">{{ entry.key }}</td>
            <td class="text-muted small">{{ entry.value }}</td>
            <td>
              <span :class="badgeClass(entry.category)" class="badge">
                {{ entry.category }}
              </span>
            </td>
            <td class="text-end">
              <router-link
                :to="'/entries/' + entry._id"
                class="btn btn-sm btn-outline-secondary me-1"
              >View</router-link>
              <router-link
                :to="'/entries/' + entry._id + '/edit'"
                class="btn btn-sm btn-outline-primary me-1"
              >Edit</router-link>
              <button
                class="btn btn-sm btn-outline-danger"
                @click="remove(entry._id)"
              >Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Entries',
  data() {
    return { entries: [], search: '', loading: true };
  },
  computed: {
    filtered() {
      const q = this.search.toLowerCase();
      return this.entries.filter(
        (e) =>
          e.key.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q)
      );
    },
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
    async remove(id) {
      if (!confirm('Delete this entry?')) return;
      await axios.delete(`/api/entries/${id}`);
      this.entries = this.entries.filter((e) => e._id !== id);
    },
  },
  async created() {
    const res = await axios.get('/api/entries');
    this.entries = res.data;
    this.loading = false;
  },
};
</script>