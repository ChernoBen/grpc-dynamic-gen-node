const path = require("path");
const protoLoader = require("@grpc/proto-loader");
const grpc = require("grpc");

//grpc service definition for greet

const greetProtoPath = path.join(__dirname,"..","proto","greet.proto");
const greetProtoDefinition = protoLoader.loadSync(greetProtoPath,{
    keepCase:true,
    longs:String,
    enums:String,
    defaults:true,
    eneofs:true
});

const greetPackageDefinition = grpc.loadPackageDefinition(greetProtoDefinition).greet;