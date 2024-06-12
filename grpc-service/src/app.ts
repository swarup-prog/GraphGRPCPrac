import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import courses from "./data";

const PROTO_PATH = path.join(__dirname, "./proto/course.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const courseProto: any = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

//eslint-disable-next-line
server.addService(courseProto.CourseService.service, {
  getAllCourses: (_: any, callback: any) => {
    callback(null, { courses });
  },

  getCourse: (call: any, callback: any) => {
    const course = courses.find((course) => course.id === call.request.id);

    if (course) {
      callback(null, course);
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Not found",
      });
    }
  },
});

server.bindAsync(
  "localhost:5009",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    if (error) {
      console.error(error);
      return;
    }

    server.start();
    console.log("Server running on port", port);
  }
);
