export default {
    props: ['email'],
    template: `
        <article class="book-preview">
            <h2>{{ email.subject }}</h2>
            <h3>{{ email.body }}</h3>
        </article>
    `,
}