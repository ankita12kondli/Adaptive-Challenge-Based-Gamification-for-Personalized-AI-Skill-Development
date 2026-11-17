-- ========================================================
-- Project: Adaptive Challenge-Based Gamification for Personalized AI Skill Development
-- Database: MySQL Schema for MySQL Workbench
-- ========================================================

-- 1. Create and select the database
CREATE DATABASE IF NOT EXISTS adaptive_learning;
USE adaptive_learning;

-- 2. Drop existing tables if re-running (safe order with foreign keys)
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS user_badges;
DROP TABLE IF EXISTS badges;
DROP TABLE IF EXISTS user_attempts;
DROP TABLE IF EXISTS challenges;
DROP TABLE IF EXISTS topics;
DROP TABLE IF EXISTS adaptive_rules;
DROP TABLE IF EXISTS users;
SET FOREIGN_KEY_CHECKS = 1;

-- 3. Users Table (Students, Adults 35+, Admin)
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('student', 'adult', 'kid', 'admin') DEFAULT 'student',
    current_level ENUM('easy', 'medium', 'hard') DEFAULT 'medium',
    total_points INT DEFAULT 0,
    streak_days INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3b. Children Profiles Table (Kids Learning without Gmail - Name, Age, Standard)
CREATE TABLE IF NOT EXISTS children_profiles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    standard VARCHAR(50) NOT NULL,
    avatar VARCHAR(20) DEFAULT '🤖',
    total_stars INT DEFAULT 0,
    total_score INT DEFAULT 0,
    current_level INT DEFAULT 1,
    streak_days INT DEFAULT 1,
    last_active_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Topics Table (Curriculum categories)
CREATE TABLE topics (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(20) DEFAULT '🧠'
);

-- 5. Challenges Table (Questions, Options, Points & Difficulty)
CREATE TABLE challenges (
    id INT PRIMARY KEY AUTO_INCREMENT,
    topic_id INT NOT NULL,
    target_track ENUM('kids', 'adult', 'student') NOT NULL,
    difficulty ENUM('easy', 'medium', 'hard') NOT NULL,
    title VARCHAR(200) NOT NULL,
    question TEXT NOT NULL,
    option_a VARCHAR(255) NOT NULL,
    option_b VARCHAR(255) NOT NULL,
    option_c VARCHAR(255) NOT NULL,
    option_d VARCHAR(255) NOT NULL,
    correct_option CHAR(1) NOT NULL, -- 'A', 'B', 'C', or 'D'
    explanation TEXT,
    points INT DEFAULT 20,
    created_by INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- 6. User Attempts Table (Tracks performance for the Rule-Based Adaptive Engine)
CREATE TABLE user_attempts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    challenge_id INT NOT NULL,
    selected_option CHAR(1) NOT NULL,
    is_correct BOOLEAN NOT NULL,
    score_awarded INT DEFAULT 0,
    attempt_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (challenge_id) REFERENCES challenges(id) ON DELETE CASCADE
);

-- 7. Badges Table (Gamification rewards)
CREATE TABLE badges (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(20) DEFAULT '🏆',
    points_required INT NOT NULL
);

