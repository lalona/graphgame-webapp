export class Level {
    name: string = "";
    maxAttemps: number = 0;
    maxTransformations: number = 0;
    solvedState: Transformation;
    startState: Transformation;
    prefabName: string;
    stepsScale: number = 1
    stepsTranslate: number = 1

    toJson() {
        return {
            "name": this.name,
            "steps_scale": this.stepsScale,
            "steps_translate": this.stepsTranslate,
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
    rotations: Rotation[];
    translation: Vector3;
    scale: Vector3;

    toJson() {
        return {
            "rotation": this.getRotationsJson(),
            "position": this.translation.getCommaFormat(),
            "scale": this.scale.getCommaFormat()
        }
    }

    getRotationsJson() {
        var json = {}
        for(var i = 0; i < this.rotations.length; i++) {
            var rot = this.rotations[i]            
            let a = rot.axis
            if(a == "x") {
                json[i] = {
                    "x": rot.value
                }
            } else if(a == "y") {
                json[i] = {
                    "y": rot.value
                }
            } else if(a == "z") {
                json[i] = {
                    "z": rot.value
                }
            }
            
        }
        return json
    }

    constructor() {
        this.rotations = []
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

export class Rotation {
    axis: string = ""
    value: number = 0
}

export const RotationAxis = [
    "x", "y", "z"
]

export const STEPS = [0.5, 1]