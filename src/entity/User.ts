import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    age: number;

    constructor(
        firstName: string,
        lastName: string,
        email: string,
        age: number
    ) {
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.age = age
    }
}
