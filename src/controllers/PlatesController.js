const knex = require("../database/knex")

class PlatesController{
    async create(request, response){
        const { name, description, ingredients, category, price } = request.body;

        const [plate_id] = await knex("plates").insert({
            name,
            description,
            category,
            price
        });

        const ingredientsInsert = ingredients.map(name => {
            return{
                plate_id,
                name
            }
        })

        await knex("ingredients").insert(ingredientsInsert)

        return response.json({ id: plate_id });
    }

    async update(request, response) {
        const { name, description, category, price, ingredients } = request.body;
        const { id } = request.params;
    
        // Update the plate details
        await knex("plates")
            .where({ id: id })
            .update({
                name: name,
                description: description,
                category: category,
                price: price
            });
    
        // Delete existing ingredients associated with this plate
        await knex("ingredients")
            .where({ plate_id: id })
            .del();
    
        // Insert new ingredients associated with this plate
        await knex("ingredients").insert(
            ingredients.map(ingredient => ({ name: ingredient, plate_id: id }))
        );
    
        return response.json();
    }

    async show(request, response){
        const { id } = request.params;

        const plate = await knex("plates").where({ id }).first()
        const ingredients = await knex("ingredients").where({ plate_id: id }).orderBy("name")

        return response.json({
            ...plate,
            ingredients
        })
    }

    async delete(request, response){
        const { id } = request.params

        await knex("plates").where({ id}).delete()

        return response.json()
    }

    async index(request, response){
        const { name, ingredients } = request.query

        let platesQuery = knex('plates')
        .whereLike('plates.name', `%${name}%`);

    if (ingredients) {
        const ingredientQuery = knex('plates')
            .whereExists(function() {
                this.select(knex.raw(1))
                    .from('ingredients')
                    .whereRaw('ingredients.plate_id = plates.id')
                    .andWhere('ingredients.name', 'like', `%${ingredients}%`);
            });

        platesQuery = platesQuery.union(ingredientQuery);
    }

    const plates = await platesQuery;

        const userIngredients = await knex("ingredients")
        
        const platesWithIngredients = plates.map(plate => {
            const plateIngredients = userIngredients.filter(ingredient => ingredient.plate_id === plate.id)

            return{
                ...plate,
                ingredients: plateIngredients
            }
        })

        return response.json(platesWithIngredients)
    }

}

module.exports = PlatesController;