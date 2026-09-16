const { getPool, getIsConnected } = require('../config/db');
const crypto = require('crypto');

// In-memory fallback database for offline/testing when MySQL server is not active
const inMemoryStore = new Map();

const formatUser = (row) => {
  if (!row) return null;
  return {
    id: String(row.id),
    mobileNumber: row.mobile_number,
    name: row.name,
    email: row.email,
    age: row.age !== null ? Number(row.age) : null,
    gender: row.gender,
    preferredLanguage: row.preferred_language,
    profileImage: row.profile_image,
    isProfileComplete: Boolean(row.is_profile_complete),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    toJSON() {
      const copy = { ...this };
      return copy;
    },
  };
};

const userService = {
  /**
   * Find a user by mobile number (SQL Prepared Query)
   */
  async findByMobile(mobileNumber) {
    if (getIsConnected()) {
      const pool = getPool();
      const [rows] = await pool.query(
        'SELECT * FROM users WHERE mobile_number = ? AND is_deleted = 0 LIMIT 1',
        [mobileNumber]
      );
      return rows.length > 0 ? formatUser(rows[0]) : null;
    } else {
      for (const user of inMemoryStore.values()) {
        if (user.mobileNumber === mobileNumber && !user.isDeleted) {
          return user;
        }
      }
      return null;
    }
  },

  /**
   * Create a new user with mobile number (SQL Prepared Query)
   */
  async createUser(userData) {
    if (getIsConnected()) {
      const pool = getPool();
      const [result] = await pool.query(
        'INSERT INTO users (mobile_number, name, email, preferred_language, is_profile_complete) VALUES (?, ?, ?, ?, 0)',
        [
          userData.mobileNumber,
          userData.name || 'Learner',
          userData.email || '',
          userData.preferredLanguage || 'Marathi',
        ]
      );
      return await this.findById(result.insertId);
    } else {
      const id = String(inMemoryStore.size + 1);
      const now = new Date().toISOString();
      const newUser = {
        id,
        mobileNumber: userData.mobileNumber,
        name: userData.name || 'Learner',
        email: userData.email || '',
        age: userData.age || null,
        gender: userData.gender || 'Not Specified',
        preferredLanguage: userData.preferredLanguage || 'Marathi',
        profileImage: userData.profileImage || '',
        isProfileComplete: false,
        isDeleted: false,
        deletedAt: null,
        createdAt: now,
        updatedAt: now,
        toJSON() {
          const copy = { ...this };
          return copy;
        },
      };
      inMemoryStore.set(id, newUser);
      return newUser;
    }
  },

  /**
   * Find user by ID (SQL Prepared Query)
   */
  async findById(userId) {
    if (getIsConnected()) {
      const pool = getPool();
      const [rows] = await pool.query(
        'SELECT * FROM users WHERE id = ? LIMIT 1',
        [userId]
      );
      return rows.length > 0 ? formatUser(rows[0]) : null;
    } else {
      return inMemoryStore.get(String(userId)) || null;
    }
  },

  /**
   * Update user details by ID (SQL Prepared Query)
   */
  async updateUser(userId, updateData) {
    if (getIsConnected()) {
      const pool = getPool();
      const setClauses = [];
      const queryParams = [];

      if (updateData.mobileNumber !== undefined) {
        setClauses.push('mobile_number = ?');
        queryParams.push(updateData.mobileNumber);
      }
      if (updateData.name !== undefined) {
        setClauses.push('name = ?');
        queryParams.push(updateData.name);
      }
      if (updateData.email !== undefined) {
        setClauses.push('email = ?');
        queryParams.push(updateData.email);
      }
      if (updateData.age !== undefined) {
        setClauses.push('age = ?');
        queryParams.push(updateData.age);
      }
      if (updateData.gender !== undefined) {
        setClauses.push('gender = ?');
        queryParams.push(updateData.gender);
      }
      if (updateData.preferredLanguage !== undefined) {
        setClauses.push('preferred_language = ?');
        queryParams.push(updateData.preferredLanguage);
      }
      if (updateData.profileImage !== undefined) {
        setClauses.push('profile_image = ?');
        queryParams.push(updateData.profileImage);
      }
      if (updateData.isProfileComplete !== undefined) {
        setClauses.push('is_profile_complete = ?');
        queryParams.push(updateData.isProfileComplete ? 1 : 0);
      }

      if (setClauses.length > 0) {
        queryParams.push(userId);
        const sql = `UPDATE users SET ${setClauses.join(', ')} WHERE id = ?`;
        await pool.query(sql, queryParams);
      }

      return await this.findById(userId);
    } else {
      const existingUser = inMemoryStore.get(String(userId));
      if (!existingUser) return null;

      const updatedUser = {
        ...existingUser,
        ...updateData,
        updatedAt: new Date().toISOString(),
        toJSON() {
          const copy = { ...this };
          return copy;
        },
      };

      inMemoryStore.set(String(userId), updatedUser);
      return updatedUser;
    }
  },

  /**
   * Soft delete user by ID (SQL Prepared Query)
   */
  async softDeleteUser(userId) {
    if (getIsConnected()) {
      const pool = getPool();
      await pool.query(
        'UPDATE users SET is_deleted = 1, deleted_at = CURRENT_TIMESTAMP WHERE id = ?',
        [userId]
      );
      return true;
    } else {
      const existingUser = inMemoryStore.get(String(userId));
      if (!existingUser) return false;

      const updatedUser = {
        ...existingUser,
        isDeleted: true,
        deletedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        toJSON() {
          const copy = { ...this };
          return copy;
        },
      };

      inMemoryStore.set(String(userId), updatedUser);
      return true;
    }
  },
};

module.exports = userService;
