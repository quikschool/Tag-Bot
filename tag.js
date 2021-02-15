const mongo = require('./mongo');
const tagSchema = require('./schemas/tag-schema');

const tagsCache = {}

module.exports = (client) => {};

module.exports.readTag = async (readName, readGuild) => {
    const cachedTag = tagsCache[`${readName}-${readGuild}`]
    if (cachedTag) {
        return cachedTag;
    }

    return await mongo().then(async (mongoose) => {
        try {
            console.log('Running findOne()');

            const result = await tagSchema.findOne({
                tagName: readName,
                guildId: readGuild
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
            tagsCache[`${readName}-${readGuild}`] = [tag, info, author];

            return tagsCache[`${readName}-${readGuild}`];
        } finally {
            mongoose.connection.close();
        }
    });
}

module.exports.addTag = async (addName, addContent, addInfo, addAuthor, addGuild) => {
    return await mongo().then(async (mongoose) => {
        try {
            const existing = await tagSchema.findOne({
                tagName: addName,
                guildId: addGuild
            });
            if (existing) {
                return null;
            }
            
            if (addInfo === null) {
                newTag = await new tagSchema({
                    tagName: addName,
                    tag: addContent,
                    tagAuthor: addAuthor,
                    guildId: addGuild
                }).save();
            } else {
                newTag = await new tagSchema({
                    tagName: addName,
                    tag: addContent,
                    tagInfo: addInfo,
                    tagAuthor: addAuthor,
                    guildId: addGuild
                }).save();
            }

            let addStatus = "fail";

            if (newTag) {
                addStatus = "success";
            } else {
                return "fail";
            }

            tagsCache[`${addName}-${addGuild}`] = [addContent, addInfo, addAuthor];

            return addStatus
        } finally {
            mongoose.connection.close();
        }
    });
}

module.exports.deleteTag = async (deleteName, messageAuthor, tagGuild) => {
    return await mongo().then(async (mongoose) => {
        try {
            const deleteResult = await tagSchema.findOne({
                tagName: deleteName,
                tagAuthor: messageAuthor,
                guildId: tagGuild
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
                    tagAuthor: messageAuthor,
                    guildId: tagGuild
                }, function (err, docs) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`Deleted document: ${docs}`);
                    }
                });
                tagsCache[`${deleteName}-${tagGuild}`] = null;
            } else {
                status = "fail";
            }

            return status;
        } finally {
            mongoose.connection.close();
        }
    });
}

module.exports.tagsList = async (guild) => {
    return await mongo().then(async (mongoose) => {
        try {
            const listResult = await tagSchema.find({ guildId:guild }, {
                _id:0,
                tagAuthor:0,
                __v:0
            });
            console.log(listResult);
            return listResult
        } finally {
            mongoose.connection.close();
        }
    });
}