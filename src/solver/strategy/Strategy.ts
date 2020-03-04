import { SolvingPuzzle } from "../SolvingPuzzle";



export interface Strategy {

    solveStep(puzzle: SolvingPuzzle): SolvingPuzzle;

}