/** Describes a recipe */
export interface Recipe {
    id?: number;
    name: string;
    difficulty: number;
    duration: number;
}

/** Describes a step with a Recipe */
export interface Step {
    id?: number;
    step: string;
    order: number;
}
