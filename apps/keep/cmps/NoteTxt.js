export default {
    props: ['note'],
    template: `
        <section>
        <div>TXT</div>
        <h2>{{ note.id }}</h2>
        <h2>{{ note.info.title }}</h2>
        </section>
    `,
    data() {
        return {
            val: '',
            // datalistId: makeId()
        }
    },
    methods: {
        reportVal() {
            this.$emit('setVal', this.val)
        },
    },
}



