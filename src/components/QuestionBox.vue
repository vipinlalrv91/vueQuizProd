<template>
  <div class="questioin-box-container">
    <b-jumbotron>
      
      <template slot="lead">
         <h2 v-html="currentQuestion.question"></h2>
      </template>
     

      <hr class="my-4">

     <b-list-group>
      <b-list-group-item
      v-for="(answer,index) in answers" :key="index" 
      @click="selectAnswers(index)"
      :class="answerClass(index)"
      >
      <p  v-html="answer"></p>
      </b-list-group-item>
    </b-list-group>


     <b-alert
      :show="dismissCountDown"      
      variant="warning"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      <p>This Question will dismiss after {{ dismissCountDown }} seconds...</p>
      <b-progress
        variant="warning"
        :max="dismissSecs"
        :value="dismissCountDown"
        height="4px"
       ></b-progress>
    </b-alert>



      <b-button variant="primary" @click="submitAnswer" 
      :disabled="selectedIndex===null || answered">Submit</b-button>
      
        <b-button @click="nextQuestion" ref="fileInput" variant="success" href="#">Next</b-button> 

    </b-jumbotron>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  props:{
    currentQuestion:Object,
    increment : Function,
    next : Function,
    showResult: Boolean
  },
  data(){
   return {
      selectedIndex : null,
      shuffledAnswers :[],
      answered : false,
      correctIndex :null,
      dismissCountDown: 0,
      dismissSecs: 10
    }
  },
  watch:{
   currentQuestion: {
     immediate:true,
     handler(){
      this.selectedIndex=null;
      this.shuffleAnswers();
      this.answered =false;
     }
   }
  },
  computed: {
    answers(){
      let answers = [...this.currentQuestion.incorrect_answers]
      answers.push(this.currentQuestion.correct_answer)
      return answers;
    }
  },
  methods:{
    selectAnswers(index) {
      this.selectedIndex = index;
    },
    submitAnswer(){
      console.log("submit event");
      let isCorrect = false
      if(this.selectedIndex === this.correctIndex){
        isCorrect = true;
      }
      this.answered = true;
      this.increment(isCorrect)
      this.next()
      this.showAlert();
    },
    shuffleAnswers(){
      let answers = [...this.currentQuestion.incorrect_answers,this.currentQuestion.correct_answer] 
      this.shuffledAnswers = _.shuffle(answers)
      this.correctIndex =  this.shuffledAnswers.indexOf(this.currentQuestion.correct_answer)
     }
     ,answerClass(index){
       let answerClass = ''
       if(!this.answered && this.selectedIndex===index){
         answerClass = 'selected';
       }else if ( this.answered && this.correctIndex === index ){
         answerClass = 'correct';
       }else if ( this.answered && this.selectedIndex===index && this.correctIndex !== index){
         answerClass = 'incorrect';
       }
       return answerClass;
     },
      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
        if(this.dismissCountDown === 0){
           //this.nextQuestion();
        }
      },
      showAlert() {
        console.log("showAlert event");
        this.dismissCountDown = this.dismissSecs
      },
      nextQuestion(){
       this.next()
       this.showAlert();
      }
  },
  mounted:function(){
       this.showAlert()
  }
}
</script>
<style scoped>
.list-group{
  margin-bottom:15px;
}
.btn{
  margin: 0 5px;
}
.list-group-item:hover{
background:#EEE;
cursor:pointer;
}
.selected{
  background-color:#03befc;
}
.correct{
  background-color:green;
}
.incorrect{
  background-color:red;
}
</style>