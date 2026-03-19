<template>
  <div style="max-width:600px">
    <h2 class="fw-bold mb-4">Edit Entry</h2>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-warning"></div>
    </div>

    <div v-else class="card border-0 shadow-sm p-4">
      <EntryForm
        ref="form"
        :initial-data="entry"
        submit-label="Save Changes"
        @submit="update"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import EntryForm from '../components/EntryForm.vue';

export default {
  name: 'Edit',
  components: { EntryForm },
  data() {
    return { entry: null, loading: true };
  },
  methods: {
    async update(data) {
      try {
        await axios.put(`/api/entries/${this.$route.params.id}`, data);
        this.$router.push(`/entries/${this.$route.params.id}`);
      } catch (err) {
        console.error(err);
        this.$refs.form.resetSubmitting();
      }
    },
  },
  async created() {
    try {
      const res = await axios.get(`/api/entries/${this.$route.params.id}`);
      this.entry = res.data;
    } catch (err) {
      console.error(err);
    } finally {
      this.loading = false;
    }
  },
};
</script>
