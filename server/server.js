const express = require('express'),
      request = require('request'),
      util = require('util'),
      port = 3000,
      app = express()
      apiConfig = require('./apiConfig'),
      http = require('http');

// CORS related stuff
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});

const apiKey = apiConfig.api_key,
      globalHost = 'https://global.api.pvp.net';

var regionObj = {};

/**
 * This sets the url up for requests
 *
 * @method setUrl
 * @param {string} regionSlug
 * @param {string} namespace
 * @param {string} endpoint
 * @param {string} params
 * @return {string}
 */
function setUrl(regionSlug, namespace, endpoint, params) {

  if (params) {
    return 'https://'+ regionSlug +'.api.pvp.net/' + namespace + params + endpoint;
  } else {
    return 'https://'+ regionSlug +'.api.pvp.net/' + namespace + endpoint;
  }
}
/**
 * Fetch the top three champions using the summonerId of a summoner passed in from
 * the route championmastery in the UI.
 *
 * @query  {object} req.query.summonerId  The summoner ID of the summoner you are
 *                                        searching for.
 * @send   {object} datum                 A homunculus of summoner data specific to
 *                                        the top three champions belonging to any
 *                                        (well currently just any NA summoner :( )
 *                                        summoner ID.
 */
app.get('/topChampions', function(req, res) {

  var datumArr = [],
      datum = {},
      endpoint = '/topchampions',
      i,
      namespace = 'championmastery/location/'+ regionObj.regionTag +'/player/',
      options = {
        dataType: 'json',
        qs: {
          api_key: apiKey
        },
        url: setUrl(regionObj.slug, namespace, endpoint, req.query.summonerId)
      };

  // Fetch champion masteries for the summonerId (query param)
  request(options, function(err, response, body) {

    if (body != null) {

      if (!err && response.statusCode == 200) {

        body = JSON.parse(body);
        var statArr = [];

        // Loop through this bad boy, get me some champion data
        body.forEach( (champion, index) => {

          var championId = champion.championId,
          endpoint = 'champion/' + championId,
          namespace = 'api/lol/static-data/'+ regionObj.slug +'/v1.2/',
          options = {
            dataType: 'json',
            method: 'GET',
            qs: {
              api_key: apiKey,
              champData: 'image'
            },
            url: setUrl(regionObj.slug, namespace, endpoint)
          };

          // Fetch champion data for champion in body
          request(options, function(statErr, statResponse, statBody) {

            statBody = JSON.parse(statBody);

            if (!err && statResponse.statusCode == 200) {
              champion.name = statBody.name;
              champion.image = statBody.image;
              champion.id = index;
              champion.key = statBody.key;
              champion.title = statBody.title;

              statArr.push(champion);
              if (statArr.length == 3) {
                datum.topChampions = statArr;
                console.log(datum)
                res.send(datum);
              }
            } else {
              res.send(statErr);
            }
          });
        });
      } else {
        res.send({});
      }
    } else {
      res.send(err);
    }
  });
});
/**
 * Fetches a player's mastery score for all of their champion masteries
 *
 * @return {Object} Player's mastery score
 */
app.get('/masteryScores', function(req, res) {

  var datum = {},
      endpoint = '/score',
      namespace = 'championmastery/location/'+ regionObj.regionTag +'/player/',
      options = {
        dataType: 'json',
        qs: {
          api_key: apiKey
        },
        url: setUrl(regionObj.slug, namespace, endpoint, req.query.summonerId)
      };

  request(options, function(err, response, body) {
    if (!err && response.statusCode == 200) {
      body = JSON.parse(body);
      datum.masteryScore = {
        id: 0,
        score: body
      }
      console.log(datum);
      res.send(datum);
    } else {
      res.send(err);
    }
  });
});
/**
 * Sets up locale for the application
 *
 * @param  {string} req.params.region_id
 * @return {object}
 */
app.get('/locales/:region_id', function(req, res) {

  var datumArr = [],
      datum = {},
      localeOptions ={
        method: 'GET',
        qs: {
          api_key: apiKey
        },
        url: 'http://status.leagueoflegends.com/shards/' + req.params.region_id
      };

  regionObj.slug = req.params.region_id;

  request(localeOptions, function(err, response, body) {

    body = JSON.parse(body);

    if (!err && response.statusCode == 200) {

      regionObj.regionTag = body.region_tag;

      datum.locale = {
        id: 1,
        region: body.hostname
      }

      res.send(datum);
    } else {

      console.log(err);
    }
  });
});
/**
 * List of all champions and related data to that champion
 *
 * @return {object} List of all champions and related data
 */
// app.get('/champions/:champion_id', function (req, res) {
//
//   var championId = req.params.champion_id,
//       datumArr = [],
//       datum = {},
//       endpoint = 'champion/' + championId,
//       namespace = 'api/lol/static-data/'+ region +'/v1.2/',
//       options = {
//         dataType: 'json',
//         method: 'GET',
//         qs: {
//           api_key: apiKey,
//           champData: 'image'
//         },
//         url: regionHost + namespace + endpoint
//       };
//
//   request(options, function(err, response, body) {
//
//     body = JSON.parse(body);
//
//     if (!err && response.statusCode == 200) {
//       datum.champion = body;
//       res.send(datum);
//     } else {
//
//       console.log(err);
//     }
//   });
// });

/**
 * Fetches all regions
 *
 * @param  {object} req    The request
 * @callback {object} res  The response
 */
app.get('/regions', (req, res) => {

  var i,
      datumArr = [],
      datum = {}
      options = {
        method: 'GET',
        url: 'http://status.leagueoflegends.com/shards'
      };

  request(options, (err, response, body) => {

    if (!err && response.statusCode == 200) {

      var body = JSON.parse(body);

      for (i = 0; i < body.length; i++) {
        datumArr.push({
          id: i,
          region_tag: body[i].region_tag,
          name: body[i].name,
          slug: body[i].slug
        });
      }
    }

    datum.regions = datumArr;
    console.log(datum);

    res.send(datum);
  });
});
/**
 * Fetches the summoner by name. Passed in from the summoner route.
 *
 * @param  {string.number}                    Summoner name
 * @send   {object}        datum.summoner_id  Summoner data specific to the summoner
 *                                            name. Hits the `summoner/by-name/`
 *                                            endpoint.
 */
app.get('/summoners/:summoner_id', (req, res) => {

  var summonerId = req.params.summoner_id,
      endpoint = 'summoner/by-name/'+ summonerId,
      namespace = 'api/lol/'+ regionObj.slug +'/v1.4/',
      options = {
        method: 'GET',
        qs: {
          api_key: apiKey
        },
        url: setUrl(regionObj.slug, namespace, endpoint)
      };

  request(options, (err, response, body) => {

    if (body) {
      if (!err && response.statusCode == 200) {

        var datum = JSON.parse(body);

        res.send(datum[summonerId.toLowerCase()]);
      } else {

        res.send(body);
      }
    } else {
      res.send({});
    }
  });
});

app.listen(port, function () {
  console.log('League app listening on port '+ port +'!');
});
