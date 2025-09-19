export interface RandNum {
    sequence: string;
    period: number;
}

export interface TestGenerator {
    probability: number;
    actualProbability: number;
    PIestimate: number;
    PIactual: number;
}