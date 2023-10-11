const knex = require("../database/knex")

class OrdersController{
    async create(request, response){
        const { descriptions } = request.body;
        const user_id = request.user.id;

        const [order_id] = await knex("orders").insert({
            details: descriptions,
            user_id,
            status: "Pendente"
        });

        return response.json({ id: order_id });
    }

    async delete(request, response){
        const { id } = request.params

        await knex("orders").where({ id }).delete()

        return response.json()
    }

    async index(request, response){
        const user_id = request.user.id;

        const orders = await knex("orders")
        .where({ user_id })

        return response.json(orders)
    }
}

module.exports = OrdersController;