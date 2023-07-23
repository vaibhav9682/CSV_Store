const fs = require('fs');
const mongoose = require('mongoose');
const csvParser = require('csv-parser');
const { Readable } = require('stream');
const dbSchema = require('../model/csv')

module.exports.upload = async (req, res) => {



    try {
        const fileBuffer = req.file.buffer;
        const results = await parseCSV(fileBuffer);
        await dbSchema.create({
            fileName: req.body.fileName,
            data: results
        })

    } catch (error) {
        console.error('Error processing CSV:', error);
    }

    return res.redirect('/')
}

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

module.exports.dashboard = (req, res) => {

    return res.render('dashboard')

}
