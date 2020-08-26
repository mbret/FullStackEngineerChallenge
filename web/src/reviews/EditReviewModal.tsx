import React, { useState, useEffect, memo } from 'react'
import { Formik, Form as FormikForm, Field } from 'formik'
import { Table, Button, Modal } from 'react-bootstrap'
import { useEmployees } from '../employees/useEmployess'
import { getOneReview, putReviews } from '../api'
import { PromiseReturnType } from '../types'

export const EditReviewModal = memo(({ reviewId, onHide }: { reviewId: number, onHide: () => any }) => {
  const [employees, refreshEmployees] = useEmployees()
  const review = useReview(reviewId)
  const updateReview = useUpdateReview(onHide)
  
  useEffect(() => {
    refreshEmployees()
  }, [reviewId, refreshEmployees])

  return (
    <Modal show={!!reviewId} onHide={onHide} >
      {employees && review && (
        <Formik
          initialValues={
            /**
             * The initial value of the form is dynamically created from the api. We loop over each employe and then check wheter
             * it has the request or not. The resulting object is { 2: true, 56: false, ... }
             */
            employees?.reduce((values, employee) => {
              values[employee.id] = review.authorizedFeedbackEmployees?.some(authorizedEmp => authorizedEmp?.id === employee.id)

              return values
            }, {} as any)
          }
          onSubmit={values => {
            // conversion from { 2: true, 56: false, ... } to [2] with a filter of only the one checked
            updateReview(
              reviewId,
              Object.keys(values).filter(id => values[id]).map(idAsString => parseInt(idAsString))
            )
          }}
        >
          {({ values }) => (
              <FormikForm>
                <Modal.Header closeButton>
                  <Modal.Title>Manage feedback requests</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Employee</th>
                        <th>Requested</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees?.map((employee) => (
                        <tr key={employee?.id}>
                          <td>{employee?.name}</td>
                          <td><Field type="checkbox" name={employee?.id} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                  <Button variant="primary" type="submit">
                    Save Changes
                </Button>
                </Modal.Footer>
              </FormikForm>
            )}
        </Formik>
      )}
    </Modal>
  )
})

/**
 * This one is a hook pattern I like, it can be shared between componenents and export a very 
 * simple API to update a resource.
 */
const useUpdateReview = (onDone: () => any) => {
  const [reviewId, setReviewId] = useState<number | undefined>(undefined)
  const [updatedRequests, setUpatedRequests] = useState<number[] | undefined>(undefined)

  useEffect(() => {
    if (updatedRequests && reviewId) {
      (async () => {
        try {
          await putReviews(reviewId, updatedRequests)
          onDone()
        } catch (e) {
          console.error(e)
        }
      })()
      setUpatedRequests(undefined)
      setReviewId(undefined)
    }
  }, [updatedRequests, reviewId, onDone])

  return (reviewId: number, updatedRequests: number[]) => {
    setReviewId(reviewId)
    setUpatedRequests(updatedRequests)
  }
}

const useReview = (reviewId: number) => {
  const [review, setReview] = useState<PromiseReturnType<typeof getOneReview> | undefined>(undefined)

  useEffect(() => {
    (async () => {
      try {
        const response = await getOneReview(reviewId)
        setReview(response)
      } catch (e) {
        console.error(e)
      }
    })()

    setReview(undefined)
  }, [reviewId])

  return review
}