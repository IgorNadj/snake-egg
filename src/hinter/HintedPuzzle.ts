import { Puzzle } from "../Puzzle";


/**
 * A hinted puzzle is one that is ready for a human to play, it is mostly blank and has
 * some cells in the grid already filled in to give hints to the human 
 */
export class HintedPuzzle extends Puzzle {

    public hints: number[][] = [];
    
}