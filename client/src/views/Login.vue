<template>
  <div style="max-width: 520px; margin: 0 auto;">
    <h2 class="fw-bold mb-4">Login</h2>

    <div class="card border-0 shadow-sm p-4">
      <form @submit.prevent="submit" novalidate>
        <div class="mb-3">
          <label class="form-label" for="email">Email</label>
          <input
            id="email"
            v-model.trim="form.email"
            type="email"
            class="form-control"
            required
            autocomplete="email"
          />
        </div>

        <div class="mb-3">
          <label class="form-label" for="password">Password</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            class="form-control"
            required
            autocomplete="current-password"
          />
        </div>

        <div v-if="error" class="alert alert-danger py-2 mb-3">{{ error }}</div>

        <button type="submit" class="btn btn-warning fw-bold" :disabled="submitting">
          <span v-if="submitting" class="spinner-border spinner-border-sm me-2"></span>
          Sign In
        </button>

        <p class="mt-3 mb-0 text-muted">
          No account?
          <router-link to="/signup" class="text-decoration-none">Create one</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { setAuth } from '../services/auth';

export default {
  name: 'Login',
  data() {
    return {
      form: { email: '', password: '' },
      submitting: false,
      error: null,
    };
  },
  methods: {
    async submit() {
      if (!this.form.email || !this.form.password) {
        this.error = 'Email and password are required.';
        return;
      }
      this.error = null;
      this.submitting = true;
      try {
        const res = await axios.post('/api/auth/login', this.form);
        const { token, user } = res.data;
        setAuth(token, user);
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        window.dispatchEvent(new Event('auth-changed'));
        const redirect = this.$route.query.redirect || '/staff';
        this.$router.push(redirect);
      } catch (err) {
        this.error = err?.response?.data?.error || 'Login failed. Please try again.';
      } finally {
        this.submitting = false;
      }
    },
  },
};
</script>
