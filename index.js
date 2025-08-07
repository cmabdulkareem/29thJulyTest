import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import { fileURLToPath } from 'url';
import path,{ dirname } from 'path';
import {config} from 'dotenv'
config()

import Razorpay from 'razorpay'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload())
app.use(express.static('public'))

mongoose.connect('mongodb://localhost:27017/987')
    .then(()=>console.log('Connected to DB'))
    .catch((err)=>console.log(err))


const userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    role: {type: String, default: 'user'}
})
const User = mongoose.model('User', userSchema)

const productSchema = new mongoose.Schema({
    itemName: String,
    itemDesc: String,
    itemPrice: String,
})
const Product = mongoose.model('Product', productSchema)

const CartSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', },
    products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}]
})

const Cart = mongoose.model('Cart', CartSchema)


// const CartSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
//   products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
// });

// const Cart = mongoose.model("Cart", CartSchema)


app.post('/register', async (req, res)=>{
    const {fullName, email, password} = req.body

    try {
        if(!fullName || !email || !password){
            return res.status(400).json('All fields are required')
        }
        let userExisting = await User.findOne({email})
        if(userExisting){
            return res.status(400).json('User already exists')
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({fullName, email, password: hashedPassword})
        return res.status(201).json("User created successfully")
    } catch (error) {
        return res.status(500).json("internal server error")
    }
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json('User not found');
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json('Invalid password');
      }
      let token = jwt.sign({ id: user._id }, 'secret');
      res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'lax' });
      return res.status(200).json({message:'Login successful', role: user.role, user});
    } catch (error) {
      return res.status(500).json('Internal server error');
    }
})

function verifyToken(req, res, next) {
  const {token} = req.cookies;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, 'secret'); // same secret used to sign
    req.user = decoded; // Add user info to request
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

app.get('/user', verifyToken, async(req, res)=>{
    try {
        const user = await User.findById(req.user.id)
        return res.status(200).json({user, role: user.role})
    } catch (error) {
        return res.status(500).json('Internal server error')
    }
})

app.get('/logout', (req, res)=>{
    res.clearCookie('token', { httpOnly: true, secure: false, sameSite: 'lax' })
    return res.status(200).json('Logout successful')
})

function generateOTP(){
    return Math.floor(1000 + Math.random() * 9000)
}

app.post('/forgotpw', verifyToken, async (req, res) => {
    const { email } = req.body;
    try {
        if(!email){
            return res.status(400).json('Email is required')
        }
        const foundUser = await User.findOne({email})
        if(!foundUser){
            return res.status(404).json('User not found')
        }
        let otp = generateOTP()
        res.status(200).json({otp})
    } catch (error) {
        res.status(500).json('Internal server error')
    }
})



app.post('/addproduct', verifyToken, async(req, res)=>{
    const {name, description, price} = req.body
    const {image} = req.files
    try {
        if(!name || !description || !price || !image){
            res.status(400).json("all fields are required")
        }
        let product = await Product.create({itemName: name, itemDesc: description, itemPrice: price})
        image.mv(path.join(__dirname, 'public', `images`, `products`, `${product._id}.jpg`))
        return res.status(201).json("Product added successfully")
    } catch (error) {
        return res.status(500).json("Internal server error")
    }
})

app.get('/products', verifyToken, async(req, res)=>{
    try {
        let products = await Product.find({})
        return res.status(200).json(products)
    } catch (error) {
        return res.status(500).json("Internal server error")
    }
})

app.get('/getallproducts', verifyToken, async(req, res)=>{
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json("Internal server error")
    }
})


app.get('/getproduct/:id', async(req, res)=>{
    const {id} = req.params

    try{
        let product = await Product.findById(id)
        return res.status(200).json(product)
    } catch (error) {
        return res.status(500).json("Internal server error")
    }
})

app.put('/updateproduct', verifyToken, async(req, res)=>{
    const {name, description, price, id} = req.body
    const {image} = req.files
    
    try {
        if(!name || !description || !price || !image){
            res.status(400).json("all fields are required")
        }
        let updatedProduct = await Product.findByIdAndUpdate(id, {
            itemName: name, 
            itemDesc: description, 
            itemPrice: price}, {new: true})
        image.mv(path.join(__dirname, 'public', `images`, `products`, `${updatedProduct._id}.jpg`))
        return res.status(200).json("Product updated successfully")
    } catch (error) {
        res.status(500).json("Internal server error")
    }
})


app.delete('/deleteproduct/:id', verifyToken, async(req, res)=>{
    const {id} = req.params
    try {
        const deletedItem = await Product.findByIdAndDelete(id)
        res.status(200).json("item deleted succesfully")
    } catch (error) {
        res.status(500).json("internal server error")
    }
})


app.post('/addtocart/:productId', verifyToken, async(req, res)=>{
    const {productId} = req.params
    console.log()
    const userId = req.user.id
    
    const updateOperation = {
        $addToSet: {products: productId}
        // will add items to the array and prevent if duplicates found
    }

    try {
        const updatedCart = await Cart.findOneAndUpdate(
            {user: userId}, 
            updateOperation, 
            {upsert: true, new: true})
            // upsert : If no document matches the query, a new one will be created
            // new: true (to make sure updated cart data is returned instead of the)
        res.status(200).json(updatedCart)
    } catch (error) {
        res.status(500).json("internal server error")
    }
})



const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})



// app.post('/addtocart/:id', verifyToken, async (req, res) => {
//     const productId = req.params.id;
//     const userId = req.user.id;

//     const updateOperation = {
//         $addToSet: { products: productId } // Prevents duplicates
//     };

//     try {
//         const updatedCart = await Cart.findOneAndUpdate(
//             { user: userId },
//             updateOperation,
//             { upsert: true, new: true }
//         );
//         res.status(200).json(updatedCart);
//     } catch (err) {
//         res.status(500).json({ error: "Error adding product to cart" });
//     }
// });



app.listen(3000, () => console.log('Server is running on port 3000'))