
import { addHabit, getHabits, getTodayHabits, updateHabit } from "../habits.helper.js"


export async function habitsRoute (fastify) {

    fastify.get('/', async (request, reply) => {
        
        try {
            const habits = await getHabits()
            return habits
        } catch (e) {
            reply.code(400).send({
                error: e.message,
            })
        }

    })

    fastify.get("/today", async (request, reply) => {
       
        try {
            const todayHabits = await getTodayHabits()
            return todayHabits
        } catch (e) {
            reply.code(400).send({
                error: e.message,
            })
        }
    })

    fastify.post('/', async (request, reply) => {
        const body = request.body
        if(body.title === undefined) {
            reply.code(400).send({
                error: "Title is required in the body"
            })
        }

        try {
            const newHabit = await addHabit(body.title)
            return newHabit
        } catch (e) {
            reply.code(400).send({
                error: "Title is required in the body"
            })
        }
        
    })

    fastify.patch('/:habitId', async (request, reply) => {
        const body = request.body
        if(body.done === undefined) {
            reply.code(400).send({
                error: "Done is required in the body"
            })
        }

        if(typeof body.done !== "number") {
            reply.code(400).send({
                error: "done value in the body must be a boolean"
            })
        }

        const habitId = Number(request.params.habitId)
        if(!habitId || Number.isNaN(habitId)) {
            reply.code(400).send({
                error: "habitId must be a number"
            })
        }

        try {
            const updatedHabit = await updateHabit(habitId, body.done)
            return updatedHabit
        } catch (e) {
            reply.code(400).send({
                error: "habitId must be a number"
            })
        }
    })

}