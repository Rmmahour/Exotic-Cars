const mongoClient = require('mongodb').MongoClient;
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({
     extended : true
    }));
app.use(bodyParser.json());
app.use(cors());

var constr = "mongodb+srv://ram:ram@cluster0.mjpad9x.mongodb.net/?retryWrites=true&w=majority";

app.get('/users', function (req, res,){
    mongoClient.connect(constr, function (err,clientObject){
        if(!err){
            var dbo = clientObject.db("Cars");
            dbo.collection("Users").find().toArray((err,user)=>{
                res.send(user);
        });
    }else{
        console.log(err);
    }});
});

app.post('/login', function (req, res){
    mongoClient.connect(constr, function (err,clientObject){
        if(!err){
            // console.log(req.body);
            var dbo = clientObject.db("Cars");
            dbo.collection("Users").find({Userid:req.body.email,Password:req.body.password}).toArray((err,user)=>{
                // console.log(user);
                    if(user.length>0){
                            res.status(200).send({
                                status: 200,
                                result: user[0],
                                message: 'login successful'
                            })
                    }else{
                        res.status(400).send({
                            status: 400,
                            message:'User not found'
                        })
                    }
        });
    }else{
        console.log(err);
    }});
});
    
app.get('/users/:Userid', function(req, res){
    var Userid = req.params.Userid;
    mongoClient.connect(constr, function(err,clientObject){
        if(!err){
            var dbo= clientObject.db('Cars');
            dbo.collection('Users').find({Userid:Userid}).toArray((err,User)=>{
                if(!err){
                    res.send(User);
                }else{
                    console.log(err);
                }
            });
        }
    });
})

app.get('/user/:firstname', function(req, res){
    var UserName = req.params.firstname;
    mongoClient.connect(constr, function(err,clientObject){
        if(!err){
            var dbo= clientObject.db('Cars');
            dbo.collection('Users').find({FirstName:UserName}).toArray((err,data)=>{
                if(!err){
                    res.send(data);
                }else{
                    console.log(err);
                }
            });
        }
    });
})

app.get('/cars', function (req, res){
    mongoClient.connect(constr, function (err,clientObject){
        if(!err){
            var dbo = clientObject.db("Cars");
            dbo.collection("Models").find().toArray((err,cars)=>{
                    res.send(cars);
        });
    }else{
        console.log(err);
    }});
});

app.get('/wishlist', function (req, res){
    mongoClient.connect(constr, function (err,clientObject){
        if(!err){
            var dbo = clientObject.db("Cars");
            dbo.collection("Wishlist").find().toArray((err,wishlist)=>{
                    res.send(wishlist);
        });
    }else{
        console.log(err);
    }});
});

app.get('/wishlist/:wishlistid', function (req, res){
    // var wishlistId = req.params.wishlistid;
    mongoClient.connect(constr, function (err,clientObject){
        if(!err){
            var dbo = clientObject.db("Cars");
            dbo.collection("Wishlist").find({WishlistId:req.params.wishlistid}).toArray((err,wishlist)=>{
                    for(var data of wishlist){
                        for(var i=0;i<wishlist.length;i++){
                            res.send(data.Item);
                        }
                    }
        });
    }else{
        console.log(err);
    }});
});

app.get('/cars/:name', function (req, res){
    var brand = req.params.name;
    // console.log(brand);
    mongoClient.connect(constr, function (err,clientObject){
        if(!err){
            var dbo = clientObject.db("Cars");
            dbo.collection("Models").find({Brand:brand}).toArray((err,cars)=>{
                    res.send(cars);
        });
    }else{
        console.log(err);
    }});
});

app.get('/car/:id', function (req, res){
    var id = parseInt(req.params.id);
    mongoClient.connect(constr, function (err,clientObject){
        if(!err){
            var dbo = clientObject.db("Cars");
            dbo.collection("Models").find({Id:id}).toArray((err,cars)=>{
                    res.send(cars);
        });
    }else{
        console.log(err);
    }});
});

app.get('/brands', function (req, res){
    mongoClient.connect(constr, function (err,clientObject){
        if(!err){
            var dbo = clientObject.db("Cars");
            dbo.collection("Brands").find().toArray((err,Brands)=>{
                   if(!err){
                    res.send(Brands);
                   }else{
                    console.log(err)
                   }
        });
    }else{
        console.log(err);
    }});
});

app.post("/register",(req,res)=>{
    var WishlistId = {
        WishlistId: req.body.Userid,
    };
    var new_User = {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Date_Of_Birth: req.body.Date_Of_Birth,
        Email: req.body.Email,
        Gender: req.body.Gender,
        Userid: req.body.Userid,
        Street: req.body.Street,
        City: req.body.City,
        State: req.body.State,
        Pincode: parseInt(req.body.Pincode),
        Country: req.body.Country,
        Mobile: req.body.Mobile,
        Password: req.body.Password
    };
    mongoClient.connect(constr,(err,clientObject)=>{
        if(!err){
            var database= clientObject.db("Cars");
            database.collection("Users").insertOne(new_User,(req,User)=>{
                if(!err){
                    res.send(User);
                    database.collection("Wishlist").insertOne(WishlistId,(req,result)=>{
                        if(!err){
                            console.log(result);
                            console.log("Registration Completed");
                        }
                    });
                }else{
                    console.log(err);
                }
            })
        }else{
            console.log(err);
        }
    })
})

