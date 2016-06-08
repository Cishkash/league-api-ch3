import Ember from 'ember';
const { inject } = Ember;

export default Ember.Component.extend({
  // Service injections
  global: inject.service(),
  user: inject.service(),

  /**
   * The summoner name without the spaces
   * Set from the noSpace action.
   *
   * @property proxiedSummonerName
   * @type {String}
   */
  proxiedSummonerName: '',
  /**
   * The name of the summoner searched for
   *
   * @type {String}
   */
  summonerName: '',

  // Action
  actions: {
    /**
     * Sets the locale on the global service when a user selects a new region
     *
     * @param  {string} localeName The full name of the locale (ie. "North America")
     * @param  {string} localeSlug The abbr of the locale (ie. "na")
     * @method didSelectLocale
     */
    didSelectLocale(localeName, localeSlug) {

      var userService = this.get('user');

      userService.set('localeName', localeName);
      userService.set('localeSlug', localeSlug);

      this.sendAction('refreshModel');
    },
    /**
     * Removes the spaces from the summoner name upon search.
     * Fires first because this actio is yielded before the link-to helper.
     *
     * @method noSpace
     * @param  {String} summonerName
     */
    noSpace(summonerName) {

      summonerName = summonerName.replace(/\s/g, '');
      this.set('proxiedSummonerName', summonerName);
    }
  }
});
