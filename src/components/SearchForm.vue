
<!-- src/components/SearchForm.vue -->

<script setup lang='ts'>
import {ref, watch} from 'vue'

const props = defineProps<{
  loading: boolean
}>()

const emit = defineEmits<{
  (event: 'search', query: string): void
}>()

const query = ref('')
const error = ref('')
function  handleSubmit() {
  if (query.value.trim().length < 2) {
    error.value = 'Search query must be at least 2 characters long.'
    return
  }
  error.value = ''
  emit('search', query.value.trim())


}
watch(() => props.loading, (newValue) => {
  if (!newValue) {
    query.value = ''
  }
})
</script>

<template>
  <form @submit.prevent="handleSubmit" class="search-form">
    <input
      v-model="query"
      type="text"
      placeholder="Search for recipes..."
      :class="{ 'is-invalid': !!error }"
    />
    <button type="submit" :disabled="loading" class="button">Search</button>
    <p v-if="error" class="error-message">{{ error }}</p>
  </form>

</template>

<style scoped>
.search-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

input {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
}

input.is-invalid {
  border-color: #f44336;
}

button {
  padding: 10px 15px;
  background-color: transparent;
  color: #ff8c00;
  border: solid 0.5px black;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button:hover:not(:disabled) {
  background-color: rgba(0, 0, 0, 0, .1);
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error-message {
  color: #f44336;
  font-size: 0.9rem;
  margin-top: 5px;
}
</style>



