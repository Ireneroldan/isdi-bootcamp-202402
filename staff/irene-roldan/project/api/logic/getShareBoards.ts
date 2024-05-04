import { errors, validate } from 'com'
import { User, Board } from '../data/index.ts'

const { NotFoundError } = errors;

function getSharedBoards(userId) {
    validate.text(userId, 'userId', true);

    try {
        const user = User.findById(userId);
        if (!user) throw new NotFoundError('User not found');

        const sharedBoards =  Board.find({ assignedUsers: { $in: [userId] } }).exec();
        
        return sharedBoards;
    } catch (error) {
        throw error;
    }

}
export default getSharedBoards