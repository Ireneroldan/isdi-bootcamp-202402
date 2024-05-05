import { errors, validate } from 'com'
import { User, Board } from '../data/index.ts'

const { NotFoundError } = errors;

async function getSharedBoards(userId) {
    validate.text(userId, 'userId', true);

    try {
        const user = User.findById(userId);
        if (!user) throw new NotFoundError('User not found');

        return await Board.find({ assignedUsers: { $in: [userId] } }).exec()
        
    } catch (error) {
        throw error;
    }

}
export default getSharedBoards