goQuestions(classQuestions){

  this.$router.push({"name":'answerQuestionDetailList',
    query:{
      "scheduleId": this.id,
      lessonType: this.lessonType,
      "scheduleName": this.scheduleName,
      "status": classQuestions.status,
      "questionId": classQuestions.id
    }
  })}
