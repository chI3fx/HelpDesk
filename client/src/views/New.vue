<template>
  <div style="max-width:600px" class="text-white">
    <h2 class="fw-bold mb-4 text-white">Add New Entry</h2>
    <div class="card border-0 shadow-sm p-4 bg-dark text-white">
      <EntryForm
        ref="form"
        submit-label="Create Entry"
        @submit="create"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import EntryForm from '../components/EntryForm.vue';

export default {
  name: 'New',
  components: { EntryForm },
  methods: {
    async create(data) {
      try {
        const res = await axios.post('/api/entries', data);
        this.$router.push(`/entries/${res.data._id}`);
      } catch (err) {
        console.error(err);
        this.$refs.form.resetSubmitting();
      }
    },
  },
};
</script>
