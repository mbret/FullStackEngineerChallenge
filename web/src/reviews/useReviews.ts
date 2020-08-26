import { useState, useEffect, useCallback } from "react"
import { getReviews } from "../api"
import { PromiseReturnType } from "../types"

export const useReviews = (): [PromiseReturnType<typeof getReviews> | undefined, () => any] => {
  const [reviews, setReviews] = useState<PromiseReturnType<typeof getReviews> | undefined>(undefined)
  const [refresh, setRefresh] = useState<boolean>(true)

  const refreshTrigger = useCallback(() => setRefresh(true), [])

  useEffect(() => {
    if (refresh) {
      (async () => {
        try {
          const reviews = await getReviews()
          setReviews(reviews)
        } catch (e) {
          console.error(e)
        }
      })()
    }

    setRefresh(false)
  }, [refresh])

  return [reviews, refreshTrigger]
}