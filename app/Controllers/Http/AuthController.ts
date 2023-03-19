import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

export default class AuthController {

    // LOGIN
    public async login({request, auth, response }: HttpContextContract) {

        const { email, password } = request.body();
        console.log(email, password);

        try {
            const token = auth.use('api').attempt(email, password, {
                expiresIn: '3 days',
            });
            return token;
        } catch (err) {
            console.log(err);
            response.unauthorized({ message: 'Invalid email/password' });
        }
    }

    // REGIST
    public async register({request, response }: HttpContextContract) {

        const { email, password, fullname } = request.body();

        try {
            const user = await User.create({ email, password, fullname });
            return user;
        } catch (err) {
            response.unauthorized({ message: 'Invalid email/password' });
        }
    }
        
}
