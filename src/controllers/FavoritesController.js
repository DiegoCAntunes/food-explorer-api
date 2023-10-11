const knex = require("../database/knex")

class FavoritesController{
    async create(request, response){
        const plate = request.body;
        const user_id = request.user.id;

        const [favorite_id] = await knex("favorites").insert({
            plate,
            user_id
        });

        return response.json({ id: favorite_id });
    }

    async delete(request, response){
        const { id } = request.params

        await knex("favorites").where({ id }).delete()

        return response.json()
    }

    async index(request, response){
        const user_id = request.user.id;

        const favorites = await knex("favorites")
        .where({ user_id })

        return response.json(favorites)
    }

}

module.exports = FavoritesController;