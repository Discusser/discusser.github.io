<template>
  <nav class="flex flex-col w-40 min-w-40">
    <ul class="main-sidebar">
      <li><RouterLink to="/">Home</RouterLink></li>
      <li>
        <RouterLink to="/programming">Programming</RouterLink>
        <ul>
          <li><RouterLink to="/programming/cpp">C++</RouterLink></li>
          <li><RouterLink to="/programming/mobile">Mobile</RouterLink></li>
          <li><RouterLink to="/programming/python">Python</RouterLink></li>
          <li><RouterLink to="/programming/web">Web/JS</RouterLink></li>
        </ul>
      </li>
      <li>
        <RouterLink to="/hobbies">Hobbies</RouterLink>
        <ul>
          <li><RouterLink to="/hobbies/blender">Blender</RouterLink></li>
          <li><RouterLink to="/hobbies/workout">Workout</RouterLink></li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.main-sidebar,
.main-sidebar * {
  overflow: hidden;
  text-overflow: ellipsis;
}

ul {
  list-style-type: disc;
  list-style-position: inside;
}

.main-sidebar ul {
  padding-left: 1rem;
}
</style>
