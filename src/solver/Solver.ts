import { HintedPuzzle } from "../hinter/HintedPuzzle";
import { SolvingPuzzle } from "./SolvingPuzzle";
import { Strategies } from './Strategies';
import { Strategy } from "./strategy/Strategy";
import { List } from "immutable";

export type SolveResult = {
    hasSolution: boolean,
    solution?: SolvingPuzzle,
    initial: SolvingPuzzle,
    steps: List<SolveStep>,
}

export type SolveStep = {
    after: SolvingPuzzle,
    strategy: Strategy,
}

export class Solver {

    protected STEP_LIMIT = 100;

    public solve(hintedPuzzle: HintedPuzzle): SolveResult {
        const initial = new SolvingPuzzle(hintedPuzzle);

        let current = initial;

        let steps: List<SolveStep> = List();

        for (let stepNum = 0; stepNum < this.STEP_LIMIT; stepNum++) {

            // may have been given a completed grid to solve, check it first
            if (current.getSolveGrid().count(null) === 0) {
                // done
                return {
                    hasSolution: true,
                    solution: current,
                    initial: initial,
                    steps: steps,
                }
            }

            const stepResult = this.step(current);

            if (stepResult === null || stepResult.after === current) {
                // nothing changed, no solution found
                return {
                    hasSolution: false,
                    initial: initial,
                    steps: steps,
                }
            }

            // something changed
            steps = steps.push(stepResult);

            current = stepResult.after;
        }

        // Ran out of time
        throw 'Too many steps needed';
    }

    protected step(puzzle: SolvingPuzzle): SolveStep | null {
        for (const strategy of Strategies) {
            const puzzleAfter = strategy.solve(puzzle);
            if (puzzleAfter === puzzle) {
                // nothing changed, try next
                continue;
            } else {
                // something changed
                return {
                    after: puzzleAfter,
                    strategy: strategy,
                };
            }
        }
        // no steps worked
        return null;
    }

}