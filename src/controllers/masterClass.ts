import { MasterClass } from '../models/MasterClass'

// create crud controllers for MasterClass model
export const getMasterClasses = async (is_active?: boolean) => {
  try {
    const where: { is_active?: boolean } = {}
    typeof is_active === 'boolean' ? (where['is_active'] = is_active) : ''
    console.log(where)
    const masterClasses = await MasterClass.findAll({
      where,
    })
    return masterClasses
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getMasterClassById = async (id: number) => {
  try {
    const masterClass = await MasterClass.findOne({ where: { id } })
    return masterClass
  } catch (error) {
    console.log(error)
    return null
  }
}

export const createMasterClass = async (
  title: string,
  description: string,
  deadline: Date,
  address: string,
  landmark: string,
  is_active: boolean,
  image: string | number,
  is_count_down: boolean
) => {
  try {
    const masterClass = await MasterClass.create({
      title,
      description,
      deadline,
      address,
      landmark,
      is_active,
      image,
      is_count_down,
    })
    return masterClass
  } catch (error) {
    console.log(error)
    return null
  }
}

export const updateMasterClass = async (
  id: number,
  title: string,
  description: string,
  deadline: Date,
  address: string,
  landmark: string,
  is_active: boolean,
  image: string | number,
  is_count_down: boolean
) => {
  try {
    const masterClass = await MasterClass.update(
      {
        title,
        description,
        deadline,
        address,
        landmark,
        is_active,
        image,
        is_count_down,
      },
      { where: { id } }
    )
    return masterClass.length > 0 ? masterClass[0] : null
  } catch (error) {
    console.log(error)
    return null
  }
}

export const deleteMasterClass = async (id: number) => {
  try {
    const masterClass = await MasterClass.destroy({ where: { id } })
    return masterClass
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getMasterClassByTitle = async (title: string) => {
  try {
    const masterClass = await MasterClass.findOne({ where: { title } })
    return masterClass
  } catch (error) {
    console.log(error)
    return null
  }
}
