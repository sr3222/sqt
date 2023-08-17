/**
 * @namespace Score
 * @author A. Freddie Page
 * @version 2022.23
 * This module provides the scoring system for a Tetris Game.
 */
const Score = {};

/**
 * The score object contains information about the score of the game.
 * Currently it is implemented as a single number,
 * but could include other information such as the number of lines cleared.
 * @typedef {Object} Score
 * @property {number} score the score dependent on how quickly you decide on the orientation of the tetromino
 * @property {number} lines_cleared the number of full lines completed and cleared.
 * @property {boolean} last_line_was_tetris indicates if the last line cleared was a Tetris.
 * @memberof Score
 */

/**
 * Returns a game state for a new Tetris Game.
 * @function
 * @memberof Score
 * @returns {Score.Score} The new game.
 */
Score.new_score = function () {
    return {
        "score": 0,
        "lines_cleared": 0,
        "last_line_was_tetris": false
    }
};
/**
 * Returns what level you have reached in the game.
 * @function
 * @memberof Score
 * @param {number} score The number of lines cleared.
 * @returns {number} The level number you are on.
 */
Score.level = function (score) {
    const levels = Math.floor(score.lines_cleared/10) + 1
    return levels;
};
/**
 * Returns your score and lines cleared depending on how many lines you have cleared.
 * @function
 * @memberof Score
 * @param {number} lines_cleared
 * @param {number} score
 * @returns {Score.Score}
 */
Score.cleared_lines = function (lines_cleared, score) {
    const line_scores = [0, 100, 300, 500, 800];
    let line_bonus = line_scores[lines_cleared];

    if (score.last_line_was_tetris && lines_cleared === 4) {
        line_bonus = 1200;
    } else if (lines_cleared === 4) {
        score.last_line_was_tetris = true;
    } else {
        score.last_line_was_tetris = false;
    }

    score.score += line_bonus;
    score.lines_cleared += lines_cleared;

    return score;
};
/** Returns a score with additional given number of points.
 * @function
 * @memberof Score
 * @param {number} points
 * @param {Score.Score} score
 * @returns {Score.Score}
 */
Score.add_points = function (score, points) {
    const add_points_score = { ...score };
    add_points_score.score += points;
    return add_points_score;
};

export default Object.freeze(Score);
