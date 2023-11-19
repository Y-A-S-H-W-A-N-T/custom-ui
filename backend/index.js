const express = require('express')
const cors = require('cors');
const mongoose=require('mongoose')
require('dotenv').config()

const app = express()
const port = 5000

app.use(express.json())
app.use(cors())

mongoose.connect(`mongodb+srv://UIPersonalization:${process.env.MONGOOSE_PASSWORD}@cluster0.absh9oa.mongodb.net/?retryWrites=true&w=majority`,{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log('connected successful')}).catch((err)=>{
        console.log(err)
})


const userSchema=mongoose.Schema({
    username:{
        type:String
    },
    email:{
        required:true,
        type:String
    },
    password:{
        type:String
    },
   
    buttonBackgroundColor:{
        type:String,
        default: "Blue"
    },
    textColor:{
        type:String,
        default: "Black"
    },
    headerBackgroundColor:{
        type:String,
        default:"white"
    },
    footerBackgroundColor:{
        type:String,
        default:"white"
    },
    radioButtonColor:
    {
        type:String,
        default:"white"
    },
    dropDownButtonColor:{
        type:String,
        default:"white"
    },
    themeColor1:{
        type:String,
        default:"blue",
    },
    themeColor2:{
        type:String,
        default:"red",
    },
    themeColor3:{
        type:String,
        default:"white",
    },
    iconColor:{
        type:String,
        default:"black",
    },
    headerLabel:{
        type: String,
        default: "white"
    },
    label:{
        type: String,
        default: "white"
    },
    paraText:{
        type: String,
        default: "white"
    },
    pref:{
        type: Boolean,
        default: false
    },
    isAdmin:{
        type:Boolean,
        default:false,
    }

},

{
    timestamps:true
});


const colorSchema=mongoose.Schema({
   
    buttonBackgroundColor:{
        type:String,
        default: "Blue"
    },
    textColor:{
        type:String,
        default: "Black"
    },
    headerBackgroundColor:{
        type:String,
        default:"white"
    },
    footerBackgroundColor:{
        type:String,
        default:"white"
    },
    radioButtonColor:
    {
        type:String,
        default:"white"
    },
    dropDownButtonColor:{
        type:String,
        default:"white"
    },
    themeColor1:{
        type:String,
        default:"blue",
    },
    themeColor2:{
        type:String,
        default:"red",
    },
    themeColor3:{
        type:String,
        default:"white",
    },
    iconColor:{
        type:String,
        default:"black",
    },
    headerLabel:{
        type: String,
        default: "white"
    },
    label:{
        type: String,
        default: "white"
    },
    paraText:{
        type: String,
        default: "white"
    },
    isAdmin:{
        type:Boolean,
        default:false,
    }
},

{
    timestamps:true
});

const User=new mongoose.model('User', userSchema);
const Color=new mongoose.model('Color', colorSchema);

app.post('/onlyColors',async(req,res)=>{
    try {

        await Color.updateMany(
            {_id: `6557387bbfffe99f7d180bbe`},
            { $set: { 
                    buttonBackgroundColor: req.body.buttonbackgroundColor,
                    textColor: req.body.textColor, 
                    headerBackgroundColor:req.body.headerBackgroundColor,
                    footerBackgroundColor:req.body.footerBackgroundColor,
                    radioButtonColor:req.body.radioButtonColor,
                    dropDownButtonColor:req.body.dropDownButtonColor,
                    themeColor1:req.body.themeColor1,
                    themeColor2:req.body.themeColor2,
                    themeColor3:req.body.themeColor3,
                    iconColor:req.body.iconColor,
                    headerLabel: req.body.headerLabel,
                    label: req.body.label,
                    paraText: req.body.paraText,
                } 
            }
        );
        res.status(200).json({ msg: 'Update successful' });
    }catch (error) {
        console.error('Error:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }

})
app.post('/register', async(req, res) => {
    console.log(req.body);
    const newEmail=await User.findOne({email:req.body.email});
    
    if(!newEmail){
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
          });
        
         const result= newUser.save()
            if(result){
              res.status(200).json({ msg: "Success" });
            }
            else {
              console.log('Error Saving User:', err);
              res.status(500).json({ msg: "Error" });
            }

    }else{
        res.status(300).json({ msg: "Email Already Exist!" });
    }
  });

  

app.post("/login",async(req,res)=>{
    console.log("This is the login:",req.body)
    const result=await User.findOne({email:req.body.email});
    console.log(result)
    if(!result)
    {
      res.status(404).json({msg:"Not registered"})
    }
    else
    { 
        if(result.password==req.body.password)
        {
            res.status(200).json({id:result._id})
        }
        else
        {
            res.status(400).json({msg:"Wrong Password"})
        }

    } })
  

app.post('/colors', async (req, res) => {
    try {
        await User.updateMany(
            {_id: req.body.userId},
            { $set: { 
                    buttonBackgroundColor: req.body.buttonbackgroundColor,
                    textColor: req.body.textColor, 
                    headerBackgroundColor:req.body.headerBackgroundColor,
                    footerBackgroundColor:req.body.footerBackgroundColor,
                    radioButtonColor:req.body.radioButtonColor,
                    dropDownButtonColor:req.body.dropDownButtonColor,
                    themeColor1:req.body.themeColor1,
                    themeColor2:req.body.themeColor2,
                    themeColor3:req.body.themeColor3,
                    iconColor:req.body.iconColor,
                    headerLabel: req.body.headerLabel,
                    label: req.body.label,
                    paraText: req.body.paraText,
                    pref: req.body.pref
                } 
            }
        );
        res.status(200).json({ msg: 'Update successful' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});


app.post('/changeAll', async (req, res) => {
    try {
        await User.updateMany(
            {},
            { $set: { 
                    buttonBackgroundColor: req.body.buttonbackgroundColor,
                    textColor: req.body.textColor, 
                    headerBackgroundColor:req.body.headerBackgroundColor,
                    footerBackgroundColor:req.body.footerBackgroundColor,
                    radioButtonColor:req.body.radioButtonColor,
                    dropDownButtonColor:req.body.dropDownButtonColor,
                    themeColor1:req.body.themeColor1,
                    themeColor2:req.body.themeColor2,
                    themeColor3:req.body.themeColor3,
                    iconColor:req.body.iconColor,
                    headerLabel: req.body.headerLabel,
                    label: req.body.label,
                    paraText: req.body.paraText,
                } 
            }
        );
        res.status(200).json({ msg: 'Update successful' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});


app.get('/user/:id',async(req,res)=>{
    const userId = req.params.id
    const result=await User.findOne({_id:userId});
    res.json(result).status(200)
});

app.get('/onlyColors',async(req,res)=>{
    const userId = `6557387bbfffe99f7d180bbe`
    const result=await Color.findOne({_id:userId});
    res.json(result).status(200)
});

app.post('/changePref',async(req,res)=>{
    try{
        await User.updateMany(
            {},
            { $set: { 
                    pref: false
                } 
            }
        );
    }
    catch(err){
        console.log("Not able to change Preference")
    }
})






const server=app.listen(port,()=>{
        console.log("Server running at ",port)
})





module.exports = { app, server, User};