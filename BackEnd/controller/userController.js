const ErrorApi = require("../error/errorAPI");
const { User, Korzina } = require("../models/models");
const crypt = require('bcrypt');
const jwtoken = require('jsonwebtoken');
require('dotenv').config();


const genJwt = (id, email, role) => {
   return jwtoken.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async signup(req ,res, next){
        const {email, password, role} = req.body;
        if(!email || !password){
            return next(ErrorApi.notFound('Пароль или email некореткный'));
        }

        const mail = await User.findOne({where:{email}});
        if(mail){
            return next(ErrorApi.notFound('Пользователь с такой почтой уже существует')); 
        }

        const passwordHash = await crypt.hash(password, 5);
        const user = await User.create({email, role, password:passwordHash});
        const korzina = await Korzina.create({userId: user.id});
        const jwebToken = genJwt(user.id, user.email, user.role);
        return res.json({jwebToken});
    }

    async login(req ,res, next){
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}});
        if(!user){
            return next(ErrorApi.notFound('User not found'));
        }
        let comparePas = crypt.compareSync(password, user.password);
        if(!comparePas) {
            return next(ErrorApi.notFound('Invalid password'));
        }
        const token = genJwt(user.id, user.email, user.role);
        return res.json({token});
    }

    async check(req ,res){
        const jwebToken = genJwt(user.id, user.email, user.role); 
        res.json({jwebToken});
    }
}

module.exports = new UserController();