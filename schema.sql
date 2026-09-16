-- Marathi Learning Node.js MySQL Schema

CREATE DATABASE IF NOT EXISTS `marathi_learning` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `marathi_learning`;

CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `mobile_number` VARCHAR(20) NOT NULL UNIQUE,
  `name` VARCHAR(100) NOT NULL DEFAULT 'Learner',
  `email` VARCHAR(150) NOT NULL DEFAULT '',
  `age` INT DEFAULT NULL,
  `gender` ENUM('Male', 'Female', 'Other', 'Not Specified') NOT NULL DEFAULT 'Not Specified',
  `preferred_language` VARCHAR(50) NOT NULL DEFAULT 'Marathi',
  `profile_image` VARCHAR(255) NOT NULL DEFAULT '',
  `is_profile_complete` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_mobile_number` (`mobile_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
