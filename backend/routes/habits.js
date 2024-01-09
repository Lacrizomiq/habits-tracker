
import {
    getHabits, getTodayHabits, addHabit, updateHabit
} from '../habits.helper.js'

export async function habitsRoute(fastify) {
    fastify.get('/', async (request, reply) => {
        reply.send(getHabits())
    })
    fastify.post("/", async (request, reply) => {
        const {title} = request.body
        if(!title) return request.status(400).send({ error : "Title is required" })

        const newHabit = addHabit(title)
        reply.send(newHabit)
    })
    fastify.patch('/:id', async (request, reply) => {
        const { id } = request.params
        const { done } = request.body

        if(typeof done !== 'boolean') return reply.status(400).send({ error: "Done status is required" })

        const success = updateHabit(Number(id), done)
        if(!success) return reply.status(404).send({ error: "Habit not found"})

        reply.send({success: true})
    })

    fastify.get('/today', async (request, reply) => {
        reply.send(getTodayHabits())
    })
}