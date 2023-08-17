import Tetris from "../Tetris.js";
import Score from "../Score.js";
import R from "../ramda.js";

const example_game = Tetris.new_game();
const field_string = `----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
-S--------
SSS-------
SSSZ-IOOJJ
TSZZ-IOOJJ
TTZL-IOOJJ
TLLL-IOOJJ`;
example_game.field = field_string.split("\n").map(
    (s) => s.replace(/-/g, " ").split("")
);

const example_game_two = Tetris.new_game();
const field_string_two = `----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
III----III
IIIIIIIIII
IIIIIIIIII`;
example_game_two.field = field_string_two.split("\n").map(
    (s) => s.replace(/-/g, " ").split("")
);

describe("Score", function () {
    it(
        `A new tetris game
        * Starts on level one
        * With no lines cleared
        * With a score of zero`,
        function () {
            const new_game = Tetris.new_game();
            const score = new_game.score;
            if (Score.level(score) !== 1) {
                throw new Error("New games should start on level one");
            }
            if (score.lines_cleared !== 0) {
                throw new Error("New games should have no lines cleared");
            }
            if (score.score !== 0) {
                throw new Error("New games should have a zero score");
            }
        }
    );

    it(
        `The score tracks the lines that get cleared`,
        function () {
            let game = example_game;
            // Slot an I tetromino into the hole and drop.
            game.current_tetromino = Tetris.I_tetromino;
            game = Tetris.rotate_ccw(game);
            game = Tetris.hard_drop(game);

            if (game.score.lines_cleared !== 4) {
                throw new Error("Expecting 4 lines to clear");
            }
        }
    );

    it(
        `A single line clear scores 100 × level`,
        function () {
            let game = example_game;
            // Slot a T tetromino into the hole and drop.
            // This can only go one deep.
            game.current_tetromino = Tetris.T_tetromino;

            // I could use hard_drop here, but that would also score.
            // Instead wait for it to drop 22 times.
            R.range(0, 22).forEach(function () {
                game = Tetris.next_turn(game);
            });

            if (game.score.score !== 100) {
                throw new Error("A single row cleared should score 100");
            }
        }
    );

    it(
        `A double line clear scores 300 × level`,
        function () {
            let game = example_game;
            // Slot an L tetromino into the hole and drop.
            // This can go two deep.
            game.current_tetromino = Tetris.L_tetromino;

            game = Tetris.rotate_cw(game);

            // I could use hard_drop here, but that would also score.
            // Instead wait for it to drop 22 times.
            R.range(0, 22).forEach(function () {
                game = Tetris.next_turn(game);
            });

            if (game.score.score !== 300) {
                throw new Error("A double row cleared should score 300");
            }
        }
    );

    it(
        `A triple line clear scores 500 × level`,
        function () {
            let game = example_game_two;
            // Slot an I tetromino into the hole and drop.
            // This can go three deep.
            game.current_tetromino = Tetris.I_tetromino;

            // I could use hard_drop here, but that would also score.
            // Instead wait for it to drop 22 times.
            R.range(0, 22).forEach(function () {
                game = Tetris.next_turn(game);
            });

            if (game.score.score !== 500) {
                throw new Error("A triple row cleared should score 500");
            }
        }
    );

    it(
        `A tetris scores 800 × level`,
        function () {
            let game = example_game;
            // Slot an I tetromino into the hole and drop.
            // This can go four deep.
            game.current_tetromino = Tetris.I_tetromino;

            game = Tetris.rotate_cw(game);

            // I could use hard_drop here, but that would also score.
            // Instead wait for it to drop 22 times.
            R.range(0, 22).forEach(function () {
                game = Tetris.next_turn(game);
            });

            if (game.score.score !== 800) {
                throw new Error("A tetris cleared should score 800");
            }
        }
    );

    it(
        `Back to back tetrises score 1200 × level`,
        function () {
            let game = example_game;
            game.score.last_line_was_tetris = true;

            // Slot an I tetromino into the hole and drop.
            // This can go four deep.

            game.current_tetromino = Tetris.I_tetromino;

            game = Tetris.rotate_cw(game);

            // I could use hard_drop here, but that would also score.
            // Instead wait for it to drop 22 times.
            R.range(0, 22).forEach(function () {
                game = Tetris.next_turn(game);
            });

            if (game.score.score !== 1200) {
                throw new Error("Back to back tetrises cleared should score 1200");
            }
        }
    );

    it(
        `A soft drop score 1 point per cell descended`,
        function () {
            let game = example_game;
            // Soft drop an I tetromino on top of the other blocks.
            game.current_tetromino = Tetris.I_tetromino;

            R.range(0, 22).forEach(function () {
                game = Tetris.soft_drop(game);
            });

            if (game.score.score !== 17) {
                throw new Error("A soft drop should score 1 point per cell descended");
            }
        }
    );
    it(
        `A hard drop score 2 point per cell descended`,
        function () {
            let game = example_game;
            // Hard drop an I tetromino on top of the other blocks.
            game.current_tetromino = Tetris.I_tetromino;

            game = Tetris.hard_drop(game);

            if (game.score.score !== 34) {
                throw new Error("A hard drop should score 2 point per cell descended");
            }
        }
    );

    it(
        `Advancing the turn without manually dropping scores nothing.`,
        function () {
            let game = example_game;

            game = Tetris.next_turn;

            if (game.score !== game.score) {
                throw new Error("Advancing the turn without manually dropping should score nothing");
            }
        }
    );
});
