import { TUser } from './user.interface';
import { User } from './user.model';

const createUserInToDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const getAllUserFromDB = async () => {
  const users = await User.find().exec();
  return users;
};

// Blocked user by admin
const blockedUserByAdminFromDB = async (id: string) => {
  const updatedBlog = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: true,
    },
    { new: true },
  );

  return updatedBlog;
};

export const UserServices = {
  createUserInToDB,
  getAllUserFromDB,
  blockedUserByAdminFromDB,
};
