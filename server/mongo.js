const mongoose=require('mongoose');

require('dotenv').config();

mongoose.connect("mongodb+srv://aatmkanaiyali:aatmky2024@kanaiyali.ziyps.mongodb.net/?retryWrites=true&w=majority&appName=Kanaiyali").then(()=>{
    console.log('database connected...');
}).catch((err)=>{
    console.log(err)
})

const eventSchema=new mongoose.Schema({
    title: String,
    subtitle: String,
    authorName: String,
    date: String,
    content: String,
    photos: [String],
})

const oviyamSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    date: String,
    authorName: String,
    content: String,
    photos: [String],
})

const sirukadhaiSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    date: String,
    authorName: String,
    content: String,
    photos: [String],
})

const puthagamSchema=new mongoose.Schema({
    title: String,
    subtitle: String,
    authorName: String,
    date: String,
    content: String,
    photos: [String],
})

const vasanamSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    date: String,
    authorName: String,
    content: String,
    photos: [String],
})

const vidukadhaiSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    date: String,
    authorName: String,
    content: String,
    photos: [String],
})

const naatkurippuSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    date: String,
    authorName: String,
    content: String,
    photos: [String],
})

const eventModel=mongoose.model('kavithai',eventSchema);
const oviyamModel = mongoose.model('oviyam', oviyamSchema);
const sirukadhaiModel = mongoose.model('sirukadhai', sirukadhaiSchema);
const puthagamModel = mongoose.model('puthagam', puthagamSchema);
const vasanamModel = mongoose.model('vasanam', vasanamSchema);
const vidukadhaiModel = mongoose.model('vidukadhai', vidukadhaiSchema);
const naatkurippuModel = mongoose.model('naatkurippu', naatkurippuSchema);

module.exports = { eventModel, oviyamModel, sirukadhaiModel, puthagamModel, vasanamModel, vidukadhaiModel, naatkurippuModel};