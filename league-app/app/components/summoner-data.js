import Ember from 'ember';
const { computed } = Ember;

export default Ember.Component.extend({

  /**
   * A rather unnecessary approach to creating a string to provide our user (YOU!)
   * with the appropriate summoner icon.
   *
   * @param  {model} 'model'    Just your good ol passing in the model
   * @property computed.property
   * @return {string}           Complete addy for our summoner icon
   */
  profileEndpoint: computed('model', function() {
    var iconId = this.get('model.profileIconId');

    return 'http://ddragon.leagueoflegends.com/cdn/6.9.1/img/profileicon/'+ iconId +'.png';
  })
});
