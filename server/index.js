const path = require("path");
const protoLoader = require("@grpc/proto-loader");
const grpc = require("grpc");
const { clearInterval } = require("timers");

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
//unary
function greet(call,callback){
    var firstName = call.request.greeting.first_name;
    var lastName = call.request.greeting.last_name;
    callback(null,{result:"hello "+firstName+" "+lastName});
}

//server streaming
function greetManyTimes(call,callback){
    var firstName = call.request.getGreeting().getFirstName();
    var greetManyTimesResponse = new greets.GreetManyTimesResponse();
    let count = 0,intervalID = setInterval(function(){
        greetManyTimesResponse.setResul(firstName);    
        //setup streaming
        call.write(greetManyTimesResponse);
        if(++count > 9){
            clearInterval(intervalID);
            //fechar apos enviar todas as mensagens necessárias
            call.end();
        }
        
    },1000); 
}

function main(){
    const server = new grpc.Server()
    server.addService(greetPackageDefinition.GreetService.service,{
        greet:greet,
        greetManyTimes:greetManyTimes
    });
    server.bind("127.0.0.1:50051",grpc.ServerCredentials.createInsecure());
    server.start();
    console.log("running at localhost:50051");

}
main()