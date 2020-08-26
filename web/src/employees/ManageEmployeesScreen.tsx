import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Table, Button } from 'react-bootstrap'
import { useEmployees } from './useEmployess'

export const ManageEmployeesScreen = () => {
  const [newEmployee, setNewEmployee] = useState<{ name: string } | undefined>(undefined)
  const [employeeToRemove, setEmployeeToRemove] = useState<number | undefined>(undefined)
  const [employees] = useEmployees()
  const [localEmployees, setLocalEmployees] = useState<typeof employees>(employees)

  useEffect(() => {
    setLocalEmployees(employees)
  }, [employees])

  useEffect(() => {
    newEmployee && setNewEmployee(undefined)

    if (newEmployee) {
      (async () => {
        try {
          const response = await fetch('http://localhost:3000/employees', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newEmployee),
          })
          const entity = await response.json()
          setLocalEmployees([...localEmployees || [], entity])
        } catch (e) {
          console.error(e)
        }
      })()
    }
  }, [newEmployee, localEmployees])

  useEffect(() => {
    employeeToRemove && setEmployeeToRemove(undefined)

    if (employeeToRemove) {
      (async () => {
        try {
          await fetch(`http://localhost:3000/employees/${employeeToRemove}`, {
            method: 'DELETE',
          })
          setLocalEmployees(localEmployees?.filter(({ id }) => id !== employeeToRemove))
        } catch (e) {
          console.error(e)
        }
      })()
    }
  }, [employeeToRemove, localEmployees])

  return (
    <>
      <div>Employees</div>
      {localEmployees && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {localEmployees?.map((employe) => (
              <tr key={employe.id}>
                <td>{employe.id}</td>
                <td>{employe.name}</td>
                <td>
                  <Button variant="warning" onClick={() => setEmployeeToRemove(employe.id)}>Remove</Button>
                &nbsp;<Button variant="warning">Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <div>Add an employee</div>
      <Formik
        initialValues={{ name: '' }}
        onSubmit={(values, { setSubmitting }) => {
          setNewEmployee({ name: values.name })
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="name" placeholder="Name" />
            <ErrorMessage name="name" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Submit
           </button>
          </Form>
        )}
      </Formik>
    </>
  )
}