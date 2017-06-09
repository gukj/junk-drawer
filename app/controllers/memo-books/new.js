import Ember from 'ember';

export default Ember.Controller.extend({
  isValidName: Ember.computed.notEmpty('model.name'),
  isValidUpload: Ember.computed.notEmpty('downloadURL'),
  isValid: Ember.computed.and('isValidName', 'isValidUpload'),
  progress: 0,
  actions: {
    didSelectFiles(data) {
      const storageRef = window.firebase.storage().ref();
      let file = data;
      var uploadTask = storageRef.child('memo-books/' + file[0].name).put(file[0]);
      uploadTask.on(window.firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.set('progressText', `Upload is ${Math.round(progress * 100) / 100} % done`);
          this.set('progress', progress);
          switch (snapshot.state) {
            case window.firebase.storage.TaskState.PAUSED:
              this.set('status', 'Upload is paused');
              break;
            case window.firebase.storage.TaskState.RUNNING:
              this.set('status', 'Upload is running');
              break;
          }
        }, (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            console.log('Error from storage/unauthorized');
            break;
          case 'storage/canceled':
            console.log('Error from storage/canceled');
            break;
          case 'storage/unknown':
            console.log('Error from storage/unknown');
            break;
        }
      }, () => {
        this.set('downloadURL', uploadTask.snapshot.downloadURL);
        this.set('model.image', uploadTask.snapshot.downloadURL);
      });
    }
  }
});
