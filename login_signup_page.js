var fs = require("fs")
var readlinesync = require("readline-sync");
var candidate = readlinesync.question("enter your choice whether you want to login or signup:  ")
if (candidate == "signup") {
    var readlinesync = require("readline-sync");
    var username = readlinesync.question("enter your username:  ")
    var password1 = readlinesync.question("enter your password:  ")
    var confirmation_password = readlinesync.question("enter your confirmation password:  ")
    if (password1.includes("@") || password1.includes("#")) {
        if (password1 == confirmation_password) {
            console.log("valid")
        } else {
            console.log("both are not same")
        }
    } else {
        console.log("At password contain one special character and one number")
    }
    fs.readFile('user_details.json', (err,data) => {
        var convert_data = JSON.parse(data)
        var value = convert_data["user"]
        if (username == value[0]["username"]) {
            console.log(username, "already exists")
        }else {
            var json_object = { "user": [{ "username": username, "password1": password1 }] };
            var json_data = JSON.stringify(json_object,null,2)
            console.log(json_data)
            fs.writeFile('./user_details.json', json_data , (err) => {
                if(err) {
                    console.log('Error writing file', err)
                }else {
                    console.log("congrats!  "  +   username  +  "  you have signed up successfully! ")
                    var description = readlinesync.question("tell about yourself:   ")
                    var date_of_birth = readlinesync.question("enter your date_of_birth:   ")
                    var hobbies = readlinesync.question("enter your hobbies:   ")
                    var gender = readlinesync.question("enter your gender:   ")
                    var json_data_key = {"user": [{"username":username,"password1":password1,"profile" : {"description" : description},"date_of_birth" : date_of_birth,"hobbies" : hobbies,"gender" : gender }]};
                    convert_data_string = JSON.stringify(json_data_key,null,2)
                    console.log(convert_data_string)
                    fs.writeFile("user_details.json", convert_data_string , (err) => {
                        if (err){
                            console.log("still writing",err)
                        }else{
                            console.log(username, "The user's name will come here, whatever name you enter. "  +   "You have logged in successfully!   ")
                        }
                    });
                }

            });
        }
    })
}else if (candidate == "login"){
    var readlinesync = require("readline-sync");
    var username = readlinesync.question("enter your username:-   ")
    var password = readlinesync.question("enter your password1:-   ")
    fs.readFile('user_details.json', (err,data) => {
        var convert_data = JSON.parse(data)
        var value = convert_data["user"]
        if (username == value[0]["username"] && password == value[0]["password1"]) {
            console.log(convert_data)
        }else{
            console.log("invalid username and password")
        }

    });
}