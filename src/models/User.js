/**
 * User Entity Model Specification for MySQL
 */

const UserFields = {
  TABLE_NAME: 'users',
  COLUMNS: {
    ID: 'id',
    MOBILE_NUMBER: 'mobile_number',
    NAME: 'name',
    EMAIL: 'email',
    AGE: 'age',
    GENDER: 'gender',
    PREFERRED_LANGUAGE: 'preferred_language',
    PROFILE_IMAGE: 'profile_image',
    IS_PROFILE_COMPLETE: 'is_profile_complete',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
  },
  GENDERS: ['Male', 'Female', 'Other', 'Not Specified'],
};

module.exports = UserFields;
