import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from "typeorm";

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar' })
  name: string

  @OneToMany(type => PerformanceReview, photo => photo.employee)
  reviews: PerformanceReview[];
}

@Entity()
export class PerformanceReview {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  grade: string

  @ManyToOne(type => Employee, user => user.reviews)
  employee: Employee;

  @ManyToMany(type => Employee)
  @JoinTable()
  authorizedFeedbackEmployees: Employee[];
}

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;
}