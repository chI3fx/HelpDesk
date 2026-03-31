<template>
  <form @submit.prevent="handleSubmit" novalidate>
    <!-- Key -->
    <div class="mb-3">
      <label class="form-label fw-semibold text-white" for="key">Response Key</label>
      <input
        id="key"
        v-model.trim="form.key"
        type="text"
        class="form-control font-monospace"
        placeholder="e.g. ACCESS_DENIED"
        required
      />
      <div class="form-text">Use UPPERCASE_SNAKE_CASE.</div>
    </div>

    <!-- Value -->
    <div class="mb-3">
      <label class="form-label fw-semibold text-white" for="value">Standard Response</label>
      <textarea
        id="value"
        v-model.trim="form.value"
        class="form-control"
        rows="4"
        placeholder="Enter the standard helpdesk response…"
        required
      ></textarea>
    </div>

    <!-- Category -->
    <div class="mb-4">
      <label class="form-label fw-semibold text-white" for="category">Category</label>
      <input
        id="category"
        v-model.trim="form.category"
        type="text"
        class="form-control"
        placeholder="e.g. Bookings, Billing, HR"
        required
      />
    </div>

    <!-- Error -->
    <div v-if="error" class="alert alert-danger py-2">{{ error }}</div>

    <button type="submit" class="btn btn-warning fw-bold px-4" :disabled="submitting">
      <span v-if="submitting" class="spinner-border spinner-border-sm me-2"></span>
      {{ submitLabel }}
    </button>
  </form>
</template>

<script>
export default {
  name: 'EntryForm',
  props: {
    initialData: {
      type: Object,
      default: () => ({ key: '', value: '', category: '' }),
    },
    submitLabel: {
      type: String,
      default: 'Save',
    },
  },
  emits: ['submit'],
  data() {
    return {
      form: { ...this.initialData },
      error: null,
      submitting: false,
    };
  },
  watch: {
    initialData(val) {
      this.form = { ...val };
    },
  },
  methods: {
    handleSubmit() {
      if (!this.form.key || !this.form.value || !this.form.category) {
        this.error = 'All fields are required.';
        return;
      }
      this.error = null;
      this.submitting = true;
      this.$emit('submit', { ...this.form });
    },
    resetSubmitting() {
      this.submitting = false;
    },
  },
};
</script>
