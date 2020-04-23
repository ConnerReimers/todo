const HttpError = require('../models/http-error');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken');

const signUp = async (req, res, next) => {
    const errors = validationResult(req)
    
    
    if(!errors.isEmpty()){
        const err = new HttpError('Invalid inputs passed....', 500)
        return next(err)
    }

    const {email, password, name} = req.body;
    let existingUser;

    try {
        existingUser = await User.findOne({ email: email})
    } catch(error) {
        const err = new HttpError('Signing up failed..', 500);
        return next(err)
    }

    if (existingUser) {
        const error = new HttpError('This user already exists.. Go to the Login page', 422);
        return next(error)
    }

    let hashedPass;
    try {
        hashedPass = await bcrypt.hash(password, 12);
    } catch (error) {
        const err = new HttpError('Couldnt hash the pass', 500);
        return next(err)
    }

    const createdUser = new User({
        name,
        email,
        password: hashedPass
    })

    try {
        await createdUser.save()
    } catch (err) {
        const error = new HttpError('Signing up failed. idk what went wrong', 500)
        return next(error)
    }

    let token;
    try {
        token = jwt.sign(
            {userId: createdUser.id, email: createdUser.email},
            'dontshare', 
            {expiresIn: '1h'})
    }catch (err) {
        const error = new HttpError('Signing up help. idk what went wrong', 500)
        return next(error)
    }

    res.status(201).json({token: token, name: createdUser.name, email: createdUser.email, userId: createdUser.userId})
}

const login = async (req, res, next) => {
    const {email, password} = req.body;


    // CHECK THE USER NAME
    let existingUser;
    try {
        existingUser = await User.findOne({email: email})
    }
    catch(err) {
        const error = new HttpError('Something went wrong', 500);
        return next(error)
    }

    if (!existingUser) {
        const error = new HttpError('No user with that email found', 500);
        return next(error)
    };

    // CHECK THE PASSWORD
    
    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password)

    } catch(err){
        const error = new HttpError('Invalid email/password.. failed', 401);
        return next(error);
    }

    if(!isValidPassword) {
        const error = new HttpError('That password is not correct', 500);
        return next(error)
    }
    let token;
    try {
        token = jwt.sign(
            {userId: existingUser.id, email: existingUser.email},
            'dontshare', 
            {expiresIn: '1h'})
    }catch (err) {
        const error = new HttpError('Signing up failed. idk what went wrong', 500)
        return next(error)
    }

    res.json({message: 'Logged In!', token: token, name: existingUser.name, email: existingUser.email, userId: existingUser.id})
}



exports.signUp = signUp
exports.login = login