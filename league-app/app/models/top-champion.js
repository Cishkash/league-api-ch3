import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  playerId: attr(),
  championId: attr(),
  championLevel: attr(),
  championPoints: attr(),
  lastPlayTime: attr(),
  championPointsSinceLastLevel: attr(),
  championPointsUntilNextLevel: attr(),
  chestGranted: attr(),
  highestGrade: attr(),
  image: attr(),
  key: attr(),
  name: attr(),
  title: attr()
});
