import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  summonerId: attr(),
  name: attr(),
  profileIconId: attr(),
  summonerLevel: attr()
});
