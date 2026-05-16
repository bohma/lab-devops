<script setup lang="ts">
type FormField = 'name' | 'email' | 'phone' | 'city' | 'message'

const form = reactive({
  name: '',
  email: '',
  phone: '',
  city: '',
  message: '',
})

const errors = reactive<Record<FormField, string>>({
  name: '',
  email: '',
  phone: '',
  city: '',
  message: '',
})

const touched = reactive<Record<FormField, boolean>>({
  name: false,
  email: false,
  phone: false,
  city: false,
  message: false,
})

const namePattern = /^[\p{L}\s'-]{2,50}$/u
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^(\+?38)?0\d{9}$/
const cityPattern = /^[\p{L}\s'-]{2,50}$/u

function validateField(field: FormField): string {
  const value = form[field].trim()

  switch (field) {
    case 'name':
      if (!value) return "Ім'я обов'язкове"
      if (!namePattern.test(value)) return "Ім'я: лише літери, від 2 до 50 символів"
      return ''
    case 'email':
      if (!value) return "Email обов'язковий"
      if (!emailPattern.test(value)) return 'Некоректний email'
      return ''
    case 'phone':
      if (!value) return "Телефон обов'язковий"
      const digits = value.replace(/\D/g, '')
      if (!phonePattern.test(digits)) return 'Формат: 0XXXXXXXXX або +380XXXXXXXXX'
      return ''
    case 'city':
      if (!value) return "Місто обов'язкове"
      if (!cityPattern.test(value)) return 'Місто: лише літери, від 2 до 50 символів'
      return ''
    case 'message':
      if (!value) return "Повідомлення обов'язкове"
      if (value.length < 10) return 'Мінімум 10 символів'
      if (value.length > 500) return 'Максимум 500 символів'
      return ''
  }
}

function validateForm(): boolean {
  let valid = true
  for (const field of Object.keys(form) as FormField[]) {
    errors[field] = validateField(field)
    touched[field] = true
    if (errors[field]) valid = false
  }
  return valid
}

function onBlur(field: FormField) {
  touched[field] = true
  errors[field] = validateField(field)
}

function onInput(field: FormField) {
  if (touched[field]) {
    errors[field] = validateField(field)
  }
}

function onSubmit() {
  if (!validateForm()) return
  console.log('Form submitted:', { ...form })
}
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <main class="page">
      <form class="form" novalidate @submit.prevent="onSubmit">
        <h1 class="form__title">Контактна форма</h1>

        <label class="form__field" :class="{ 'form__field--invalid': touched.name && errors.name }">
          <span>Ім'я</span>
          <input
            v-model="form.name"
            type="text"
            name="name"
            autocomplete="name"
            :aria-invalid="touched.name && !!errors.name"
            @blur="onBlur('name')"
            @input="onInput('name')"
          />
          <span v-if="touched.name && errors.name" class="form__error">{{ errors.name }}</span>
        </label>

        <label class="form__field" :class="{ 'form__field--invalid': touched.email && errors.email }">
          <span>Email</span>
          <input
            v-model="form.email"
            type="email"
            name="email"
            autocomplete="email"
            :aria-invalid="touched.email && !!errors.email"
            @blur="onBlur('email')"
            @input="onInput('email')"
          />
          <span v-if="touched.email && errors.email" class="form__error">{{ errors.email }}</span>
        </label>

        <label class="form__field" :class="{ 'form__field--invalid': touched.phone && errors.phone }">
          <span>Телефон</span>
          <input
            v-model="form.phone"
            type="tel"
            name="phone"
            autocomplete="tel"
            placeholder="0XXXXXXXXX"
            :aria-invalid="touched.phone && !!errors.phone"
            @blur="onBlur('phone')"
            @input="onInput('phone')"
          />
          <span v-if="touched.phone && errors.phone" class="form__error">{{ errors.phone }}</span>
        </label>

        <label class="form__field" :class="{ 'form__field--invalid': touched.city && errors.city }">
          <span>Місто</span>
          <input
            v-model="form.city"
            type="text"
            name="city"
            autocomplete="address-level2"
            :aria-invalid="touched.city && !!errors.city"
            @blur="onBlur('city')"
            @input="onInput('city')"
          />
          <span v-if="touched.city && errors.city" class="form__error">{{ errors.city }}</span>
        </label>

        <label class="form__field" :class="{ 'form__field--invalid': touched.message && errors.message }">
          <span>Повідомлення</span>
          <textarea
            v-model="form.message"
            name="message"
            rows="4"
            :aria-invalid="touched.message && !!errors.message"
            @blur="onBlur('message')"
            @input="onInput('message')"
          />
          <span v-if="touched.message && errors.message" class="form__error">{{ errors.message }}</span>
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

.form__field--invalid input,
.form__field--invalid textarea {
  border-color: #e53935;
}

.form__field--invalid input:focus,
.form__field--invalid textarea:focus {
  border-color: #e53935;
}

.form__error {
  font-size: 0.8rem;
  color: #e53935;
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
