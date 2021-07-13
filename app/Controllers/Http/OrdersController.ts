import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from 'App/Models/Customer'
import Order from 'App/Models/Order'

export default class OrdersController {
    public async index({ response }: HttpContextContract) {
        const order = await Order.all()
        if (order.length > 0) {
            return response.status(200).json(order)
        } else {
            return response.status(201).json({
                message: 'No order'
            })
        }
    }

    public async show({ response, params }: HttpContextContract) {
        const no = params.no
        const order = await Order.find(no)

        if (order) {
            return response.json(order)
        } else {
            return response.json({
                message: `Order no = ${no} is not available `
            })
        }
    }

    public async store({ request, response }: HttpContextContract) {
        const total_amount = request.input('total_amount')
        const customer_id = request.input('customer_id')
        const customber = await Customer.find(customer_id)
        if (customber) {
            const order = await Order.create({
                total_amount: total_amount,
                customer_id: customer_id
            })
            return response.json({
                message: 'your order send',
                order: order
            })
        }else{
            return response.json({
                message: 'This customber is not available'
            })
        }
    }

    public async destroy({params,response}:HttpContextContract){
        const no = params.no
        const order =  await Order.find(no)
        if(order)
        {
            order.delete()
            return response.json({
                message:`order is cancel`
            })
        }
        else{
            return response.json({
                message:'This is order is not available'
            })
        }
    }

    public async edit({response,params}:HttpContextContract){
        const no = params.no
        const order = await Order.find(no)
        if(order){
            const amount = params.total_amount
            order.total_amount = amount
            await order.save()
            return response.json({
                massage:`Order No = ${no} is updated`,
                order:order
            })
        }else{
            return response.json({
                message:`Order No= ${no} is not available`
            })
        }
    }
}