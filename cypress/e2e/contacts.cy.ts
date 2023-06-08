let requestOptions: Partial<Cypress.RequestOptions> = {
  method: 'POST',
  url: '/contacts',
  failOnStatusCode: false,
}

describe('Tests over /contacts path', () => {
  before(() => {
    this.fixtures = new Map<string, any>()
    ;[
      'contact',
      'invalidNameContact',
      'invalidEmailContact',
      'invalidPhoneContact',
      'invalidBirthdayContact',
    ].forEach((name) => {
      cy.fixture(name).then((value) => {
        this.fixtures.set(name, value)
      })
    })
  })

  beforeEach(() => {
    cy.task('clearContacts')
  })

  it('should save a valid contact', () => {
    requestOptions.body = this.fixtures.get('contact')

    cy.request(requestOptions).then(({ body, status }) => {
      expect(status).to.equal(201)
      const { contact } = body
      expect(contact._id).to.not.null
    })
  })

  it('should not save a contact with invalid name', () => {
    requestOptions.body = this.fixtures.get('invalidNameContact')

    cy.request(requestOptions).then(({ body, status }) => {
      expect(status).to.equal(400)
      const { errorMessages } = body
      expect(errorMessages[0]).to.equal('Name cannot be empty')
    })
  })

  it('should not save a contact with invalid email', () => {
    requestOptions.body = this.fixtures.get('invalidEmailContact')

    cy.request(requestOptions).then(({ body, status }) => {
      expect(status).to.equal(400)
      const { errorMessages } = body
      expect(errorMessages[0]).to.equal('Invalid email')
    })
  })

  it('should not save a contact with invalid phone', () => {
    requestOptions.body = this.fixtures.get('invalidPhoneContact')

    cy.request(requestOptions).then(({ body, status }) => {
      expect(status).to.equal(400)
      const { errorMessages } = body
      expect(errorMessages[0]).to.equal(
        'Phone must have following pattern: (00) 00000-0000'
      )
    })
  })

  it('should not save a contact with invalid birthday', () => {
    requestOptions.body = this.fixtures.get('invalidBirthdayContact')

    cy.request(requestOptions).then(({ body, status }) => {
      expect(status).to.equal(400)
      const { errorMessages } = body
      expect(errorMessages[0]).to.equal('Birthday must be previous to today')
    })
  })

  it('should find contacts by name', () => {
    const lastname = 'sousa'
    const populationSize = 10

    cy.task('populateContacts', {
      lastname,
      populationSize,
    })

    requestOptions.method = 'GET'
    requestOptions.url = `/contacts/name/${lastname}`
    cy.request(requestOptions).then(({ body, status }) => {
      expect(status).to.equal(200)
      const { contacts } = body
      expect(contacts.length).to.gte(populationSize / 2)

      contacts.forEach((c: any) => expect(c.name).to.contain(lastname))
    })
  })

  it('should retrieve correct contacts by birtday period', () => {
    const startDateStr = '1990-08-13'
    const endDateStr = '2000-08-13'
    const startDate = new Date(startDateStr)
    const endDate = new Date(endDateStr)
    const populationSize = 10

    cy.task('populateContacts', {
      startDate,
      endDate,
      populationSize,
    })

    requestOptions.method = 'GET'
    requestOptions.url = `/contacts/birthday?start=${startDateStr}&end=${endDateStr}`
    cy.request(requestOptions).then(({ status, body }) => {
      expect(status).to.equal(200)
      const { contacts } = body
      expect(contacts.length).to.gte(populationSize / 2)

      contacts.forEach((c: any) => {
        expect(new Date(c.birthday)).to.gte(startDate)
        expect(new Date(c.birthday)).to.lte(endDate)
      })
    })
  })
})
