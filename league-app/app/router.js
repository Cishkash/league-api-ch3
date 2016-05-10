import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map( function() {
  this.route('/', () => {
    this.route('summoner', {path: '/summoner/:summoner_name'}, function() {
      this.route('championmastery', {path: 'championmastery'})
    });
  });
});

export default Router;
