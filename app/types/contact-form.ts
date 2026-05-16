export type FormField = 'name' | 'email' | 'phone' | 'city' | 'message'

export type ContactFormData = Record<FormField, string>

export interface FormFieldConfig {
  key: FormField
  label: string
  type: 'text' | 'email' | 'tel'
  autocomplete?: string
  placeholder?: string
  multiline?: boolean
  rows?: number
}

export const CONTACT_FORM_FIELDS: FormFieldConfig[] = [
  { key: 'name', label: "Ім'я", type: 'text', autocomplete: 'name' },
  { key: 'email', label: 'Email', type: 'email', autocomplete: 'email' },
  { key: 'phone', label: 'Телефон', type: 'tel', autocomplete: 'tel', placeholder: '0XXXXXXXXX' },
  { key: 'city', label: 'Місто', type: 'text', autocomplete: 'address-level2' },
  { key: 'message', label: 'Повідомлення', type: 'text', multiline: true, rows: 4 },
]

export function createEmptyForm(): ContactFormData {
  return {
    name: '',
    email: '',
    phone: '',
    city: '',
    message: '',
  }
}
