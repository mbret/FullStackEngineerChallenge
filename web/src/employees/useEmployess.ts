import { useState, useEffect, useCallback } from "react"
import { getEmployees } from "../api"
import { PromiseReturnType } from "../types"

export const useEmployees = (): [PromiseReturnType<typeof getEmployees> | undefined, () => any] => {
  const [employees, setEmployees] = useState<PromiseReturnType<typeof getEmployees> | undefined>(undefined)
  const [refresh, setRefresh] = useState<boolean>(true)

  const refreshEmployees = useCallback(() => setRefresh(true), [])

  useEffect(() => {
    if (refresh) {
      (async () => {
        try {
          const employees = await getEmployees()
          setEmployees(employees)
        } catch (e) {
          console.error(e)
        }
      })()
    }

    setRefresh(false)
  }, [refresh])

  return [employees, refreshEmployees]
}