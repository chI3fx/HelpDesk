<template>
  <div style="max-width: 520px; margin: 0 auto;">
    <h2 class="fw-bold mb-4">Sign Up</h2>

    <div class="card border-0 shadow-sm p-4">
      <form @submit.prevent="submit" novalidate>
        <div class="mb-3">
          <label class="form-label" for="name">Full Name</label>
          <input
            id="name"
            v-model.trim="form.name"
            type="text"
            class="form-control"
            required
            autocomplete="name"
          />
        </div>

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
            autocomplete="new-password"
          />
          <div class="form-text">Use at least 8 characters.</div>
        </div>

        <div class="mb-3">
          <label class="form-label" for="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            v-model="form.confirmPassword"
            type="password"
            class="form-control"
            required
            autocomplete="new-password"
          />
        </div>

        <div v-if="error" class="alert alert-danger py-2 mb-3">{{ error }}</div>

        <button type="submit" class="btn btn-warning fw-bold" :disabled="submitting">
          <span v-if="submitting" class="spinner-border spinner-border-sm me-2"></span>
          Create Account
        </button>

        <p class="mt-3 mb-0 text-muted">
          Already registered?
          <router-link to="/login" class="text-decoration-none">Sign in</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { setAuth } from '../services/auth';

export default {
  name: 'Signup',
  data() {
    return {
      form: { name: '', email: '', password: '', confirmPassword: '' },
      submitting: false,
      error: null,
    };
  },
  methods: {
    async submit() {
      if (!this.form.name || !this.form.email || !this.form.password) {
        this.error = 'Name, email, and password are required.';
        return;
      }
      if (this.form.password.length < 8) {
        this.error = 'Password must be at least 8 characters.';
        return;
      }
      if (this.form.password !== this.form.confirmPassword) {
        this.error = 'Passwords do not match.';
        return;
      }

      this.error = null;
      this.submitting = true;
      try {
        const res = await axios.post('/api/auth/signup', {
          name: this.form.name,
          email: this.form.email,
          password: this.form.password,
        });
        const { token, user } = res.data;
        setAuth(token, user);
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        window.dispatchEvent(new Event('auth-changed'));
        this.$router.push('/');
      } catch (err) {
        this.error = err?.response?.data?.error || 'Signup failed. Please try again.';
      } finally {
        this.submitting = false;
      }
    },
  },
};
</script>
