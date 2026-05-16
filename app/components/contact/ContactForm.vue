<script setup lang="ts">
const {
  form,
  fields,
  errors,
  touched,
  touchField,
  onFieldInput,
  submit,
} = useContactForm()
</script>

<template>
  <main class="contact-page">
    <form class="contact-form" novalidate @submit.prevent="submit">
      <h1 class="contact-form__title">Контактна форма</h1>

      <ContactFormField
        v-for="field in fields"
        :key="field.key"
        v-model="form[field.key]"
        :label="field.label"
        :name="field.key"
        :type="field.multiline ? undefined : field.type"
        :autocomplete="field.autocomplete"
        :placeholder="field.placeholder"
        :multiline="field.multiline"
        :rows="field.rows"
        :error="errors[field.key]"
        :touched="touched[field.key]"
        @blur="touchField(field.key)"
        @input="onFieldInput(field.key)"
      />

      <button type="submit" class="contact-form__submit">
        Надіслати
      </button>
    </form>
  </main>
</template>

<style scoped>
.contact-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: #f4f6f8;
}

.contact-form {
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

.contact-form__title {
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
}

.contact-form__submit {
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

.contact-form__submit:hover {
  background: #00b86b;
}
</style>
