import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  description: DS.attr('string'),
  editionSize: DS.attr('string'),
  image: DS.attr('string'),
  itemNo: DS.attr('string'),
  name: DS.attr('string'),
  release: DS.attr('string')
});
