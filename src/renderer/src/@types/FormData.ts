export interface IFormData {
  elementId: string
  label: string
  name: string
  placeholder: string
  required: boolean
  type: string
  min?: number
  max?: number
  minLength?: number
  maxLength?: number
  options?: {
    value: string
    text: string
  }[]
}
