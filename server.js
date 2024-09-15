const express=require("express")
const server=express()
const session = require('express-session');
const { MongoClient } = require('mongodb');
const MongoStore = require('connect-mongo');


// var popup = require('popups');



const port=3002

const text="http://localhost:"

const path=__dirname

// delete metho
var methodOverride=require('method-override')
server.use(methodOverride('_method'))


server.set('view engine','ejs')


const mongoose=require('mongoose')

const Schema=mongoose.Schema;

const moment=require('moment')


server.use(express.static('public'))


server.use(express.json())



server.use(express.urlencoded({extended:true}))





//session 
server.use(session({
    secret: 'admin',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl:"mongodb+srv://nemradel220:BmKLk7jVrGk4gNS5@cluster0.lpaeqyq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" }),
    cookie: { secure: false,maxage:3600000 } 
}));




// middleware
function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        return next(); // User is authenticated, proceed
    } else {
        res.redirect('/Top-Laser-Loginn'); // Redirect to login if not authenticated
    }
}






 // connect to db for new uses
 const mongoUrl="mongodb+srv://nemradel220:BmKLk7jVrGk4gNS5@cluster0.lpaeqyq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
async function connectToMongo() {
    const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client;
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        throw error;
    }
}
















// get and post top_laser_login

server.get('/Top-Laser-Login',isAuthenticated ,async (req,res)=>{
    const DateArray=await TopLaserLoginModel.find()
    res.render('FirstPage',{moment:moment,arr:DateArray})
})

server.post('/Top-Laser-Login', async (req,res)=>{
    const TopLaserLoginModelUse=new TopLaserLoginModel(req.body)
    const date=req.body.Date
    TopLaserLoginModelUse.save()
    console.log(date)
    res.redirect('/Top-Laser-DataEntry/'+`${date}`)
})








// get and post DATAENTRY
server.get('/Top-Laser-DataEntry/:date',isAuthenticated,async (req,res)=>{
    try{
        const date=req.params.date
        const DateArray= await TopLaserLoginModel.find()
        const DataArray= await TopLaserDataEntryModel.find()
        res.render('DataEntry',{date:date,moment:moment,arr:DateArray,arr2:DataArray})
    }
    catch{((err)=>{
        console.log(err)
    })
        }
})

server.post('/Top-Laser-DataEntry/:date', async (req,res)=>{
    const TopLaserDataEntryModelUse=new TopLaserDataEntryModel(req.body)
    const date=req.params.date
    TopLaserDataEntryModelUse.save()
    console.log(req.body)
    res.redirect('/Top-Laser-DataEntry/'+`${date}`)
})








// get and post Finish

server.get("/Top-Laser-Finish/:date", async (req,res)=>{
    const date=req.params.date
    const DataArray=await TopLaserDataEntryModel.find()
    const DateArray=await TopLaserLoginModel.find()
        res.render("finish",{arr2:DataArray,arr:DateArray,moment:moment})
    })









// get and post SATURDAY DATA

server.get("/Top-Laser-Saturday",isAuthenticated, async (req,res)=>{
    const DateArray= await TopLaserLoginModel.find()
    const DataArray= await TopLaserDataEntryModel.find()
    res.render('Saturday-Date',{moment:moment,arr2:DataArray,arr:DateArray})
})









// get and post Monthly DATA

server.get("/Top-Laser-Monthely",isAuthenticated, async (req,res)=>{
    const DateArray= await TopLaserLoginModel.find()
    const DataArray= await TopLaserDataEntryModel.find()
    res.render('Monthely-Data',{moment:moment,arr2:DataArray,arr:DateArray})
})




























//Models
const {TopLaserLoginModel,TopLaserDataEntryModel,TopLaserSignUpModel,TopLaserLoginnModel}=require('./models/models')




mongoose
    .connect(
        "mongodb+srv://nemradel220:BmKLk7jVrGk4gNS5@cluster0.lpaeqyq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=>{
        server.listen (port,()=>{
            console.log("the connection in "+`${text}`+`${port}`);
        });
    })
    
        .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });









