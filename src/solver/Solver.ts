import { HintedPuzzle } from "../hinter/HintedPuzzle";
import { Puzzle } from "../Puzzle";
import { SolvingPuzzle } from "./SolvingPuzzle";


class Solver {

    public solve(hintedPuzzle: HintedPuzzle): SolvingPuzzle {
        // Things to try in order of how complicated they are:
        //   - Mark cells adjacent to snake as poly
        //   - Mark cells adjacent to completed poly as snake
        //   - If poly of size x is not complete, and can only expand in one direction, expand it
        // ... way more things we can do... so many
        // we can mark cells as snake and poly, without them being joined already
        // we can mark cells as having to be snake if surroundings are poly, and having to be poly if 
        // surroundings are snake



        return new SolvingPuzzle(hintedPuzzle.width, hintedPuzzle.height, hintedPuzzle.maxNumber);
    }

}