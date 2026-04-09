<template>
  <div class="lookup-page">
    <section class="hero-modern mb-4">
      <div class="hero-badge">
        <span>Member Portal</span>
      </div>
      <h1 class="hero-title">
        <span class="title-line">TOJI<span class="hero-accent">LIFTS</span></span>
        <span class="title-sub">Helpdesk Portal</span>
      </h1>
      <p class="hero-description">
        Raise your issue quickly. Pick a known issue code when possible, then describe what happened and our helpdesk team will follow up.
      </p>
    </section>

    <div v-if="!isLoggedIn" class="card border-0 shadow-sm p-4">
      <h5 class="mb-2">Sign in to submit a complaint</h5>
      <p class="hint-text mb-3">Member accounts are required for complaint tracking.</p>
      <div class="d-flex gap-2">
        <router-link to="/login" class="btn btn-warning fw-bold">Login</router-link>
        <router-link to="/signup" class="btn btn-outline-secondary">Sign Up</router-link>
      </div>
    </div>

    <div v-else-if="isStaff" class="alert alert-info">
      You are logged in as staff. Use the staff dashboard for operations and triage.
    </div>

    <div v-else class="card border-0 shadow-sm p-4">
      <p class="signed-in-text mb-3">
        Signed in as <strong>{{ currentUser?.name }}</strong> ({{ currentUser?.email }})
      </p>
      <form @submit.prevent="submit">
        <div class="mb-3">
          <label class="form-label" for="issueCode">Issue Code (Optional)</label>
          <select id="issueCode" v-model="form.issueCode" class="form-select">
            <option value="">I do not know the code</option>
            <option v-for="opt in issueOptions" :key="opt.key" :value="opt.key">
              {{ opt.key }} - {{ opt.category }}
            </option>
          </select>
        </div>

        <div class="mb-3" v-if="!form.issueCode">
          <label class="form-label" for="category">Issue Category</label>
          <select id="category" v-model="form.category" class="form-select">
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>

        <div class="mb-3">
          <label class="form-label" for="complaintText">Complaint Details</label>
          <textarea
            id="complaintText"
            v-model.trim="form.complaintText"
            rows="4"
            class="form-control"
            placeholder="Describe what happened..."
            required
          ></textarea>
        </div>

        <button class="btn btn-warning fw-bold" type="submit" :disabled="loading">
          <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
          Submit Complaint
        </button>
      </form>
    </div>

    <div v-if="error" class="alert alert-danger mt-3 mb-0">{{ error }}</div>

    <div v-if="result" class="card border-0 shadow-sm p-4 mt-3">
      <h5 class="mb-2">Complaint submitted successfully</h5>
      <p class="mb-2">Reference ID: <code>{{ result.id }}</code></p>
      <p class="status-text mb-3">Status: {{ result.status }}</p>

      <div v-if="result.matchedResponse">
        <h6 class="mb-2">Suggested Standard Response</h6>
        <div class="d-flex align-items-center gap-2 mb-2">
          <code class="fw-bold">{{ result.matchedResponse.key }}</code>
          <span class="badge bg-info text-dark">{{ result.matchedResponse.category }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { getCurrentUser, isAuthenticated } from '../services/auth';

export default {
  name: 'PublicLookup',
  data() {
    return {
      form: {
        issueCode: '',
        category: 'General',
        complaintText: '',
      },
      categories: ['General', 'Membership', 'Billing', 'Bookings', 'Facilities', 'Health & Safety'],
      issueOptions: [],
      loading: false,
      error: null,
      result: null,
      currentUser: getCurrentUser(),
      isLoggedIn: isAuthenticated(),
    };
  },
  computed: {
    isStaff() {
      return this.currentUser?.role === 'staff';
    },
  },
  methods: {
    syncAuthState() {
      this.currentUser = getCurrentUser();
      this.isLoggedIn = isAuthenticated();
    },
    async loadIssueOptions() {
      if (!this.isLoggedIn) return;
      try {
        const res = await axios.get('/api/entries');
        const options = res.data
          .filter((e) => e.source !== 'member')
          .map((e) => ({ key: e.key, category: e.category }));
        const dedup = new Map(options.map((o) => [o.key, o]));
        this.issueOptions = Array.from(dedup.values());
      } catch (err) {
        this.issueOptions = [];
      }
    },
    async submit() {
      if (!this.form.complaintText) {
        this.error = 'Complaint details are required.';
        return;
      }
      this.loading = true;
      this.error = null;
      this.result = null;
      try {
        const payload = {
          issueCode: this.form.issueCode,
          category: this.form.issueCode ? undefined : this.form.category,
          complaintText: this.form.complaintText,
        };
        const res = await axios.post('/api/public/complaints', payload);
        this.result = res.data;
        this.form = {
          issueCode: '',
          category: 'General',
          complaintText: '',
        };
      } catch (err) {
        this.error = err?.response?.data?.error || 'Unable to submit complaint right now.';
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    window.addEventListener('storage', this.syncAuthState);
    window.addEventListener('auth-changed', this.syncAuthState);
    this.loadIssueOptions();
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.syncAuthState);
    window.removeEventListener('auth-changed', this.syncAuthState);
  },
};
</script>

<style scoped>
.lookup-page {
  max-width: 760px;
  margin: 0 auto;
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
  margin-bottom: 1rem;
}

.hero-title {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1rem;
}

.title-line {
  font-size: clamp(2.2rem, 7vw, 4rem);
  font-weight: 900;
  line-height: 1;
  color: #f0f0f0;
  font-family: 'Impact', 'Arial Black', sans-serif;
}

.title-sub {
  font-size: clamp(1.1rem, 4vw, 1.6rem);
  font-weight: 600;
  color: #b8b8b8;
}

.hero-accent {
  background: linear-gradient(135deg, #39ff6a 0%, #2de05c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 1rem;
  color: #9a9a9a;
  line-height: 1.7;
  max-width: 680px;
}

.hint-text {
  color: #d1d1d1;
}

.signed-in-text {
  color: #e1e1e1;
  font-size: 0.98rem;
}

.status-text {
  color: #d1d1d1;
}
</style>
