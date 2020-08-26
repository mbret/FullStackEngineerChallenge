type Review = { id: number, grade: number, employee?: { name: string }, authorizedFeedbackEmployees?: Array<{ id: number }> }
type Employee = { id: number, name: string }

export const getEmployees = async (): Promise<Employee[]> => {
  const response = await fetch('http://localhost:3000/employees')

  return await response.json()
}

export const getReviews = async (): Promise<Review[]> => {
  const response = await fetch('http://localhost:3000/reviews')

  return await response.json()
}

export const getOneReview = async (reviewId: number): Promise<Review> => {
  const response = await fetch(`http://localhost:3000/reviews/${reviewId}`)

  return await response.json()
}

export const putReviews = async (reviewId: number, authorizedFeedbackEmployees: number[]) => {
  await fetch('http://localhost:3000/reviews', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: reviewId,
      authorizedFeedbackEmployees,
    }),
  })
}