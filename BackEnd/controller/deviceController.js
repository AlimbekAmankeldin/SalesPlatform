const { Devices, DeviceInfo } = require("../models/models");
const Uid = require('uuid');
const path = require('path');
const ErrorApi = require("../error/errorAPI");

class ProductController {
    async create(req ,res, next){
        try {
            let {name, price, brandId, typeId, info} = req.body;
            const {img} = req.files;
            let filename = Uid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'public/img', filename));
            const product = await Devices.create({name, price, brandId, typeId, img:filename});
            
            if(info) {
                info = JSON.parse(info);
                info.forEach(el => 
                    DeviceInfo.create({
                        title: el.title,
                        description: el.description,
                        deviceId: product.id
                    })
                )
            }
            
            return res.json(product);
        } catch (error) {
            next(ErrorApi.notFound(error.message));
        }
      
    }

    async getAll(req ,res){
        let {brandId, typeId, limit, pages} = req.query;
        pages = pages || 1;
        limit = limit || 9;
        let offset = pages*limit -limit;
        let devices;
        if(!brandId && !typeId){
            devices = await Devices.findAndCountAll({limit, offset});
        }
        if(brandId && !typeId){
            devices = await Devices.findAndCountAll({where:{brandId}, limit, offset});
        }
        if(!brandId && typeId){
            devices = await Devices.findAndCountAll({where:{typeId}, limit, offset});
        }
        if(brandId && typeId) {
            devices = await Devices.findAndCountAll({where:{typeId, brandId}, limit, offset});
        }
        return res.json(devices)
    }

    async getOne(req ,res){
        const {id} = req.params;
        const product = await Devices.findOne(
            {
                where:{id},
                include: [{model: DeviceInfo, as: 'info'}]
            }, 
        )
        return res.json(product);
    }
}

module.exports = new ProductController();