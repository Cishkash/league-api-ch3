import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  region_tag: attr(),
  name: attr(),
  slug: attr()
});
