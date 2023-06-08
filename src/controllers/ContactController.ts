import { Request, Response } from 'express'
import { ContactDAO } from '../dao/ContactDAO'
import { ContactModel, validateContactInputs } from '../domains/ContactModel'

export class ContactController {
  private _contactDAO: ContactDAO

  constructor() {
    this._contactDAO = new ContactDAO()
  }

  async save(req: Request, res: Response) {
    const errorMessages = validateContactInputs(req.body)

    if (errorMessages.length == 0) {
      const { name, email, phone, birthday } = req.body

      const contact = new ContactModel({
        name,
        email,
        phone,
        birthday: new Date(birthday),
      })

      const savedContact = await this._contactDAO.save(contact)
      return res.status(201).json({ contact: savedContact })
    }

    return res.status(400).json({ errorMessages })
  }

  async findByName(req: Request, res: Response) {
    const { name } = req.params

    const contacts = await this._contactDAO.findByName(name)

    return res.status(200).json({ contacts })
  }

  async findByBirthdayPeriod(req: Request, res: Response) {
    const { start, end } = req.query

    const startDate = new Date(`${start}`)
    const endDate = new Date(`${end}`)

    const errorMessages: string[] = []

    if (startDate <= endDate) {
      const contacts = await this._contactDAO.findByBirthdayPeriod(
        startDate,
        endDate
      )

      return res.status(200).json({ contacts })
    }

    errorMessages.push('Start date cannot be greater than end date')
    return res.status(400).json({ errorMessages })
  }
}
