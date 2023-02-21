import { Image } from '../models/Image'

// create crud controllers for Image model
export const getImages = async (
  is_active?: boolean | undefined,
  is_gallery?: boolean | undefined
) => {
  try {
    const where: { is_active?: boolean; is_gallery?: boolean } = {}

    typeof is_active === 'boolean' ? (where['is_active'] = is_active) : ''
    typeof is_gallery === 'boolean' ? (where['is_gallery'] = is_gallery) : ''

    const images = await Image.findAll({
      where,
    })
    return images
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getImageById = async (id: number) => {
  try {
    const image = await Image.findOne({ where: { id } })
    return image
  } catch (error) {
    console.log(error)
    return null
  }
}

export const createImage = async (
  unique_name: string,
  original_name: string,
  size: number,
  is_gallery: boolean,
  is_active: boolean
) => {
  try {
    const image = await Image.create({
      unique_name,
      original_name,
      size,
      is_gallery,
      is_active,
    })
    return image
  } catch (error) {
    console.log(error)
    return null
  }
}

export const updateImage = async (
  id: number,
  unique_name: string,
  original_name: string,
  size: number,
  is_gallery: boolean,
  is_active: boolean
) => {
  try {
    const foundImage = await Image.findOne({ where: { id } })
    if (!foundImage) {
      return null
    }
    const image = foundImage.dataValues
    image.unique_name = unique_name
    image.original_name = original_name
    image.size = size
    image.is_gallery = is_gallery
    image.is_active = is_active
    await image.save()
    return image
  } catch (error) {
    console.log(error)
    return null
  }
}

export const deleteImage = async (id: number) => {
  try {
    const image = await Image.findOne({ where: { id } })
    if (!image) {
      return null
    }
    await image.destroy()
    return image
  } catch (error) {
    console.log(error)
    return null
  }
}
