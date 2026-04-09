<template>
  <div style="max-width: 720px; margin: 0 auto;">
    <div class="mb-4">
      <h1 class="fw-bold mb-2">Public Helpdesk Lookup</h1>
      <p class="text-muted mb-0">Enter your issue code to get the standard response.</p>
    </div>

    <div class="card border-0 shadow-sm p-4">
      <form @submit.prevent="submit">
        <label class="form-label" for="lookup-code">Issue Code</label>
        <div class="d-flex gap-2 flex-wrap">
          <input
            id="lookup-code"
            v-model.trim="code"
            type="text"
            class="form-control"
            placeholder="e.g. ACCESS_DENIED"
            required
            style="min-width: 260px;"
          />
          <button class="btn btn-warning fw-bold" type="submit" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
            Find Response
          </button>
        </div>
      </form>
    </div>

    <div v-if="error" class="alert alert-danger mt-3 mb-0">{{ error }}</div>

    <div v-if="result" class="card border-0 shadow-sm p-4 mt-3">
      <div class="d-flex align-items-center gap-2 mb-2">
        <code class="fw-bold">{{ result.key }}</code>
        <span class="badge bg-info text-dark">{{ result.category }}</span>
      </div>
      <p class="mb-0 fs-5">{{ result.value }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PublicLookup',
  data() {
    return {
      code: '',
      loading: false,
      error: null,
      result: null,
    };
  },
  methods: {
    async submit() {
      if (!this.code) {
        this.error = 'Please enter an issue code.';
        return;
      }
      this.loading = true;
      this.error = null;
      this.result = null;
      try {
        const res = await axios.post('/api/public/lookup', { key: this.code });
        this.result = res.data;
      } catch (err) {
        this.error = err?.response?.data?.error || 'Unable to find a response right now.';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
