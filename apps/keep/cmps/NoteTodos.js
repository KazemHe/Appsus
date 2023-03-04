export default {
    props: ['note'],
    template: `
  <h1>TODO</h1>
  <h2>{{ note.type}}</h2>
    <h2>{{ note.info.title }}</h2>
`,


    data() {
        return {

        }
    },
    methods: {

    },
    computed: {

    },
    created() {

    },
    components: {

    },
    emits: [],
}