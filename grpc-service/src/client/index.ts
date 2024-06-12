import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

const PROTO_PATH = path.join(__dirname, "../proto/course.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const CourseService: any =
  grpc.loadPackageDefinition(packageDefinition).CourseService;

const client = new CourseService(
  "127.0.0.1:50051",
  grpc.credentials.createInsecure()
);

export default client;
