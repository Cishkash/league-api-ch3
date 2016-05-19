import Ember from 'ember';

export default Ember.Service.extend({
  /**
   * Locale of the region specific to the user's search
   *
   * @property localeName
   */
  localeName: 'North America',
  /**
   * Locale slug of the region specific to the user's search
   *
   * @property localeSlug
   */
  localeSlug: 'na',
  /**
   * Toggle the locale dropdown. WIP simply not enough time to rework the backend
   * to support this.
   *
   * @type {Boolean}
   */
  toggleLocale: true
});
