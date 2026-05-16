import { describe, it, expect } from 'vitest'
import { validateContactField } from './validate-contact-form'
import { createEmptyForm } from '~/types/contact-form'

describe('validateContactField', () => {
  it('validates correct name', () => {
    const form = createEmptyForm()
    form.name = 'Богдан'
    expect(validateContactField('name', form)).toBe('')
  })

  it('rejects empty email', () => {
    const form = createEmptyForm()
    expect(validateContactField('email', form)).toBe("Email обов'язковий")
  })

  it('validates ukrainian phone', () => {
    const form = createEmptyForm()
    form.phone = '0501234567'
    expect(validateContactField('phone', form)).toBe('')
  })

  it('rejects short message', () => {
    const form = createEmptyForm()
    form.message = 'коротко'
    expect(validateContactField('message', form)).toContain('10')
  })
})
