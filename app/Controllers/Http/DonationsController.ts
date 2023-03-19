import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Donation from 'App/Models/Donation'

export default class DonationsController {

    // Get All Donations
    public async index ({ request, response }: HttpContextContract) {
        const donations = await Donation.all()
        try {
            return donations;
        } catch (error) {
            response.notFound({ message: 'Donations not found' });
        }
    }

    // Create Donation
    public async create ({ request, response, auth }: HttpContextContract) {
        const user = auth.user;
        const { campaign_id, total } = request.body();

        try {
            const donation = await Donation.create({
                user_id: user?.id,
                campaign_id,
                total,
            });
            return donation;
        } catch (err) {
            response.internalServerError({ message: err });
        }
    }

    // Get Donation by ID
    public async show ({ request, response }: HttpContextContract) {
        const id = request.param('id');
    
        const donations = await Donation.query().where('id', id).first();
        if (!donations) {
            response.notFound({ message: 'donations not found' });
        }
        return donations;
    }

    
}
