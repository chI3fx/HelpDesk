<template>
  <div class="entries-view">
    <!-- Header -->
    <div class="page-header">
      <div>
        <h2 class="page-title">All Entries</h2>
        <p class="page-subtitle">Browse helpdesk entries and member submissions</p>
      </div>
      <router-link v-if="isStaff" to="/entries/new" class="btn btn-warning">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        <span>Add Entry</span>
      </router-link>
    </div>

    <!-- Search -->
    <div class="search-box">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      <input
        v-model="search"
        type="text"
        class="search-input"
        placeholder="Search by key or category..."
      />
    </div>

    <!-- Loading -->
    <div v-if="loading" class="loading-state">
      <div class="modern-spinner"></div>
      <p>Loading entries...</p>
    </div>

    <!-- No Results -->
    <div v-else-if="filtered.length === 0" class="empty-state">
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      <h3>No entries found</h3>
      <p>Try adjusting your search criteria</p>
    </div>

    <!-- Entries Table (Desktop) -->
    <div v-else class="entries-container">
      <div class="table-responsive d-none d-md-block">
        <table class="table modern-table">
          <thead>
            <tr>
              <th style="width: 25%">Response Key</th>
              <th style="width: 40%">Standard Response</th>
              <th style="width: 15%">Category</th>
              <th v-if="isStaff" style="width: 15%">Submitted By</th>
              <th style="width: 10%">Status</th>
              <th v-if="isStaff" style="width: 20%" class="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="entry in filtered" :key="entry._id" class="entry-row">
              <td>
                <code class="entry-key">{{ entry.key }}</code>
              </td>
              <td>
                <span class="entry-value">{{ truncate(entry.value, 80) }}</span>
              </td>
              <td>
                <span :class="badgeClass(entry.category)" class="badge">
                  {{ entry.category }}
                </span>
              </td>
              <td v-if="isStaff">
                <span class="entry-value">
                  {{ entry.submittedBy?.name || 'Unknown' }}
                  <small v-if="entry.submittedBy?.email" class="d-block text-muted">{{ entry.submittedBy.email }}</small>
                </span>
              </td>
              <td>
                <span class="badge" :class="entry.status === 'resolved' ? 'bg-success text-white' : 'bg-warning text-dark'">
                  {{ entry.status || 'open' }}
                </span>
              </td>
              <td v-if="isStaff" class="text-end">
                <div class="action-buttons">
                  <router-link
                    :to="'/entries/' + entry._id"
                    class="btn btn-sm btn-outline-secondary"
                    title="View"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                  </router-link>
                  <router-link
                    :to="'/entries/' + entry._id + '/edit'"
                    class="btn btn-sm btn-outline-primary"
                    title="Edit"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
                  </router-link>
                  <button
                    v-if="entry.status !== 'resolved'"
                    class="btn btn-sm btn-outline-success"
                    @click="setStatus(entry._id, 'resolved')"
                    title="Mark Resolved"
                  >
                    Resolve
                  </button>
                  <button
                    v-if="entry.status === 'resolved'"
                    class="btn btn-sm btn-outline-warning"
                    @click="setStatus(entry._id, 'open')"
                    title="Reopen"
                  >
                    Reopen
                  </button>
                  <button
                    class="btn btn-sm btn-outline-danger"
                    @click="remove(entry._id)"
                    title="Delete"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Entry Cards (Mobile) -->
      <div class="entry-cards d-md-none">
        <div v-for="entry in filtered" :key="entry._id" class="entry-card">
          <div class="entry-card-header">
            <code class="entry-key">{{ entry.key }}</code>
            <span :class="badgeClass(entry.category)" class="badge">
              {{ entry.category }}
            </span>
          </div>
          <p class="entry-card-value">{{ truncate(entry.value, 100) }}</p>
          <p v-if="isStaff" class="entry-card-value mb-2">
            <strong>Submitted by:</strong> {{ entry.submittedBy?.name || 'Unknown' }}
            <span v-if="entry.submittedBy?.email"> ({{ entry.submittedBy.email }})</span>
          </p>
          <div class="entry-card-actions">
            <router-link :to="'/entries/' + entry._id" class="btn btn-sm btn-outline-secondary">
              View
            </router-link>
            <router-link v-if="isStaff" :to="'/entries/' + entry._id + '/edit'" class="btn btn-sm btn-outline-primary">
              Edit
            </router-link>
            <button
              v-if="isStaff && entry.status !== 'resolved'"
              class="btn btn-sm btn-outline-success"
              @click="setStatus(entry._id, 'resolved')"
            >
              Resolve
            </button>
            <button
              v-if="isStaff && entry.status === 'resolved'"
              class="btn btn-sm btn-outline-warning"
              @click="setStatus(entry._id, 'open')"
            >
              Reopen
            </button>
            <button v-if="isStaff" class="btn btn-sm btn-outline-danger" @click="remove(entry._id)">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { getCurrentUser } from '../services/auth';
