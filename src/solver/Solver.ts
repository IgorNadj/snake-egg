import { HintedPuzzle } from "../hinter/HintedPuzzle";
import { SolvingPuzzle } from "./SolvingPuzzle";
import { Steps } from './Steps';
import { SolveStep } from "./step/SolveStep";
import { List } from "immutable";

export type SolveResult = {
    hasSolution: boolean,
    solution?: SolvingPuzzle,
    initial: SolvingPuzzle,
    solveStepTaken: List<SolveStepTaken>,
}

export type SolveStepTaken = {
    after: SolvingPuzzle,
    step: SolveStep,
}

export class Solver {

    protected STEP_LIMIT = 100;

    public solve(hintedPuzzle: HintedPuzzle): SolveResult {
        const initial = new SolvingPuzzle(hintedPuzzle);

        let current = initial;

        let solveStepTaken: List<SolveStepTaken> = List();

        for (let stepNum = 0; stepNum < this.STEP_LIMIT; stepNum++) {

            // may have been given a completed grid to solve, check it first
            if (current.getSolveGrid().count(null) === 0) {
                // done
                return {
                    hasSolution: true,
                    solution: current,
                    initial: initial,
                    solveStepTaken: solveStepTaken,
                }
            }

            const stepResult = this.step(current);

            if (stepResult === null || stepResult.after === current) {
                // nothing changed, no solution found
                return {
                    hasSolution: false,
                    initial: initial,
                    solveStepTaken: solveStepTaken,
                }
            }

            // something changed
            solveStepTaken = solveStepTaken.push(stepResult);

            current = stepResult.after;
        }

        // Ran out of time
        throw 'Too many steps needed';
    }

    protected step(puzzle: SolvingPuzzle): SolveStepTaken | null {
        for (const step of Steps) {
            const puzzleAfter = step.solveStep(puzzle);
            if (puzzleAfter === puzzle) {
                // nothing changed, try next
                continue;
            } else {
                // something changed
                return {
                    after: puzzleAfter,
                    step: step,
                };
            }
        }
        // no steps worked
        return null;
    }

}