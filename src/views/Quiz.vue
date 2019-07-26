<template>
  <div id="app">
    <Header
    :numCorrect="numCorrect"
    :numTotal="numTotal"
    :curIndex="index"
    />
    <b-container class="bv-example-row">
      <b-row sm="6" offset="3">
        <b-col>
          <QuestionBox 
          v-if="questions.length" 
          :currentQuestion="questions[index]"
          :next="next"
          :increment = "increment"
           />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Result from "../views/Result.vue";
import QuestionBox from "../components/QuestionBox.vue";
import HomeContainer from "../components/HomeContainer.vue";
import store from '../store/store'

export default {
  name: "app",
  components: {
    Header,
    Result,
    QuestionBox,
    HomeContainer
  },
  data(){
    return{
      questions:[],
      index:0,
      numCorrect:0,
      numTotal:0,
      selectedOption : 100,
    }
  },
  methods:{
    next:function(){
      if(this.index <  9){
        this.index++;
      }else{
        store.commit('increment',{correct:this.numCorrect,incorrect: (this.numTotal-this.numCorrect) })
        this.$router.push("/result") ; 
      }
    },
    increment:function(isCorrect){
      if(isCorrect){
        this.numCorrect++;
      }
      this.numTotal++;

    }
  },
  mounted:function(){
    let categoryId = this.$route.params.cat
    fetch("https://opentdb.com/api.php?amount=10&category="+categoryId,{
      method:'get'
    }) 
    .then((response)=>{
      return response.json();
    })
     .then((jsonData)=>{
       this.questions = jsonData.results;
    })
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
