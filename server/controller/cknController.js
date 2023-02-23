
const CknItemModel = require("../models/cknItemModel");
const CounterModel = require("../models/counterModel");
const express = require("express");
const CounterNoModel = require("../models/counterNumModel");
const UserModel = require("../models/userModel");
const bcrypt = require('bcrypt');



app = express();

exports.setCknItems = (req, res) => {
    CounterModel.findOneAndUpdate(
        { id: "autoVal" },
        { "$inc": { "sequence": 1 } },
        { new: true }, (err, cd) => {
            let seqId;
            if (cd === null) {
                const newVal = new CounterModel({ id: "autoVal", sequence: 1 })
                newVal.save();
                seqId = 1;
            }
            else {
                seqId = cd.sequence
            }
            CounterNoModel.findOneAndUpdate(
                { id: "autoValNo" },
                { "$inc": { "sequenceNo": 1 } },
                { new: true }, (err, cd) => {
                    let seqNo;
                    if (cd === null) {
                        const newValNo = new CounterNoModel({ id: "autoValNo", sequenceNo: 1 })
                        newValNo.save();
                        seqNo = 1;
                    }
                    else {
                        seqNo = cd.sequenceNo
                    }
                    try {
                        const cknFiles = new CknItemModel({

                            orderId: seqId,
                            orderNo: seqNo,
                            date: req.body.date,
                            time: req.body.time,
                            chai: req.body.chai,
                            coffee: req.body.coffee,
                            cigarette: req.body.cigarette,
                            cigaretteQuantity: req.body.cigaretteQuantity,
                            chaiQuantity: req.body.chaiQuantity,
                            coffeeQuantity: req.body.coffeeQuantity,
                            orderStatus: req.body.orderStatus,
                            orderTotal: req.body.orderTotal,
                            paymentMode: req.body.paymentMode
                        });
                        cknFiles.save();
                        res.status(200).json({ data: cknFiles });
                    }
                    catch (error) {
                        console.log(error)

                    }
                }
            )
        }
    )



};

exports.getCknItems = async (req, res, next) => {

    try {

        const data = await CknItemModel.find();
        const dataLength = data.length;


        res.send({ "data": data, "dataLength": dataLength });
    } catch (error) {
        res.status(400).send(error.message);
        console.log(error);
    }
}
exports.getCknItemsByDate = async (req, res, next) => {
    const date = req.params.date;
    try {
        const data = await CknItemModel.find({ date: req.query.date });
        const dataLength = data.length;


        // const data=files.slice(startIndex,endIndex);


        res.send({ "data": data, "dataLength": dataLength });
    } catch (error) {
        res.status(400).send(error.message);
        console.log(error);
    }
}
exports.getCknItemsByDateAndStatus = async (req, res, next) => {
    const date = req.params.date;
    try {
        console.log(req.query);
        const data = await CknItemModel.find({ date: req.query.date, orderStatus: req.query.status });

        // const data=files.slice(startIndex,endIndex);


        res.send({ "data": data });
    } catch (error) {
        res.status(400).send(error.message);
        console.log(error);
    }
}
exports.getCknItemsById = async (req, res, next) => {
    try {
        const data = await CknItemModel.find({ _id: req.query.id });

        res.send({ "data": data });
    } catch (error) {
        res.status(400).send(error.message);
        console.log(error);
    }
}