-- 8. User Badges Table (Tracks badges unlocked by users)
CREATE TABLE user_badges (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    badge_id INT NOT NULL,
    awarded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY user_badge_unique (user_id, badge_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (badge_id) REFERENCES badges(id) ON DELETE CASCADE
);

-- 9. Adaptive Rules Configuration Table (Rule-based engine thresholds)
CREATE TABLE adaptive_rules (
    id INT PRIMARY KEY AUTO_INCREMENT,
    rule_name VARCHAR(100) NOT NULL,
    min_score_percent INT NOT NULL,
    max_score_percent INT NOT NULL,
    action_result VARCHAR(50) NOT NULL, -- e.g. 'PROMOTE_HARD', 'DEMOTE_PRACTICE'
    description TEXT
);

-- ========================================================
-- INITIAL SEED DATA
-- ========================================================

-- Insert Default Topics
INSERT INTO topics (name, description, icon) VALUES
('Artificial Intelligence', 'Fundamentals of AI, intelligent agents, and everyday applications', '🧠'),
('Python Programming', 'Python syntax, variables, conditionals, loops, and data structures', '🐍'),
('Machine Learning', 'Rule-based learning, patterns, classification, and models', '🤖'),
('Generative AI', 'Large language models, text generation, and creative intelligence', '✨'),
('Prompt Engineering', 'Zero-shot, few-shot prompting, and AI instruction design', '💬'),
('Data Science', 'Data analysis, statistics, and visualization concepts', '📊'),
('Real-World AI Applications', 'Autonomous vehicles, healthcare diagnostics, and smart assistants', '🌐');

-- Insert Initial Users
-- Note: In production passwords will be hashed with bcrypt; these are initial demo accounts
INSERT INTO users (name, email, password, role, current_level, total_points, streak_days) VALUES
('Administrator', 'admin@skillspring.edu', 'admin123', 'admin', 'hard', 500, 10),
('Student User', 'student@example.com', 'student123', 'student', 'medium', 120, 3),
('Adult Learner', 'adult@example.com', 'adult123', 'adult', 'medium', 80, 2);

-- Insert Badges
INSERT INTO badges (name, description, icon, points_required) VALUES
('Fast Starter', 'Awarded for completing your first AI challenge', '🚀', 20),
('Streak Keeper', 'Maintained a daily learning streak for 3 consecutive days', '🔥', 60),
('AI Junior Explorer', 'Unlocked all beginner kids visual puzzles', '🌟', 50),
('Python Pioneer', 'Successfully solved 5 Python programming challenges', '🐍', 100),
('AI Logic Master', 'Promoted to Hard difficulty through high score mastery', '👑', 200);

-- Insert Adaptive Rules
INSERT INTO adaptive_rules (rule_name, min_score_percent, max_score_percent, action_result, description) VALUES
('High Performance Upgrade', 80, 100, 'PROMOTE_HARD', 'Score 80% or higher upgrades difficulty to Hard'),
('Average Performance Maintain', 51, 79, 'MAINTAIN_MEDIUM', 'Score between 51% and 79% maintains current difficulty'),
('Foundational Support Downgrade', 0, 50, 'DEMOTE_PRACTICE', 'Score 50% or below adjusts to Practice/Easy difficulty for review');

-- Insert Sample Challenges
INSERT INTO challenges (topic_id, target_track, difficulty, title, question, option_a, option_b, option_c, option_d, correct_option, explanation, points) VALUES
(1, 'kids', 'easy', 'Smart Machines', 'Which machine uses Artificial Intelligence to talk with humans?', 'Regular Wall Clock', 'Smart Voice Assistant', 'Bicycle', 'Ceiling Fan', 'B', 'Voice assistants like Siri/Alexa use AI speech recognition.', 20),
(1, 'kids', 'easy', 'Computer Vision', 'How does a self-driving car recognize road signs?', 'Cameras & AI Sensors', 'Human Eyes', 'Magic Miracles', 'Loud Honking', 'A', 'Self-driving vehicles use cameras and visual recognition sensors.', 20),
(2, 'student', 'medium', 'Python Boolean Logic', 'What is the output of: bool(0) or not bool([]) ?', 'False', 'True', 'None', 'SyntaxError', 'B', 'bool(0) is False. bool([]) is False, so not bool([]) is True. False or True evaluates to True.', 25),
(2, 'student', 'hard', 'Python List Comprehension', 'What will [x**2 for x in range(5) if x % 2 == 0] produce?', '[1, 9]', '[0, 4, 16]', '[0, 1, 4, 9, 16]', '[4, 16]', 'B', 'Even numbers in range(5) are 0, 2, 4. Their squares are 0, 4, 16.', 30),
(5, 'adult', 'medium', 'Prompting Techniques', 'What is "Zero-Shot Prompting"?', 'Giving 10 examples before asking', 'Asking the AI directly with no prior examples', 'Resetting the computer', 'Training a neural network from scratch', 'B', 'Zero-shot prompting involves asking a question directly without providing demonstration examples.', 25);
