import client from "../client";

const resolvers = {
  Query: {
    getCourse: async ({ id }: { id: string }) => {
      return new Promise((resolve, reject) => {
        client.getCourse({ id }, (err: any, response: any) => {
          if (err) reject(err);
          resolve(response);
        });
      });
    },
    getAllCourses: async () => {
      return new Promise((resolve, reject) => {
        client.getAllCourses({}, (err: any, response: any) => {
          if (err) reject(err);
          resolve(response);
        });
      });
    },
  },
};

export default resolvers;