app.put('/wishlist/:wishlistid', function(req, res){
    var Item = {
        Id:req.body.Id,
        Brand:req.body.Brand,
        Model:req.body.Model,
        Image:req.body.Image,
        Price:req.body.Price,
        From:req.body.From,
        Days:req.body.Days,
        Amount:req.body.Amount
    };
    var wishlistid = req.params.wishlistid;
    mongoClient.connect(constr, function(err, clientObject){
        if(!err){
            var dbo = clientObject.db('Cars');
            dbo.collection('Wishlist').updateOne({WishlistId: wishlistid}, {$push:{Item}}, function(err, result){
                if(!err){
                    res.send(result);
                    console.log(result);
                }else{
                    console.log(err);
                }
            });
        }
    });
})

app.put('/user/firstname/:Userid', function(req, res){
    var FirstName=req.body.FirstName;
    var Userid = req.params.Userid;
    mongoClient.connect(constr, function(err,clientObject){
        if(!err){
            var dbo= clientObject.db('Cars');
            dbo.collection('Users').updateOne({Userid:Userid},{$set:{FirstName:FirstName}}, function(err,result){
                if(!err){
                    res.send(result);
                }else{
                    console.log(err);
                }
            });
        }
    });
})

app.put('/user/lastname/:Userid', function(req, res){
    var LastName = req.body.LastName;
    var Userid = req.params.Userid;
    mongoClient.connect(constr, function(err,clientObject){
        if(!err){
            var dbo= clientObject.db('Cars');
            dbo.collection('Users').updateOne({Userid:Userid},{$set:{LastName:LastName}}, function(err,result){
                if(!err){
                    res.send(result);
                }else{
                    console.log(err);
                }
            });
        }
    });
})

app.put('/user/email/:Userid', function(req, res){
    var Email= req.body.Email;
    var Userid = req.params.Userid;
    mongoClient.connect(constr, function(err,clientObject){
        if(!err){
            var dbo= clientObject.db('Cars');
            dbo.collection('Users').updateOne({Userid:Userid},{$set:{Email:Email}}, function(err,result){
                if(!err){
                    res.send(result);
                }else{
                    console.log(err);
                }
            });
        }
    });
})

app.put('/user/mobile/:Userid', function(req, res){
    var Mobile= req.body.Mobile;
    var Userid = req.params.Userid;
    mongoClient.connect(constr, function(err,clientObject){
        if(!err){
            var dbo= clientObject.db('Cars');
            dbo.collection('Users').updateOne({Userid:Userid},{$set:{Mobile:Mobile}}, function(err,result){
                if(!err){
                    res.send(result);
                }else{
                    console.log(err);
                }
            });
        }
    });
})

app.put('/user/password/:Userid', function(req, res){
    var Password = req.body.Password;
    var Userid = req.params.Userid;
    mongoClient.connect(constr, function(err,clientObject){
        if(!err){
            var dbo= clientObject.db('Cars');
            dbo.collection('Users').updateOne({Userid:Userid},{$set:{Password:Password}}, function(err,result){
                if(!err){
                    res.send(result);
                }else{
                    console.log(err);
                }
            });
        }
    });
})

app.put('/user/street/:Userid', function(req, res){
    var Street= req.body.Street;
    var Userid = req.params.Userid;
    mongoClient.connect(constr, function(err,clientObject){
        if(!err){
            var dbo= clientObject.db('Cars');
            dbo.collection('Users').updateOne({Userid:Userid},{$set:{Street:Street}}, function(err,result){
                if(!err){
                    res.send(result);
                }else{
                    console.log(err);
                }
            });
        }
    });
})

app.put('/user/pin/:Userid', function(req, res){
    var Pincode= req.body.Pincode;
    var Userid = req.params.Userid;
    mongoClient.connect(constr, function(err,clientObject){
        if(!err){
            var dbo= clientObject.db('Cars');
            dbo.collection('Users').updateOne({Userid:Userid},{$set:{Pincode:Pincode}}, function(err,result){
                if(!err){
                    res.send(result);
                }else{
                    console.log(err);
                }
            });
        }
    });
})

app.put('/user/city/:Userid', function(req, res){
    var City = req.body.City;
    var Userid = req.params.Userid;
    mongoClient.connect(constr, function(err,clientObject){
        if(!err){
            var dbo= clientObject.db('Cars');
            dbo.collection('Users').updateOne({Userid:Userid},{$set:{City:City}}, function(err,result){
                if(!err){
                    res.send(result);
                }else{
                    console.log(err);
                }
            });
        }
    });
})

app.put('/user/state/:Userid', function(req, res){
    var State = req.body.State;
    var Userid = req.params.Userid;
    mongoClient.connect(constr, function(err,clientObject){
        if(!err){
            var dbo= clientObject.db('Cars');
            dbo.collection('Users').updateOne({Userid:Userid},{$set:{State:State}}, function(err,result){
                if(!err){
                    res.send(result);
                }else{
                    console.log(err);
                }
            });
        }
    });
})

app.put('/wishlist/:wishlistid/:id', function(req, res){
    var item = req.params.id;
    var wishlistid = req.params.wishlistid;
    var list = req.body.list;
    mongoClient.connect(constr, function(err, clientObject){
        if(!err){
            var dbo = clientObject.db('Cars');
            console.log(item);
            dbo.collection('Wishlist').updateOne({WishlistId: wishlistid},{$set:{Item:list}}, function(err, result){
                if(!err){
                    res.send(result);
                    console.log(result);
                }else{
                    console.log(err);
                }
            });
        }
    });
})

app.listen(9000);
console.log("Server listening on 9000");