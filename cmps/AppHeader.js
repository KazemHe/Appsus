export default {
    template: `
      <header class="app-header">
    <h1>AppSus</h1>
    <nav class="app-header-nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
      <div class="app-header-dropdown">
        <button class="app-header-dropdown-button" @click="toggleDropdown">
          <span>More</span>
          <i class="fas fa-chevron-down"></i>
        </button>
        <div class="app-header-dropdown-menu" :class="{ 'is-open': isDropdownOpen }">
          <router-link to="/keep">keep</router-link>|
          <router-link to="/email">email</router-link>|
          <!-- <router-link to="/book">miss books</router-link> -->
        </div>
      </div>
    </nav>
  </header>
    `,


data() {
    return {
      isDropdownOpen: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
  },
}

// export default {
// 	template: `
//         <header class="app-header">
//             <h1>AppSus</h1>
//             <nav>
//                 <router-link to="/">Home</router-link> | 
//                 <router-link to="/about">About</router-link>
//             </nav>
//         </header>
//     `,
// }
