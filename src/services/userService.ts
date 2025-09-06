import { User } from '../types';
import { getUserById, addUser } from '../utils/mockData';
import cacheService from './cacheService';
import queueService from './queueService';

export class UserService {
  async getUserById(id: number): Promise<User | null> {
    const cacheKey = `user:${id}`;
    
    const cachedUser = cacheService.get(cacheKey);
    if (cachedUser) {
      return cachedUser;
    }

    return queueService.process(cacheKey, async () => {
      const cachedUser = cacheService.get(cacheKey);
      if (cachedUser) {
        return cachedUser;
      }

      await new Promise(resolve => setTimeout(resolve, 200));
      
      const user = getUserById(id);
      if (user) {
        cacheService.set(cacheKey, user);
        return user;
      }
      
      return null;
    });
  }

  async createUser(name: string, email: string): Promise<User> {
    const newUser = addUser(name, email);
    const cacheKey = `user:${newUser.id}`;
    cacheService.set(cacheKey, newUser);
    return newUser;
  }
}

export default new UserService();