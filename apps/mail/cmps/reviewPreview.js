export default {
    props: ['review'],
    template: `

        <article class="review-preview">
            <h3>name:{{ review.fullname }}</h3>
            <h3>rating :{{  review.rating }}</h3>
            <h3>read at :{{ review.readAt }}</h3>
        </article>
    `,
}