export class FormStorage {
    constructor() {
        this.fields = []
    }

    add(closure, bind) {
        this.fields.push([closure, bind])

        return this
    }

    remove(closure) {
        this.fields = this.fields.filter(a => a[0] !== closure)

        return this
    }

    fill(formData) {
        this.fields.forEach(fill => fill[0].call(fill[1], formData))

        return this
    }
}