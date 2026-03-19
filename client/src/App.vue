<template>
  <div id="app">
    <!-- ── Navbar ── -->
    <nav class="toji-nav">
      <div class="toji-nav__inner">
        <router-link class="toji-nav__brand" to="/">
          TOJI<span>LIFTS</span>
        </router-link>

        <div class="toji-nav__links">
          <router-link to="/" exact-active-class="toji-nav__link--active" class="toji-nav__link">Home</router-link>
          <router-link to="/entries" active-class="toji-nav__link--active" class="toji-nav__link">Entries</router-link>
          <router-link to="/entries/new" active-class="toji-nav__link--active" class="toji-nav__link">Add Entry</router-link>
          <router-link to="/test" active-class="toji-nav__link--active" class="toji-nav__link">Quiz</router-link>
          <router-link to="/about" active-class="toji-nav__link--active" class="toji-nav__link">About</router-link>
        </div>
      </div>
    </nav>

    <!-- ── Page content ── -->
    <main class="toji-main">
      <router-view />
    </main>

    <footer class="toji-footer">
      TojiLifts Helpdesk Portal &copy; {{ new Date().getFullYear() }}
    </footer>
  </div>
</template>

<script>
export default { name: 'App' };
</script>

<style>
/* ── Global reset for dark theme ── */
*, *::before, *::after { box-sizing: border-box; }

body {
  background: #0e0e0e;
  color: #e0e0e0;
  margin: 0;
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  min-height: 100vh;
}

/* ── Navbar ── */
.toji-nav {
  background: #111;
  border-bottom: 1px solid #1e1e1e;
  position: sticky;
  top: 0;
  z-index: 100;
}

.toji-nav__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.toji-nav__brand {
  font-family: 'Impact', 'Arial Black', sans-serif;
  font-size: 1.4rem;
  font-weight: 900;
  letter-spacing: 0.02em;
  color: #f0f0f0;
  text-decoration: none;
}

.toji-nav__brand span {
  color: #39ff6a;
}

.toji-nav__links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.toji-nav__link {
  padding: 0.4rem 0.9rem;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  color: #666;
  border-radius: 4px;
  transition: color 0.15s, background 0.15s;
}

.toji-nav__link:hover {
  color: #e0e0e0;
  background: #1a1a1a;
}

.toji-nav__link--active {
  color: #39ff6a !important;
  background: #0f1f0f !important;
}

/* ── Main ── */
.toji-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem;
  min-height: calc(100vh - 58px - 52px);
}

/* ── Footer ── */
.toji-footer {
  border-top: 1px solid #1a1a1a;
  text-align: center;
  padding: 1rem;
  font-size: 0.75rem;
  color: #333;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

/* ── Bootstrap overrides for dark theme ── */
.card {
  background: #161616 !important;
  border-color: #252525 !important;
  color: #e0e0e0 !important;
}

.table {
  color: #e0e0e0 !important;
  --bs-table-bg: transparent;
  --bs-table-hover-bg: #1a1a1a;
}

.table thead th {
  background: #111 !important;
  color: #555 !important;
  font-size: 0.68rem !important;
  letter-spacing: 0.15em !important;
  text-transform: uppercase !important;
  border-color: #252525 !important;
}

.table td, .table th {
  border-color: #1e1e1e !important;
}

.form-control, .form-select {
  background: #161616 !important;
  border-color: #2a2a2a !important;
  color: #e0e0e0 !important;
}

.form-control:focus, .form-select:focus {
  background: #1a1a1a !important;
  border-color: #39ff6a !important;
  box-shadow: 0 0 0 2px #39ff6a22 !important;
  color: #e0e0e0 !important;
}

.form-control::placeholder {
  color: #444 !important;
}

.form-text {
  color: #444 !important;
}

.form-label {
  color: #888 !important;
  font-size: 0.75rem !important;
  letter-spacing: 0.1em !important;
  text-transform: uppercase !important;
}

.btn-warning {
  background: #39ff6a !important;
  border-color: #39ff6a !important;
  color: #111 !important;
  font-weight: 700 !important;
}

.btn-warning:hover {
  background: #2de05c !important;
  border-color: #2de05c !important;
  color: #111 !important;
}

.btn-dark {
  background: #1e1e1e !important;
  border-color: #333 !important;
  color: #e0e0e0 !important;
}

.btn-outline-secondary {
  border-color: #333 !important;
  color: #888 !important;
}

.btn-outline-secondary:hover {
  background: #1e1e1e !important;
  color: #e0e0e0 !important;
}

.btn-outline-primary {
  border-color: #1e4a6a !important;
  color: #5bc8f5 !important;
}

.btn-outline-primary:hover {
  background: #1a2a3a !important;
  color: #5bc8f5 !important;
}

.btn-outline-danger {
  border-color: #5a1e1e !important;
  color: #ff6b6b !important;
}

.btn-outline-danger:hover {
  background: #2e1a1a !important;
  color: #ff6b6b !important;
}

.btn-primary {
  background: #1e4a6a !important;
  border-color: #1e4a6a !important;
  color: #5bc8f5 !important;
}

.alert-danger {
  background: #2e1a1a !important;
  border-color: #5a1e1e !important;
  color: #ff6b6b !important;
}

.alert-success {
  background: #0f1f0f !important;
  border-color: #1e4a1e !important;
  color: #39ff6a !important;
}

.alert-info {
  background: #1a1a2e !important;
  border-color: #1e1e4a !important;
  color: #5bc8f5 !important;
}

.text-muted {
  color: #555 !important;
}

h1, h2, h3, h4, h5, h6 {
  color: #f0f0f0;
}

.font-monospace {
  color: #39ff6a !important;
}
</style>