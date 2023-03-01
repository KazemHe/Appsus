import { utilService } from "../services/util.service.js"


export default {
    props: ['txt', 'length'],
    template: `



<p>{{txt}}</p>
<p v-if="isRead">{{makeloremToRead}}</p>
<div class="read" @:click="changeReadMode">{{readMode}}...</div>


    `,
    data() {
        return {

            isRead: false,
            readMode: 'read more',
        }
    },
    methods: {

        changeReadMode() {

            this.isRead = !this.isRead

            if (this.isRead) this.readMode = 'read less'

            else this.readMode = 'read more'

        }

    },

    computed: {

        makeloremToRead() {
            return utilService.makeLorem(90)

        }





    },


    components: {
        utilService,
    }
}