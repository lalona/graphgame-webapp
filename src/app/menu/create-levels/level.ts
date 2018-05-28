export class Level {
    name: string = "";
    maxAttemps: number = 0;
    maxTransformations: number = 0;
    solvedState: Transformation;
    startState: Transformation;
    prefabName: string;

    toJson() {
        return {
            "name": this.name,
            "solved_state": this.solvedState.toJson(),
            "start_state": this.startState.toJson(),
            "max_attemps": this.maxAttemps,
            "max_transformations": this.maxTransformations,
            "prefab_name": this.prefabName,
            "disabled": false       
        };
    }

    constructor() {
        this.solvedState = new Transformation();
        this.startState = new Transformation();
    }
}

export class Transformation {
    rotate: Vector3;
    translation: Vector3;
    scale: Vector3;

    toJson() {
        return {
            "rotate": this.rotate.getCommaFormat(),
            "position": this.translation.getCommaFormat(),
            "scale": this.scale.getCommaFormat()
        }
    }

    constructor() {
        this.rotate = new Vector3();
        this.translation = new Vector3();
        this.scale = new Vector3();
    }
    
}

export class Vector3 {
    x: number = 0;
    y: number = 0;
    z: number = 0;

    getCommaFormat() {
        return this.x + "," + this.y + "," + this.z;
    }
}