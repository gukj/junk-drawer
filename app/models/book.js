import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr('string'),
  editionSize: DS.attr('string'),
  imageFront400: DS.attr('string'),
  imageFront800: DS.attr('string'),
  imageSide: DS.attr('string'),
  itemNo: DS.attr('string'),
  name: DS.attr('string'),
  release: DS.attr('string')
});
