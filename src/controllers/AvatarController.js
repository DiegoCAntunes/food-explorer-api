const knex = require("../database/knex")
const DiskStorage = require("../providers/DiskStorage")

class AvatarController{
    async update(request, response){
        const { id } = request.params;
        const avatarFilename = request.file.filename

        const diskStorage = new DiskStorage()

        const plate = await knex("plates")
            .where({ id: id }).first()

        if(plate.avatar){
            await diskStorage.deleteFile(user.avatar)
        }

        const filename = await diskStorage.saveFile(avatarFilename)
        plate.avatar = filename
        
        await knex("plates").update(plate).where({ id: id})

        return response.json(plate)
    }
}

module.exports = AvatarController