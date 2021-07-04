const sequelize = require("../db");
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Korzina = sequelize.define('korzina', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const KorzinaDevice = sequelize.define('korzina_device', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Devices = sequelize.define('devices', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false}
})

const Type = sequelize.define('type', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Brand = sequelize.define('brand', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Rating = sequelize.define('rating', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
})

const DeviceInfo = sequelize.define('device_info', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const Type_Brand = sequelize.define('type_brand', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

User.hasOne(Korzina);
Korzina.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Korzina.hasMany(KorzinaDevice);
KorzinaDevice.belongsTo(Korzina);

Type.hasMany(Devices);
Devices.belongsTo(Type);

Brand.hasMany(Devices);
Devices.belongsTo(Brand);

Devices.hasMany(Rating);
Rating.belongsTo(Devices);

Devices.hasMany(KorzinaDevice);
KorzinaDevice.belongsTo(Devices);

Devices.hasMany(DeviceInfo, {as:'info'});
DeviceInfo.belongsTo(Devices);

Type.belongsToMany(Brand, {through: Type_Brand});  //need additional table
Brand.belongsToMany(Type, {through: Type_Brand});

module.exports = {
    User, Korzina, KorzinaDevice, 
    Devices, DeviceInfo, Type, Brand,
    Rating, Type_Brand
}