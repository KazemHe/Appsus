
export default {
    props: ['note'],
    template: `
    
        <article class="note-preview">
        <div :style="{ backgroundColor: selectedColor }">
    <input type="color" v-model="selectedColor" />
    <h2>{{ note.id }}</h2>
    <h2>{{ note.info.title }}</h2>
    </div>
        </article>
    `,

data() {
    return {
        selectedColor: "#ffffff"
    }
}
}