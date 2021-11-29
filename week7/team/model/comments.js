export default class Comments {

    constructor({ hikeName, type } = {}) {
        this.hikeName = hikeName
        this.type = type

        this.comments = []
        this.lsKey = `comments_${this.type}_${this.hikeName}`

        this.retrieveFromLS()
    }

    addComment(content) {
        this.comments.push(new Comment({ content }))
        this.saveToLS()
    }

    retrieveFromLS() {
        let data = JSON.parse(localStorage.getItem(this.lsKey))
        data = data ? data : [];
        this.comments = data.map(datum => new Comment({ ...datum, date: new Date(datum.date) }))
    }

    saveToLS() {
        localStorage.setItem(this.lsKey, JSON.stringify(this.comments))
    }

    render() {
        return `
        <div class="comments">
            <ul class="commentlist">
                ${this.comments.reduce((acc, comment) => {
                    return acc + comment.render()
                }, "")}
            </ul>
        </div>
        `
    }
}

class Comment {
    constructor({ content, date = new Date() } = {}) {
        this.date = date
        this.content = content
    }

    render() {
        return `
            <li class="comment" >
                ${this.date.toDateString()}: ${this.content}
            </li>
        `
    }
}