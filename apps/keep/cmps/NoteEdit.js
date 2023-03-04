import { noteService } from "../services/noteService.js";
import { eventBus } from "../../../services/event-bus.service.js";

export default {
  name: 'NoteEdit',
  template: `
    <section class="note-edit">
    <form @submit.prevent="save">
 <div class="edit-texts">

        <div class="note-types flex">

          <div class="flex" >
            <span class="edit-head">ADD YOUR NOTE:</span>
          </div>
          <div class="flex type-btns">
            <button :class="{ 'selected': selectedType === 'NoteTxt' }" @click="selectedType = 'NoteTxt'"><i class="fa-solid fa-font"></i></button>
            <button :class="{ 'selected': selectedType === 'NoteImg' }" @click="selectedType = 'NoteImg'"><i class="fa-solid fa-image"></i></button>
            <button :class="{ 'selected': selectedType === 'NoteTodos' }" @click="selectedType = 'NoteTodos'"><i class="fa-solid fa-check"></i></button>
          </div>
        

        </div>
        <label >title:</label>
        <input name="title" type="text" v-model="note.info.title">
        <div v-if="selectedType === 'NoteTxt'">
          <label for="txt">txt:</label>
          <input name="txt" type="text" v-model="note.info.txt">
        </div>

        <div v-if="selectedType === 'NoteImg'">
          <label for="url">url:</label>
          <input name="url" type="text" v-model="note.info.url">
          <label for="imgTitle">title:</label>
          <input name="imgTitle" type="text" v-model="note.info.title">
        </div>

        <div v-if="selectedType === 'NoteTodos'">
          <label for="todosTitle">title:</label>
          <input name="todosTitle" type="text" v-model="note.info.title">
          <label for="todos">todos:</label>
          <div v-for="(todo, index) in note.info.todos" :key="index">
            <input type="text" v-model="todo.txt">
            <button @click.prevent="removeTodo(index)">X</button>
          </div>
          <button  @click.prevent="addTodo">+</button>
        </div>


        <button class="v-button" :disabled="!selectedType" @click="save; isSaveClicked = true"><i class="fa-solid fa-v"></i></button>

      </div>
    </form>
  </section>
  `,

  data() {
    return {
      selectedType: '',
      note: noteService.getEmptyNote(),
      isOpen: false
    }
  },

  created() {
    const { noteId } = this.$route.params
    if (noteId) {
      noteService.get(noteId)
        .then(note => {
          this.note = note;
          this.selectedType = note.type;
        });
    }
  },

  methods: {
    addTodo() {
      this.note.info.todos.push({ txt: '', doneAt: null })
    },

    removeTodo(index) {
      this.note.info.todos.splice(index, 1);
    },

    save() {
      if (!this.selectedType) return; // make sure a note type is selected
      
      if (this.note.id) {
        noteService.update(this.note).then(note => {
          // update the note in the parent component
          this.$emit('updateNote', note);
        });
      } else {
        // only save the note when the user clicks on the "v-button"
        if (this.isSaveClicked) {
          noteService.save(this.note).then(note => {
            // add the new note to the parent component
            this.$emit('save', note);
            // clear the form
            this.note = noteService.getEmptyNote();
          });
        }
      }
    },

  watch: {
    selectedType() {
      this.note = noteService.getEmptyNote();
      this.note.type = this.selectedType;
    }
  }
}
}