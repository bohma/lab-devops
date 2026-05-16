import type { ContactFormData, FormField } from '~/types/contact-form'

const namePattern = /^[\p{L}\s'-]{2,50}$/u
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^(\+?38)?0\d{9}$/
const cityPattern = /^[\p{L}\s'-]{2,50}$/u

export function validateContactField(
  field: FormField,
  values: ContactFormData,
): string {
  const value = values[field].trim()

  switch (field) {
    case 'name':
      if (!value) return "Ім'я обов'язкове"
      if (!namePattern.test(value)) return "Ім'я: лише літери, від 2 до 50 символів"
      return ''
    case 'email':
      if (!value) return "Email обов'язковий"
      if (!emailPattern.test(value)) return 'Некоректний email'
      return ''
    case 'phone': {
      if (!value) return "Телефон обов'язковий"
      const digits = value.replace(/\D/g, '')
      if (!phonePattern.test(digits)) return 'Формат: 0XXXXXXXXX або +380XXXXXXXXX'
      return ''
    }
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