export default {
  name: 'Entries',
  data() {
    return { entries: [], search: '', loading: true, currentUser: getCurrentUser() };
  },
  computed: {
    isStaff() {
      return this.currentUser?.role === 'staff';
    },
    filtered() {
      const q = this.search.toLowerCase();
      return this.entries.filter(
        (e) =>
          e.key.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q) ||
          e.value.toLowerCase().includes(q)
      );
    },
  },
  methods: {
    badgeClass(category) {
      const map = {
        Membership: 'bg-primary text-white',
        Billing: 'bg-success text-white',
        Bookings: 'bg-info text-dark',
        Facilities: 'bg-warning text-dark',
        'Health & Safety': 'bg-danger text-white',
      };
      return map[category] || 'bg-secondary text-white';
    },
    truncate(text, length) {
      return text.length > length ? text.substring(0, length) + '...' : text;
    },
    async remove(id) {
      if (!confirm('Delete this entry?')) return;
      await axios.delete(`/api/entries/${id}`);
      this.entries = this.entries.filter((e) => e._id !== id);
    },
    async setStatus(id, status) {
      const res = await axios.patch(`/api/entries/${id}/status`, { status });
      const idx = this.entries.findIndex((e) => e._id === id);
      if (idx !== -1) this.entries[idx] = res.data;
    },
  },
  async created() {
    const res = await axios.get('/api/entries');
    this.entries = res.data;
    this.loading = false;
  },
};
</script>

<style scoped>
.entries-view {
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ── Header ── */
.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #f0f0f0;
  margin: 0 0 0.5rem;
}

.page-subtitle {
  color: #ffffff;
  margin: 0;
  font-size: 1.05rem;
}

/* ── Search ── */
.search-box {
  position: relative;
  margin-bottom: 2rem;
  max-width: 500px;
}

.search-box svg {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #ffffff;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 14px 16px 14px 48px;
  background: rgba(22, 22, 22, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #f7f7f7;
  font-size: 15px;
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  background: rgba(22, 22, 22, 0.8);
  border-color: #39ff6a;
  box-shadow: 0 0 0 3px rgba(57, 255, 106, 0.1);
}

.search-input::placeholder {
  color: #f9f9f9;
}

/* ── Loading ── */
.loading-state {
  text-align: center;
  padding: 4rem 0;
}

.modern-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(57, 255, 106, 0.2);
  border-top-color: #39ff6a;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-state p {
  color: #c5c5c5;
  font-size: 14px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

/* ── Empty State ── */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: rgba(22, 22, 22, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
}

.empty-state svg {
  color: #b8b8b8;
  margin-bottom: 1.5rem;
}

.empty-state h3 {
  font-size: 1.5rem;
  color: #d0d0d0;
  margin-bottom: 0.5rem;
}

.empty-state p {
  color: #c4c4c4;
  margin: 0;
}

/* ── Table ── */
.entries-container {
  animation: slideUp 0.6s ease;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.modern-table {
  --bs-table-bg: #2a2a2a;
  --bs-table-color: #f0f0f0;
  --bs-table-border-color: rgba(255, 255, 255, 0.1);
}

.modern-table thead th {
  font-weight: 700 !important;
  padding-top: 1rem !important;
  padding-bottom: 1rem !important;
  color: #ffffff;
}

.entry-row {
  transition: all 0.2s ease;
}

.entry-row:hover {
  background: rgba(57, 255, 106, 0.03) !important;
}

.entry-key {
  display: inline-block;
  font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
  font-size: 13px;
  font-weight: 700;
  color: #39ff6a;
  background: rgba(57, 255, 106, 0.1);
  padding: 4px 10px;
  border-radius: 6px;
  letter-spacing: 0.3px;
}

.entry-value {
  color: #c5c5c5;
  font-size: 14px;
  line-height: 1.6;
}

.action-buttons {
  display: flex;
  gap: 6px;
  justify-content: flex-end;
}

.btn-sm {
  padding: 6px 12px !important;
  font-size: 13px !important;
}

.btn-sm svg {
  width: 14px;
  height: 14px;
}

/* ── Mobile Cards ── */
.entry-cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.entry-card {
  background: rgba(22, 22, 22, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.25rem;
  transition: all 0.3s ease;
}

.entry-card:hover {
  border-color: rgba(57, 255, 106, 0.2);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.entry-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.entry-card-value {
  color: #d1d1d1;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.entry-card-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .search-box {
    max-width: 100%;
  }
}
</style>
