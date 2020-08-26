import React, { useState, useEffect } from 'react'
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik'
import { Table, Button, Form } from 'react-bootstrap'
import { EditReviewModal } from './EditReviewModal'
import { useEmployees } from '../employees/useEmployess'
import { useReviews } from './useReviews'

export const ManagePerformanceReviews = () => {
  const [newReview, setNewReview] = useState<{ employee: number, grade: number } | undefined>(undefined)
  const [reviewToRemove, setReviewToRemove] = useState<number | undefined>(undefined)
  const [employees] = useEmployees()
  const [reviews] = useReviews()
  const [localReviews, setLocalReviews] = useState<typeof reviews>(reviews)
  const [reviewToEdit, setReviewToEdit] = useState<number | undefined>(undefined);

  useEffect(() => {
    setLocalReviews(reviews)
  }, [reviews])

  useEffect(() => {
    newReview && setNewReview(undefined)

    if (newReview) {
      (async () => {
        try {
          const response = await fetch('http://localhost:3000/reviews', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newReview),
          })
          const entity = await response.json()
          setLocalReviews([...localReviews || [], entity])
        } catch (e) {
          console.error(e)
        }
      })()
    }
  }, [newReview, localReviews])

  useEffect(() => {
    reviewToRemove && setReviewToRemove(undefined)

    if (reviewToRemove) {
      (async () => {
        try {
          await fetch(`http://localhost:3000/reviews/${reviewToRemove}`, {
            method: 'DELETE',
          })
          setLocalReviews(localReviews?.filter(({ id }) => id !== reviewToRemove))
        } catch (e) {
          console.error(e)
        }
      })()
    }
  }, [reviewToRemove, localReviews])

  return (
    <>
      <div>Performance reviews</div>
      {localReviews && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Employee</th>
              <th>Grade</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {localReviews?.map((review) => (
              <tr key={review.id}>
                <td>{review.id}</td>
                <td>{review.employee?.name}</td>
                <td>{review.grade}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => setReviewToRemove(review.id)}
                  >
                    Remove
                  </Button>
                &nbsp;
                <Button
                    variant="info"
                    onClick={() => setReviewToEdit(review.id)}
                  >
                    Manage feedback requests
                </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <div>Add an performance review</div>
      <Formik
        initialValues={{ employee: '', grade: '0' }}
        validate={values => {
          const errors: any = {};
          if (!values.employee) errors.employee = 'Please specify an employee'
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setNewReview({ employee: parseInt(values.employee), grade: parseInt(values.grade) })
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <FormikForm>
            <Form.Label>Employee:</Form.Label>
            <Field as="select" name="employee">
              <option value=""></option>
              {employees?.map(employee => (
                <option key={employee.id} value={employee.id}>{employee.name}</option>
              ))}
            </Field>
            <div>
              <Form.Label>Grade:</Form.Label>
              <Field as="select" name="grade">
                {Array.from({ length: 10 }).map((_, i) => i).map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </Field>
            </div>
            <ErrorMessage name="name" component="div" />
            <Button type="submit" disabled={isSubmitting}>
              Submit
           </Button>
          </FormikForm>
        )}
      </Formik>

      {reviewToEdit && <EditReviewModal reviewId={reviewToEdit} onHide={() => setReviewToEdit(undefined)} />}
    </>
  )
}