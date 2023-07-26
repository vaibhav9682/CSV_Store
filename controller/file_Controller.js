const fs = require('fs');
const mongoose = require('mongoose');
const csvParser = require('csv-parser');
const { Readable } = require('stream');
const csv = require('../model/csv')


// to upload the file
module.exports.upload = async (req, res) => {

    try {
        const fileBuffer = req.file.buffer;
        const size = formatBytes(req.file.size)
        const results = await parseCSV(fileBuffer);

        await csv.create({
            fileName: req.body.fileName,
            data: results,
            size: size
        })

    } catch (error) {
        console.error('Error processing CSV:', error);
    }

    return res.redirect('/')
}

// to calculate the file size
function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// to parse the csv data
function parseCSV(fileBuffer) {
    return new Promise((resolve, reject) => {
        const results = [];

        const readableStream = new Readable();
        readableStream.push(fileBuffer);
        readableStream.push(null);

        readableStream
            .pipe(csvParser())
            .on('data', (data) => results.push(data))
            .on('end', () => {

                resolve(results);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}


// dashboard
module.exports.dashboard = async (req, res) => {

    const files = await csv.find({})


    return res.render('dashboard', {
        files: files
    })

}

// data sheet 
module.exports.dataSheet = async (req, res) => {
    let id = req.params.id
    const file = await csv.findById(id)
    // console.log(file)
    const dataObj = file.data[0]
    let headerArr = []
    for (key in dataObj) {
        headerArr.push(key);
        // console.log(key)
    }

    return res.render('dataSheet', {
        fileName: file.fileName,
        data: file.data,
        size: file.size,
        head: headerArr,

    })
}


// delete the selected file
module.exports.delete = async (req, res) => {

    let id = req.params.id
    await csv.findByIdAndDelete(id)

    return res.redirect('back')
}

