export class ColorError extends Error {
    constructor(message) {
        super(message)
        this.name = "ColorError"
    }
}