<script setup lang="ts">
const form = reactive({
  name: '',
  email: '',
  phone: '',
  city: '',
  message: '',
})

function onSubmit() {
  console.log('Form submitted:', { ...form })
}
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <main class="page">
      <form class="form" @submit.prevent="onSubmit">
        <h1 class="form__title">Контактна форма</h1>

        <label class="form__field">
          <span>Ім'я</span>
          <input v-model="form.name" type="text" name="name" required />
        </label>

        <label class="form__field">
          <span>Email</span>
          <input v-model="form.email" type="email" name="email" required />
        </label>

        <label class="form__field">
          <span>Телефон</span>
          <input v-model="form.phone" type="tel" name="phone" required />
        </label>

        <label class="form__field">
          <span>Місто</span>
          <input v-model="form.city" type="text" name="city" required />
        </label>

        <label class="form__field">
          <span>Повідомлення</span>
          <textarea v-model="form.message" name="message" rows="4" required />
        </label>

        <button type="submit" class="form__submit">Надіслати</button>
      </form>
    </main>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: #f4f6f8;
}

.form {
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.form__title {
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
}

.form__field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.875rem;
  color: #444;
}

.form__field input,
.form__field textarea {
  padding: 0.6rem 0.75rem;
  border: 1px solid #d0d5dd;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.15s;
}

.form__field input:focus,
.form__field textarea:focus {
  outline: none;
  border-color: #00dc82;
}

.form__submit {
  margin-top: 0.5rem;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  background: #00dc82;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}

.form__submit:hover {
  background: #00b86b;
}
</style>
