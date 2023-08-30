const StandardError = require("../utils/constant/standardError");

class UserService {
  constructor(userDao) {
    this.userDao = userDao;
  }

  async getAllUser() {
    try {
      const user = await this.userDao.findAllUsers();
      if (!user) {
        throw new StandardError({ status: 404, message: "User not found" });
      }
      return { success: true, message: user };
    } catch (error) {
      throw new StandardError({ status: 500, message: error.message });
    }
  }

  async updateUserRole({ id, role }) {
    try {
      const allowedStatus = ["admin", "member"];
      if (!allowedStatus.includes(role)) {
        throw new StandardError({
          status: 400,
          message: "Failed to update role. Invalid status specified",
        });
      }
      const transferData = await this.userDao.updateUserRole({
        id,
        role,
      });
      return { success: true, message: transferData };
    } catch (error) {
      throw new StandardError({ status: 500, message: error.message });
    }
  }
}

module.exports = UserService;
