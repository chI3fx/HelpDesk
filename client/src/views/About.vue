<template>
  <div class="about-wrap">

    <div class="about-hero">
      <div class="about-eyebrow">About</div>
      <h2 class="about-title">TOJI<span>LIFTS</span> Portal</h2>
      <p class="about-desc">
        Your go-to resource for handling any member query with confidence.
        From billing disputes to locker faults — TojiLifts staff stay consistent,
        professional, and prepared.
      </p>
    </div>

    <div class="about-grid">
      <div class="about-card">
        <div class="about-card__icon">⚡</div>
        <h6 class="about-card__title">Features</h6>
        <ul class="about-list">
          <li>Browse and search all standard response entries</li>
          <li>Create, edit, and delete entries at any time</li>
          <li>Dashboard with live category statistics</li>
          <li>Interactive knowledge quiz for staff training</li>
        </ul>
      </div>

      <div class="about-card">
        <div class="about-card__icon">🛠</div>
        <h6 class="about-card__title">Tech Stack</h6>
        <ul class="about-list">
          <li><span class="about-tag">Frontend</span> Vue 3, Vue Router, Axios, Bootstrap 5</li>
          <li><span class="about-tag">Backend</span> Node.js, Express, MongoDB, Mongoose</li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
export default { name: 'About' };
</script>

<style scoped>
.about-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 1rem;
}

.about-hero {
  max-width: 600px;
  margin-bottom: 3rem;
}

.about-eyebrow {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #39ff6a;
  margin-bottom: 0.5rem;
}

.about-title {
  font-family: 'Impact', 'Arial Black', sans-serif;
  font-size: clamp(2rem, 6vw, 3.5rem);
  font-weight: 900;
  color: #f0f0f0;
  margin-bottom: 1rem;
  line-height: 1;
}

.about-title span {
  color: #39ff6a;
}

.about-desc {
  font-size: 1rem;
  color: #777;
  line-height: 1.7;
  margin: 0;
}

.about-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
  width: 100%;
  max-width: 700px;
}

.about-card {
  background: #161616;
  border: 1px solid #252525;
  border-radius: 8px;
  padding: 1.8rem 1.5rem;
  text-align: left;
}

.about-card__icon {
  font-size: 1.4rem;
  margin-bottom: 0.75rem;
}

.about-card__title {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #555;
  margin-bottom: 1rem;
}

.about-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.about-list li {
  font-size: 0.875rem;
  color: #888;
  padding: 0.4rem 0;
  border-bottom: 1px solid #1e1e1e;
  line-height: 1.5;
}

.about-list li:last-child {
  border-bottom: none;
}

.about-tag {
  display: inline-block;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #39ff6a;
  background: #0f1f0f;
  border: 1px solid #1e4a1e;
  border-radius: 3px;
  padding: 0.15rem 0.5rem;
  margin-right: 0.4rem;
}
</style>