<template>
  <div id="app">
    <!-- ── Navbar ── -->
    <nav class="toji-nav">
      <div class="toji-nav__inner">
        <router-link class="toji-nav__brand" :to="brandTo">
          <div class="brand-icon">
            <span>TL</span>
          </div>
          <div class="brand-text">
            <div class="brand-name">TOJI<span>LIFTS</span></div>
            <div class="brand-sub">HELPDESK</div>
          </div>
        </router-link>

        <div class="toji-nav__links" v-if="isAuthed">
          <router-link to="/staff" exact-active-class="toji-nav__link--active" class="toji-nav__link">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <span class="link-text">Home</span>
          </router-link>
          <router-link to="/staff/entries" active-class="toji-nav__link--active" class="toji-nav__link">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 6h3a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>
            <span class="link-text">Entries</span>
          </router-link>
          <router-link to="/staff/entries/new" active-class="toji-nav__link--active" class="toji-nav__link">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            <span class="link-text">New</span>
          </router-link>
          <router-link to="/staff/quiz" active-class="toji-nav__link--active" class="toji-nav__link">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>
            <span class="link-text">Quiz</span>
          </router-link>
          <router-link to="/staff/about" active-class="toji-nav__link--active" class="toji-nav__link">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            <span class="link-text">About</span>
          </router-link>
          <button class="toji-nav__link toji-nav__button" @click="logout">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            <span class="link-text">Logout</span>
          </button>
        </div>

        <div class="toji-nav__links" v-else>
          <router-link to="/" exact-active-class="toji-nav__link--active" class="toji-nav__link">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 6h3a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>
            <span class="link-text">Lookup</span>
          </router-link>
          <router-link to="/login" active-class="toji-nav__link--active" class="toji-nav__link">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m10 17 5-5-5-5"/><path d="M15 12H3"/><path d="M21 19V5a2 2 0 0 0-2-2h-6"/></svg>
            <span class="link-text">Login</span>
          </router-link>
          <router-link to="/signup" active-class="toji-nav__link--active" class="toji-nav__link">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            <span class="link-text">Sign Up</span>
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Animated background -->
    <div class="bg-orbs">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
    </div>

    <!-- ── Page content ── -->
    <main class="toji-main">
      <router-view />
    </main>

    <footer class="toji-footer">
      TojiLifts Helpdesk Portal by Keith Karung'o 001511425 &copy; {{ new Date().getFullYear() }}
    </footer>
  </div>
</template>

<script>
import axios from 'axios';
import { clearAuth, isAuthenticated } from './services/auth';

export default {
  name: 'App',
  data() {
    return {
      isAuthed: isAuthenticated(),
    };
  },
  methods: {
    syncAuthState() {
      this.isAuthed = isAuthenticated();
    },
    logout() {
      clearAuth();
      delete axios.defaults.headers.common.Authorization;
      this.syncAuthState();
      this.$router.push('/');
      window.dispatchEvent(new Event('auth-changed'));
    },
  },
  computed: {
    brandTo() {
      return this.isAuthed ? '/staff' : '/';
    },
  },
  mounted() {
    window.addEventListener('storage', this.syncAuthState);
    window.addEventListener('auth-changed', this.syncAuthState);
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.syncAuthState);
    window.removeEventListener('auth-changed', this.syncAuthState);
  },
};
</script>

<style>
/* ── Global reset for modern dark theme ── */
*, *::before, *::after { 
  box-sizing: border-box; 
  margin: 0;
  padding: 0;
}

body {
  background: linear-gradient(135deg, #0a0a0f 0%, #0f0f1a 50%, #0a0a0f 100%);
  color: #e0e0e0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

#app {
  position: relative;
  z-index: 1;
}

/* ── Animated Background Orbs ── */
.bg-orbs {
  position: fixed;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
}

.orb-1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #39ff6a 0%, transparent 70%);
  top: -200px;
  right: -200px;
  animation: float1 20s ease-in-out infinite;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #5bc8f5 0%, transparent 70%);
  bottom: -150px;
  left: -150px;
  animation: float2 25s ease-in-out infinite;
}

@keyframes float1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-100px, 50px) scale(1.1); }
}

@keyframes float2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(100px, -50px) scale(1.2); }
}

/* ── Navbar ── */
.toji-nav {
  background: rgba(17, 17, 17, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
}

.toji-nav__inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.toji-nav__brand {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  transition: transform 0.2s ease;
}

.toji-nav__brand:hover {
  transform: translateY(-2px);
}

.brand-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, #39ff6a 0%, #5bc8f5 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(57, 255, 106, 0.2);
}

.brand-icon span {
  color: #0a0a0f;
  font-weight: 900;
  font-size: 18px;
}

