import { Express } from 'express'
import { getConnection } from './getConnection'
import { Employee, PerformanceReview } from './entities'

/**
 * The routes are following a simplified REST pattern and use typeorm connection to
 * operate CRUD operation on entities
 */
export const register = (app: Express) => {
  app.post('/employees', async (req, res) => {
    const employee = new Employee()
    employee.name = req.body.name

    const connection = await getConnection()
    const AddedEntity = await connection.manager.save(employee)

    res.send(AddedEntity)
  })

  app.get('/employees', async (req, res) => {
    const connection = await getConnection()

    const employees = await connection.manager.find(Employee)

    res.send(employees)
  })

  app.delete('/employees/:id', async (req, res) => {
    const connection = await getConnection()

    await connection.manager.delete(Employee, req.params.id)

    res.send('done')
  })

  app.post('/reviews', async (req, res) => {
    const entity = new PerformanceReview()
    entity.grade = req.body.grade
    entity.employee = req.body.employee

    const connection = await getConnection()
    const { id } = await connection.manager.save(entity)

    const fullyLoadedAddedEntity = await connection.manager.findOne(PerformanceReview, {
      where: { id },
      relations: ['employee']
    })

    res.send(fullyLoadedAddedEntity)
  })

  app.put('/reviews', async (req, res) => {
    const connection = await getConnection()
    
    const entity = await connection.manager.findOne(PerformanceReview, {
      where: { id: req.body.id },
      relations: ['authorizedFeedbackEmployees']
    })
    
    entity.authorizedFeedbackEmployees = req.body.authorizedFeedbackEmployees.map(employeeId => {
      const employeeEntity = new Employee()
      employeeEntity.id = employeeId

      return employeeEntity
    })


    await connection.manager.save(entity)

    res.send('done')
  })

  app.get('/reviews', async (req, res) => {
    const connection = await getConnection()

    const entities = await connection.manager.find(PerformanceReview, {
      relations: ['employee', 'authorizedFeedbackEmployees']
    })

    res.send(entities)
  })

  app.get('/reviews/:id', async (req, res) => {
    const connection = await getConnection()

    const entity = await connection.manager.findOne(PerformanceReview, {
      where: { id: req.params.id },
      relations: ['employee', 'authorizedFeedbackEmployees']
    })

    res.send(entity)
  })

  app.delete('/reviews/:id', async (req, res) => {
    const connection = await getConnection()

    await connection.manager.delete(PerformanceReview, req.params.id)

    res.send('done')
  })
}