// Update request
server.put('/Top-Laser-DataEntry/:date/:id/:price/:out', async (req,res)=>{
    const date=req.params.date
    const DataOut=req.params.out
    const DataPrice=req.params.price
    if(DataPrice!=='' && DataOut!==''){
        let result=Number(DataPrice)+Number(DataOut)
        const update=await TopLaserDataEntryModel.updateOne({_id:req.params.id},{Out:0,Price:result,Note:"✔"})
        .then(()=>{
            console.log(DataPrice);
            console.log(DataOut);
            res.redirect('/Top-Laser-DataEntry/'+`${date}`)
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    else{
        const update=await TopLaserDataEntryModel.updateOne({_id:req.params.id},{Out:DataPrice,Price:DataOut,Note:"✔"})
        .then(()=>{
            console.log(DataPrice);
            console.log(DataOut);
            res.redirect('/Top-Laser-DataEntry/'+`${date}`)
        })
        .catch((err)=>{
            console.log(err);
        })
    }
})


server.put('/Top-Laser-Monthely/:id/:price/:out', async (req,res)=>{
    const date=req.params.date
    const DataOut=req.params.out
    const DataPrice=req.params.price
    const update=await TopLaserDataEntryModel.updateOne({_id:req.params.id},{Out:0,Price:DataOut,Note:"✔"})
    .then(()=>{
        console.log(DataPrice);
        console.log(DataOut);
        res.redirect('/Top-Laser-Monthely')
    })
    .catch((err)=>{
        console.log(err);
    })
})

server.put('/Top-Laser-Saturday/:id/:price/:out', async (req,res)=>{
    const date=req.params.date
    const DataOut=req.params.out
    const DataPrice=req.params.price
    const update=await TopLaserDataEntryModel.updateOne({_id:req.params.id},{Out:DataPrice,Price:DataOut,Note:"✔"})
    .then(()=>{
        console.log(DataPrice);
        console.log(DataOut);
        res.redirect('/Top-Laser-Saturday')
    })
    .catch((err)=>{
        console.log(err);
    })
})

// update OutNew
server.post('/Top-Laser-DataEntry/:date/:id/:OutNew', async (req,res)=>{
    const date=req.params.date
    const OutNew=req.params.OutNew
    const id=req.params.id
    const update=await TopLaserDataEntryModel.updateOne({_id:req.params.id},{Out:0,Price:OutNew,Note:"✔"})
    .then(()=>{
        res.redirect('/Top-Laser-Saturday')
    })
    .catch((err)=>{
        console.log(err);
    })
})


// update and post together
server.post('/Top-Laser-DataEntry/:date/:id', async (req, res) => {
    const date = req.params.date;
    const id = req.params.id;
    const OutNew = req.body.OutNew; // Assuming OutNew is sent in the request body
    // const price = req.body.price; // Assuming price is sent in the request body
    try {
        // Update both 'Out' and 'Price' fields in the database
        const update=await TopLaserDataEntryModel.updateOne({_id:req.params.id},{Out:0,Price:OutNew,Note:"✔"})
        .then(()=>{
            res.redirect('/Top-Laser-DataEntry/'+`${date}`);
        })
    } catch (error) {
        console.error("Error updating data:", error);
        res.status(500).send("Internal Server Error");
    }
});


server.post('/Top-Laser-Saturday/:id', async (req, res) => {
    const id = req.params.id;
    const OutNew = req.body.OutNew; // Assuming OutNew is sent in the request body
    // const price = req.body.price; // Assuming price is sent in the request body
    try {
        // Update both 'Out' and 'Price' fields in the database
        const update=await TopLaserDataEntryModel.updateOne({_id:req.params.id},{Out:0,Price:OutNew,Note:"✔"})
        .then(()=>{
            res.redirect('/Top-Laser-Saturday');
        })
    } catch (error) {
        console.error("Error updating data:", error);
        res.status(500).send("Internal Server Error");
    }
});
server.post('/Top-Laser-Monthely/:id', async (req, res) => {
    const id = req.params.id;
    const OutNew = req.body.OutNew; // Assuming OutNew is sent in the request body
    // const price = req.body.price; // Assuming price is sent in the request body
    try {
        // Update both 'Out' and 'Price' fields in the database
        const update=await TopLaserDataEntryModel.updateOne({_id:req.params.id},{Out:0,Price:OutNew,Note:"✔"})
        .then(()=>{
            res.redirect('/Top-Laser-Monthely');
        })
    } catch (error) {
        console.error("Error updating data:", error);
        res.status(500).send("Internal Server Error");
    }
});











    // delete request

    server.delete('/Top-Laser-DataEntry/:date/:id', async (req,res)=>{
        const date=req.params.date
        const id=req.params.id
        const delet= await TopLaserDataEntryModel.findByIdAndDelete(req.params.id)
        .then(()=>{
            res.redirect("/Top-Laser-DataEntry/"+`${date}`)
        })
    })


    server.delete('/Top-Laser-Monthely/:id', async (req,res)=>{
        const date=req.params.date
        const id=req.params.id
        const delet= await TopLaserDataEntryModel.findByIdAndDelete(req.params.id)
        .then(()=>{
            res.redirect("/Top-Laser-Monthely/")
        })
    })


    server.delete('/Top-Laser-Saturday/:id', async (req,res)=>{
        const date=req.params.date
        const id=req.params.id
        const delet= await TopLaserDataEntryModel.findByIdAndDelete(req.params.id)
        .then(()=>{
            res.redirect("/Top-Laser-Saturday")
        })
    })








    // server.get("/Top-Laser-Monthely", async (req,res)=>{
    //     const DateArray= await TopLaserLoginModel.find()
    //     const DataArray= await TopLaserDataEntryModel.find()
    //     res.render('Monthely-Data',{moment:moment,arr2:DataArray,arr:DateArray})
    // })



    // test search

    server.get("/Top-Laser-Search",isAuthenticated,async (req,res)=>{
        const DataArray=await TopLaserDataEntryModel.find()
        const DateArray= await TopLaserLoginModel.find()
        const result=req.params.result
        res.render('search',{moment:moment,arr:DataArray,arr2:DateArray,result:result})

    })



    server.post('/Top-Laser-Search', async (req, res) => {
        try {
            const result = req.body.search;
            const searchData = await TopLaserDataEntryModel.find({ Name: result });
            console.log(result)
            if (searchData!=''){
                res.render('search', { arr: searchData, moment: moment,result:result });
            }
            else{
                res.redirect("/Top-Laser-Search")
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    });


    server.delete('/Top-Laser-Search/:id', async (req,res)=>{
        const date=req.params.date
        const id=req.params.id  
            const delet= await TopLaserDataEntryModel.findByIdAndDelete(req.params.id)
            .then(()=>{
                res.redirect("/Top-Laser-Search")
            })
        
    })
    server.post('/Top-Laser-Search/:id', async (req, res) => {
        const id = req.params.id;
        const OutNew = req.body.OutNew; // Assuming OutNew is sent in the request body
        // const price = req.body.price; // Assuming price is sent in the request body
        try {
            // Update both 'Out' and 'Price' fields in the database
            const update=await TopLaserDataEntryModel.updateOne({_id:req.params.id},{Out:0,Price:OutNew,Note:"✔"})
            .then(()=>{
                res.redirect('/Top-Laser-Search');
            })
        } catch (error) {
            console.error("Error updating data:", error);
            res.status(500).send("Internal Server Error");
        }
    });
    
    server.put('/Top-Laser-Search/:id/:price/:out', async (req,res)=>{
        const date=req.params.date
        const DataOut=req.params.out
        const DataPrice=req.params.price
        const update=await TopLaserDataEntryModel.updateOne({_id:req.params.id},{Out:0,Price:DataOut,Note:"✔"})
        .then(()=>{
            console.log(DataPrice);
            console.log(DataOut);
            res.redirect('/Top-Laser-Search')
        })
        .catch((err)=>{
            console.log(err);
        })
    })



    // SignUp GET
    server.get("/Top-Laser-SignUp",async (req,res)=>{
        res.render('SignUp')
    })


    //SignUp POST
    server.post('/Top-Laser-SignUp',async (req,res)=>{
        const UserName=req.body.UserName
        const Password=req.body.Password
            const client =await connectToMongo()
            // const maindb=client.db('TopLaser')
            // const collection=maindb.collection('toplasersignups')
            const maindb='TopLaser'
            const array=await TopLaserSignUpModel.findOne({UserName})
            if(array){
                console.log('User Already exist ❌')
                res.redirect('Top-Laser-SignUp')
            }
        else{
            const TopLaserSignUpModelUse=new TopLaserSignUpModel(req.body)
            TopLaserSignUpModelUse.save()
            const usercollectionname=`user_${UserName.replace(/\s+/g, '_')}_${Date.now()}}`
            const usercollection=client.db('TopLaser').collection(usercollectionname)
            console.log(`Collection '${usercollectionname}' created.`);
            await usercollection.insertOne({ UserName, Password });
            console.log('User data inserted into user collection.');
            res.redirect('Top-Laser-Loginn')
        }    
        })





    // Loginn GET
    server.get("/",async (req,res)=>{
        req.session.destroy(err=>{
            if(err){
                console.error("Error destroying session:", err);

            }
            else{
                res.render('Loginn')

            }
        })
    })


    //Loginn POST
    server.post('/Top-Laser-Loginn',async (req,res)=>{
        const UserName=req.body.UserName
        const Password=req.body.Password
        const array=await TopLaserSignUpModel.findOne({UserName})
        if(array){
            if(array.Password==Password){
                req.session.userId=array._id
                console.log(array._id)
                console.log(req.session.UserId)
                res.redirect('/Top-Laser-Login')
                console.log("Login Successful ✔")  
                console.log(req.body)
            }
            else{
                console.log("UserName or password dosen't exist ❌")
                res.redirect('Top-Laser-Loginn')
            } }  
        else{
            console.log("UserName or password dosen't exist ❌")
            res.redirect('Top-Laser-Loginn')
        }   

    })