.brand-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.brand-name {
  font-family: 'Impact', 'Arial Black', sans-serif;
  font-size: 20px;
  font-weight: 900;
  letter-spacing: 0.5px;
  color: #f0f0f0;
}

.brand-name span {
  color: #39ff6a;
}

.brand-sub {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #666;
}

.toji-nav__links {
  display: flex;
  align-items: center;
  gap: 4px;
}

.toji-nav__link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  color: #666;
  border-radius: 8px;
  transition: all 0.2s ease;
  position: relative;
}

.toji-nav__link svg {
  width: 16px;
  height: 16px;
}

.link-text {
  display: none;
}

@media (min-width: 640px) {
  .link-text {
    display: inline;
  }
}

.toji-nav__link:hover {
  color: #e0e0e0;
  background: rgba(255, 255, 255, 0.05);
}

.toji-nav__link--active {
  color: #39ff6a !important;
  background: rgba(57, 255, 106, 0.1) !important;
  box-shadow: 0 0 0 1px rgba(57, 255, 106, 0.2);
}

.toji-nav__button {
  border: none;
  background: transparent;
  cursor: pointer;
}

/* ── Main ── */
.toji-main {
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 2rem;
  min-height: calc(100vh - 64px - 60px);
  position: relative;
  z-index: 1;
}

/* ── Footer ── */
.toji-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  text-align: center;
  padding: 20px;
  font-size: 12px;
  color: #444;
  letter-spacing: 1px;
  text-transform: uppercase;
  background: rgba(10, 10, 15, 0.8);
  backdrop-filter: blur(20px);
  position: relative;
  z-index: 1;
}

/* ── Modern Card Styles ── */
.card {
  background: rgba(22, 22, 22, 0.6) !important;
  backdrop-filter: blur(20px) !important;
  -webkit-backdrop-filter: blur(20px) !important;
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
  border-radius: 16px !important;
  color: #e0e0e0 !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3) !important;
  transition: all 0.3s ease !important;
}

.card:hover {
  border-color: rgba(57, 255, 106, 0.2) !important;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(57, 255, 106, 0.1) !important;
}

/* ── Table Styles ── */
.table {
  color: #e0e0e0 !important;
  --bs-table-bg: transparent;
  --bs-table-hover-bg: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  overflow: hidden;
}

.table thead th {
  background: rgba(17, 17, 17, 0.8) !important;
  color: #666 !important;
  font-size: 11px !important;
  letter-spacing: 2px !important;
  text-transform: uppercase !important;
  border-color: rgba(255, 255, 255, 0.05) !important;
  font-weight: 700;
  padding: 16px !important;
}

.table td, .table th {
  border-color: rgba(255, 255, 255, 0.05) !important;
  padding: 16px !important;
  vertical-align: middle;
}

.table tbody tr {
  transition: all 0.2s ease;
}

.table tbody tr:hover {
  background: rgba(57, 255, 106, 0.05) !important;
}

