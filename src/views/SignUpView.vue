<!-- src/views/SignUpView.vue -->
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const error = ref('');

function handleSignUp() {
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match';
    return;
  }

  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const userExists = users.some((user: { username: string }) => user.username === username.value);

  if (userExists) {
    error.value = 'Username already exists';
    return;
  }

  users.push({ username: username.value, password: password.value });
  localStorage.setItem('users', JSON.stringify(users));
  router.push('/login');
}
</script>

<template>
  <div class="signup">
    <h1>Sign Up</h1>
    <form @submit.prevent="handleSignUp">
      <input type="text" v-model="username" placeholder="Username" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <input type="password" v-model="confirmPassword" placeholder="Confirm Password" required />
      <button type="submit">Sign Up</button>
      <p v-if="error" class="error-message">{{ error }}</p>
    </form>
    <p>Already have an account? <router-link to="/login">Log in</router-link></p>
  </div>
</template>

<style scoped>
.signup {
  max-width: 400px;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

input {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

button {
  margin-top: 20px;
  padding: 10px;
  background-color: #ff8c00;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #e67e00;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 10px;
}
</style>



