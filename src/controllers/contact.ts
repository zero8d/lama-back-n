import { Contact } from '../models/Contact'

// create crud controllers for Contact model
export const getContacts = async () => {
  try {
    const contacts = await Contact.findAll()
    return contacts
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getContactById = async (id: number) => {
  try {
    const contact = await Contact.findOne({ where: { id } })
    return contact
  } catch (error) {
    console.log(error)
    return null
  }
}

export const createContact = async (
  type: string,
  value: string,
  is_active: boolean
) => {
  try {
    const contact = await Contact.create({
      type,
      value,
      is_active,
    })
    return contact
  } catch (error) {
    console.log(error)
    return null
  }
}

export const updateContact = async (
  id: number,
  type?: string,
  value?: string,
  is_active?: boolean
) => {
  try {
    const update: { type?: string; value?: string; is_active?: boolean } = {}
    typeof type === 'string' ? (update['type'] = type) : ''
    typeof value === 'string' ? (update['value'] = value) : ''
    typeof is_active === 'boolean' ? (update['is_active'] = is_active) : ''
    const contact = await Contact.update(update, { where: { id } })
    return contact
  } catch (error) {
    console.log(error)
    return null
  }
}

export const deleteContact = async (id: number) => {
  try {
    const contact = await Contact.destroy({ where: { id } })
    return contact
  } catch (error) {
    console.log(error)
    return null
  }
}
