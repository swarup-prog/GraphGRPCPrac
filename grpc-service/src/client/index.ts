import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

const PROTO_PATH = "../proto/course.proto";

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
  "localhost:50051",
  grpc.credentials.createInsecure()
);

export default client;
