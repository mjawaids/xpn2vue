export default class Model {
    constructor(problem = "Problem", version = "V01", author = "Author", data = []) {
        this.problem = problem;
        this.version = version;
        this.author = author;
        this.data = this.initData(data);
    }

    initData(data) {
        // TODO: initialize all data here
        return this.data = [];
    }
}