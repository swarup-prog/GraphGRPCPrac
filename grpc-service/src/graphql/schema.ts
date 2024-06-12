import { buildSchema } from "graphql";

const schema = buildSchema(`
  type Course {
    id: String!
    title: String!
    lessons: Int!
    level: String!
  }

  type Mutation {
    getAllCourses: [Course!]! 
    getCourse(id: ID!): Course
`);

export default schema;
