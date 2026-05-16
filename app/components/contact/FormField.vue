<script setup lang="ts">
const model = defineModel<string>({ required: true })

defineEmits<{
  blur: []
  input: []
}>()

defineProps<{
  label: string
  name: string
  type?: 'text' | 'email' | 'tel'
  autocomplete?: string
  placeholder?: string
  multiline?: boolean
  rows?: number
  error?: string
  touched?: boolean
}>()
</script>

<template>
  <label
    class="field"
    :class="{ 'field--invalid': touched && error }"
  >
    <span class="field__label">{{ label }}</span>

    <textarea
      v-if="multiline"
      v-model="model"
      class="field__control"
      :name="name"
      :rows="rows ?? 4"
      :aria-invalid="touched && !!error"
      @blur="$emit('blur')"
      @input="$emit('input')"
    />
    <input
      v-else
      v-model="model"
      class="field__control"
      :type="type ?? 'text'"
      :name="name"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      :aria-invalid="touched && !!error"
      @blur="$emit('blur')"
      @input="$emit('input')"
    />

    <span v-if="touched && error" class="field__error">{{ error }}</span>
  </label>
</template>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.875rem;
  color: #444;
}

.field__label {
  font-weight: 500;
}

.field__control {
  padding: 0.6rem 0.75rem;
  border: 1px solid #d0d5dd;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.15s;
}

.field__control:focus {
  outline: none;
  border-color: #00dc82;
}

.field--invalid .field__control {
  border-color: #e53935;
}

.field--invalid .field__control:focus {
  border-color: #e53935;
}

.field__error {
  font-size: 0.8rem;
  color: #e53935;
}
</style>
