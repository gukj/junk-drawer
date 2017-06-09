import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.createRecord('book');
  },

  actions: {
    saveMemoBook(newMemoBook) {
      newMemoBook.save().then(() => this.transitionTo('memo-books'));
    },
    willTransition(transition) {
      let model = this.controller.get('model');
      if (model.get('hasDirtyAttributes')) {
        if (!model.get('name')) {
          model.rollbackAttributes();
        }
        else {
          let confirmation = confirm("Your changes haven't been saved yet. Would you like to leave this form?");
          if (confirmation) {
            model.rollbackAttributes();
          } else {
            transition.abort();
          }
        }
      }
    }
  }
});