.table-responsive {
  border-radius: 16px;
  background: rgba(22, 22, 22, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  overflow: hidden;
}

/* ── Form Styles ── */
.form-control, .form-select {
  background: rgba(22, 22, 22, 0.6) !important;
  backdrop-filter: blur(10px) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  color: #e0e0e0 !important;
  border-radius: 10px !important;
  padding: 12px 16px !important;
  transition: all 0.2s ease !important;
}

.form-control:focus, .form-select:focus {
  background: rgba(22, 22, 22, 0.8) !important;
  border-color: #39ff6a !important;
  box-shadow: 0 0 0 3px rgba(57, 255, 106, 0.1) !important;
  color: #e0e0e0 !important;
  outline: none;
}

.form-control::placeholder {
  color: #555 !important;
}

.form-text {
  color: #666 !important;
  font-size: 12px !important;
  margin-top: 6px;
}

.form-label {
  color: #999 !important;
  font-size: 13px !important;
  letter-spacing: 0.5px !important;
  font-weight: 600 !important;
  margin-bottom: 8px !important;
}

/* ── Button Styles ── */
.btn {
  border-radius: 10px !important;
  font-weight: 600 !important;
  padding: 10px 20px !important;
  transition: all 0.2s ease !important;
  border-width: 1px !important;
}

.btn-warning {
  background: linear-gradient(135deg, #39ff6a 0%, #2de05c 100%) !important;
  border: none !important;
  color: #0a0a0f !important;
  font-weight: 700 !important;
  box-shadow: 0 4px 12px rgba(57, 255, 106, 0.3) !important;
}

.btn-warning:hover {
  background: linear-gradient(135deg, #2de05c 0%, #20c04c 100%) !important;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(57, 255, 106, 0.4) !important;
}

.btn-dark {
  background: rgba(30, 30, 30, 0.8) !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
  color: #e0e0e0 !important;
  backdrop-filter: blur(10px) !important;
}

.btn-dark:hover {
  background: rgba(40, 40, 40, 0.9) !important;
  border-color: rgba(57, 255, 106, 0.3) !important;
}

.btn-outline-secondary {
  border-color: rgba(255, 255, 255, 0.1) !important;
  color: #999 !important;
  background: transparent !important;
}

.btn-outline-secondary:hover {
  background: rgba(255, 255, 255, 0.05) !important;
  color: #e0e0e0 !important;
  border-color: rgba(255, 255, 255, 0.2) !important;
}

.btn-outline-primary {
  border-color: rgba(91, 200, 245, 0.3) !important;
  color: #5bc8f5 !important;
  background: transparent !important;
}

.btn-outline-primary:hover {
  background: rgba(91, 200, 245, 0.1) !important;
  border-color: rgba(91, 200, 245, 0.5) !important;
}

.btn-outline-danger {
  border-color: rgba(255, 107, 107, 0.3) !important;
  color: #ff6b6b !important;
  background: transparent !important;
}

.btn-outline-danger:hover {
  background: rgba(255, 107, 107, 0.1) !important;
  border-color: rgba(255, 107, 107, 0.5) !important;
}

.btn-primary {
  background: rgba(30, 74, 106, 0.8) !important;
  border-color: rgba(91, 200, 245, 0.3) !important;
  color: #5bc8f5 !important;
}

.btn-success {
  background: rgba(57, 255, 106, 0.2) !important;
  border-color: rgba(57, 255, 106, 0.4) !important;
  color: #39ff6a !important;
}

/* ── Badges ── */
.badge {
  font-size: 11px !important;
  font-weight: 700 !important;
  letter-spacing: 0.5px !important;
  padding: 6px 12px !important;
  border-radius: 6px !important;
  border: 1px solid !important;
}

.bg-primary {
  background: rgba(91, 200, 245, 0.15) !important;
  color: #5bc8f5 !important;
  border-color: rgba(91, 200, 245, 0.3) !important;
}

.bg-success {
  background: rgba(57, 255, 106, 0.15) !important;
  color: #39ff6a !important;
  border-color: rgba(57, 255, 106, 0.3) !important;
}

.bg-info {
  background: rgba(179, 125, 255, 0.15) !important;
  color: #b47dff !important;
  border-color: rgba(179, 125, 255, 0.3) !important;
}

.bg-warning {
  background: rgba(245, 197, 66, 0.15) !important;
  color: #f5c542 !important;
  border-color: rgba(245, 197, 66, 0.3) !important;
}

.bg-danger {
  background: rgba(255, 107, 107, 0.15) !important;
  color: #ff6b6b !important;
  border-color: rgba(255, 107, 107, 0.3) !important;
}

.bg-secondary {
  background: rgba(255, 255, 255, 0.05) !important;
  color: #999 !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
}

.bg-dark {
  background: rgba(17, 17, 17, 0.8) !important;
  color: #e0e0e0 !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
}

/* ── Alerts ── */
.alert {
  border-radius: 12px !important;
  border-width: 1px !important;
  backdrop-filter: blur(10px) !important;
}

.alert-danger {
  background: rgba(255, 107, 107, 0.1) !important;
  border-color: rgba(255, 107, 107, 0.3) !important;
  color: #ff6b6b !important;
}

.alert-success {
  background: rgba(57, 255, 106, 0.1) !important;
  border-color: rgba(57, 255, 106, 0.3) !important;
  color: #39ff6a !important;
}

.alert-info {
  background: rgba(91, 200, 245, 0.1) !important;
  border-color: rgba(91, 200, 245, 0.3) !important;
  color: #5bc8f5 !important;
}

.alert-warning {
  background: rgba(245, 197, 66, 0.1) !important;
  border-color: rgba(245, 197, 66, 0.3) !important;
  color: #f5c542 !important;
}

/* ── Progress ── */
.progress {
  background: rgba(255, 255, 255, 0.05) !important;
  border-radius: 8px !important;
  overflow: hidden;
}

.progress-bar {
  background: linear-gradient(90deg, #39ff6a 0%, #2de05c 100%) !important;
  transition: width 0.3s ease !important;
}

/* ── Spinner ── */
.spinner-border {
  border-color: rgba(57, 255, 106, 0.2) !important;
  border-right-color: #39ff6a !important;
}

/* ── Text Colors ── */
.text-muted {
  color: #666 !important;
}

h1, h2, h3, h4, h5, h6 {
  color: #f0f0f0;
  font-weight: 700;
}

.font-monospace {
  color: #39ff6a !important;
  font-family: 'SF Mono', 'Monaco', 'Consolas', monospace !important;
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .toji-nav__inner {
    padding: 0 1rem;
  }
  
  .toji-main {
    padding: 2rem 1rem;
  }
}
</style>
