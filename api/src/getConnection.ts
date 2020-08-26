import "reflect-metadata";
import { createConnection } from "typeorm";
import { Employee, Feedback, PerformanceReview } from "./entities";

/**
 * Pattern to retrieve asynchronously the same connection no matter who calls it.
 */
const deferredConnection = createConnection({
  type: "sqlite",
  database: "database",
  entities: [Employee, Feedback, PerformanceReview],
  synchronize: true,
  logging: false
})

export const getConnection = async () => deferredConnection