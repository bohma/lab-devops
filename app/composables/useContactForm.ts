import {
  CONTACT_FORM_FIELDS,
  createEmptyForm,
  type FormField,
} from '~/types/contact-form'
import { validateContactField } from '~/utils/validate-contact-form'

export function useContactForm() {
  const form = reactive(createEmptyForm())

  const errors = reactive<Record<FormField, string>>(
    Object.fromEntries(CONTACT_FORM_FIELDS.map(({ key }) => [key, ''])) as Record<FormField, string>,
  )

  const touched = reactive<Record<FormField, boolean>>(
    Object.fromEntries(CONTACT_FORM_FIELDS.map(({ key }) => [key, false])) as Record<FormField, boolean>,
  )

  function setFieldError(field: FormField) {
    errors[field] = validateContactField(field, form)
  }

  function touchField(field: FormField) {
    touched[field] = true
    setFieldError(field)
  }

  function onFieldInput(field: FormField) {
    if (touched[field]) setFieldError(field)
  }

  function validateAll(): boolean {
    let valid = true
    for (const { key } of CONTACT_FORM_FIELDS) {
      touched[key] = true
      setFieldError(key)
      if (errors[key]) valid = false
    }
    return valid
  }

  function submit() {
    if (!validateAll()) return
    console.log('Form submitted:', { ...form })
  }

  return {
    form,
    fields: CONTACT_FORM_FIELDS,
    errors,
    touched,
    touchField,
    onFieldInput,
    submit,
  }
}
