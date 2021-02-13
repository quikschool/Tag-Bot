const { Message } = require('discord.js');
const mongo = require('./mongo');
const { findOne } = require('./schemas/tag-schema');
const tagSchema = require('./schemas/tag-schema');
const Discord = require('discord.js');

const tagsCache = {}

module.exports = (client) => {};

module.exports.readTag = async (readName) => {
    const cachedTag = tagsCache[`${readName}`]
    if (cachedTag) {
        return cachedTag;
    }

    return await mongo().then(async (mongoose) => {
        try {
            console.log('Running findOne()');

            const result = await tagSchema.findOne({
                tagName: readName
            }, function (err, docs) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Read document: ${docs}`);
                }
            });

            console.log('RESULT: ', result);

            if (result) {
                const tag = result.tag;
                const info = result.tagInfo;
                const author = result.tagAuthor;
            } else {
                return null;
            }

            const tag = result.tag
            const info = result.tagInfo
            const author = result.tagAuthor
            tagsCache[`${readName}`] = [tag, info, author];

            return tagsCache[`${readName}`];
        } finally {
            mongoose.connection.close();
        }
    });
}

module.exports.addTag = async (addName, addContent, addInfo, addAuthor) => {
    return await mongo().then(async (mongoose) => {
        try {
            const existing = await tagSchema.findOne({
                tagName: addName,
                tagAuthor: addAuthor
            });
            if (existing) {
                return null;
            }
            
            if (addInfo === null) {
                newTag = await new tagSchema({
                    tagName: addName,
                    tag: addContent,
                    tagAuthor: addAuthor
                }).save();
            } else {
                newTag = await new tagSchema({
                    tagName: addName,
                    tag: addContent,
                    tagInfo: addInfo,
                    tagAuthor: addAuthor
                }).save();
            }

            let addStatus = "fail";

            if (newTag) {
                addStatus = "success";
            } else {
                return "fail";
            }

            tagsCache[`${addName}`] = [addContent, addInfo, addAuthor];

            return addStatus
        } finally {
            mongoose.connection.close();
        }
    });
}

module.exports.deleteTag = async (deleteName, messageAuthor) => {
    return await mongo().then(async (mongoose) => {
        try {
            const deleteResult = await tagSchema.findOne({
                tagName: deleteName,
                tagAuthor: messageAuthor
            },
            function (err, docs) {
                if (err) {
                    console.log(err);
                    return "fail";
                } else {
                    console.log(`Deleted document: ${docs}`);
                }
            });

            console.log('RESULT: ', deleteResult);

            let status = "fail";

            if (deleteResult) {
                status = "success"
                console.log('success!');
                await tagSchema.findOneAndDelete({
                    tagName: deleteName,
                    tagAuthor: messageAuthor
                }, function (err, docs) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`Deleted document: ${docs}`);
                    }
                });
                tagsCache[`${deleteName}`] = null;
            } else {
                status = "fail";
            }

            return status;
        } finally {
            mongoose.connection.close();
        }
    });
}