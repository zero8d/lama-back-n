import { Feedback } from '../models/Feedback'

// create crud controllers for Feedback model
export const getFeedbacks = async (is_active?: boolean) => {
  try {
    const where: { is_active?: boolean } = {}
    typeof is_active === 'boolean' ? (where['is_active'] = is_active) : ''
    console.log(where)
    const feedbacks = await Feedback.findAll({
      where,
    })
    return feedbacks
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getFeedbackById = async (id: number) => {
  try {
    const feedback = await Feedback.findOne({ where: { id } })
    return feedback
  } catch (error) {
    console.log(error)
    return null
  }
}

export const createFeedback = async (
  name: string,
  rate: number,
  text: string,
  date: Date,
  source: string,
  image: number,
  contact: string,
  is_active: boolean
) => {
  try {
    const feedback = await Feedback.create({
      name,
      rate,
      text,
      date: new Date(date),
      source,
      image,
      contact,
      is_active,
    })
    return feedback
  } catch (error) {
    console.log(error)
    return null
  }
}

export const updateFeedback = async (
  id: number,
  name: string,
  rate: number,
  text: string,
  date: Date,
  source: string,
  image: number,
  contact: string,
  is_active: boolean
) => {
  try {
    const update: {
      name?: string
      rate?: number
      text?: string
      date?: Date
      source?: string
      image?: number
      contact?: string
      is_active?: boolean
    } = {}

    typeof name === 'string' ? (update['name'] = name) : ''
    typeof rate === 'string' ? (update['rate'] = rate) : ''
    typeof text === 'string' ? (update['text'] = text) : ''
    typeof date === 'string' ? (update['date'] = date) : ''
    typeof source === 'string' ? (update['source'] = source) : ''
    image ? (update['image'] = image) : ''
    typeof contact === 'string' ? (update['contact'] = contact) : ''
    is_active ? (update['is_active'] = is_active) : ''
    const feedback = await Feedback.update(update, {
      where: { id },
      returning: true,
    })
    return feedback[1][0]
  } catch (error) {
    console.log(error)
    return null
  }
}

export const deleteFeedback = async (id: number) => {
  try {
    const feedback = await Feedback.destroy({
      where: { id },
    })
    return feedback
  } catch (error) {
    console.log(error)
    return null
  }
}
