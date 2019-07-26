<template>
  <div>
    <b-alert variant="success" show>Correct Answers : {{ numCorrect }}</b-alert>
    <b-alert variant="danger" show>In Correct Answers : {{ numIncorrect }} </b-alert>
      <router-link to="/"><b-button variant="info" class="m-1">Try Again</b-button></router-link>
   </div>
     
</template>

<script>
export default {
  computed: {
     numCorrect () {
      return this.$store.state.numCorrect
    },
     numIncorrect () {
      return this.$store.state.numIncorrect
    },
    
  }
};
</script>