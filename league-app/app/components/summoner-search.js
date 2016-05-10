import Ember from 'ember';
const { inject } = Ember;

export default Ember.Component.extend({
  global: inject.service(),
  user: inject.service(),

  // Action
  actions: {

    /**
     * This will eventually be useful. For now, this is shelved.
     * It's purpose however, is to set the user locale when searching for a summoner
     * specific to a certain region.
     *
     * @todo Adjust the locale to a query-param? maybe? probably best as a dynamic
     *       segment
     * @param  {string} localeName The full name of the locale (ie. "North America")
     * @param  {string} localeSlug The abbr of the locale (ie. "na")
     * @method
     */
    didSelectLocale(localeName, localeSlug) {

      var userService = this.get('user');

      userService.set('localeName', localeName);
      userService.set('localeSlug', localeSlug);
    }
  }
});
