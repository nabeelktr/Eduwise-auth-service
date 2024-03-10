import path from "path"
import * as grpc from "@grpc/grpc-js"
import * as protoLoader from "@grpc/proto-loader" 
import "dotenv/config"
import { ProtoGrpcType } from "../proto/auth";
import { Authcontroller } from "./controller/authController";
import { AuthHandlers } from "../proto/authpackage/Auth";


const packageDef = protoLoader.loadSync(path.resolve(__dirname, './protos/auth.proto'))
const grpcObject = (grpc.loadPackageDefinition(packageDef) as unknown) as ProtoGrpcType
const authpackage = grpcObject.authpackage



const controller = new Authcontroller()

const server = new grpc.Server()

const grpcServer = () => {
    server.bindAsync(`0.0.0.0:${process.env.AUTH_GRPC_PORT}`,
        grpc.ServerCredentials.createInsecure(),
        (err, port) => {
            if(err){
                console.log(err);
                return
            }
            console.log('grpc-auth server started on port ', port);
        }
    )
}

server.addService(authpackage.Auth.service, {
    IsAuthenticated : controller.isAuthenticated,   
    RefreshToken: controller.verifyToken
} as AuthHandlers )

grpcServer();