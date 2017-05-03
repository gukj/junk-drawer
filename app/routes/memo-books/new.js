import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.createRecord('book');
  },

  actions: {
    saveMemoBook(newMemoBook) {
      newMemoBook.save().then(() => this.transitionTo('memo-books'));
    }
  }
});
