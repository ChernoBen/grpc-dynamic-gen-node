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
const client = new greetPackageDefinition.GreetService("localhost:50051",
    grpc.credentials.createInsecure()
);

function callGreetings(){
    var request = {
        greeting:{
            first_name:"jerry",
            last_name:"john"
        }
    }
    client.greet(request,(error,response)=>{
        if(!error){
            console.log("greeting response: ",response);
        }else{
            console.log("erro enquanto esperava response");
        }
    });
}
function main(){
    callGreetings();
}
main();