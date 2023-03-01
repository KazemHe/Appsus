
export default {
    props: ['note'],
    template: `
        <article class="note-preview">
            <h2>{{ note.id }}</h2>
            <h2>{{ note.info.title }}</h2>
        </article>
    `,
}