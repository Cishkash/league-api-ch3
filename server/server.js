const express = require('express'),
      request = require('request'),
      thenRequest = require('then-request'),
      util = require('util'),
      port = 3000,
      app = express();

// CORS related stuff
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});

const apiKey = '69612dd0-f97f-4a10-95e5-fedfb53120e6',
      region = 'na',
      globalHost = 'https://global.api.pvp.net',
      regionHost = 'https://na.api.pvp.net/';

/**
 * A failed attempt at using node utils to create interpolated hosts... Just tell
 * me I'm pretty.
 *
 * @todo                     Fix this.
 * @param  {string} regionId Pass in the region slug and like magic nothing happens
 * @return {string}          A string for the appropriate host
 */
function hostConfig(regionId) {

  return util.format(regionHost, regionId);
}

/**
 * Fetch the top three champions using the summonerId of a summoner passed in from
 * the route championmastery in the UI.
 *
 * @query  {object} req.query.summonerId  The summoner ID of the summoner you are
 *         																searching for.
 * @send   {object} datum                 A homunculus of summoner data specific to
 *         																the top three champions belonging to any
 *         																(well currently just any NA summoner :( )
 *         																summoner ID.
 */
app.get('/topChampions', function(req, res) {

  var datumArr = [],
      datum = {},
      endpoint = '/topchampions',
      i,
      namespace = 'championmastery/location/NA1/player/',
      options = {
        dataType: 'json',
        qs: {
          api_key: apiKey
        },
        url: regionHost + namespace + req.query.summonerId + endpoint
      };

  // Fetch champion masteries for the summonerId (query param)
  request(options, function(err, response, body) {

    if (!err && response.statusCode == 200) {

      body = JSON.parse(body);
      var statArr = [];

      // Loop through this bad boy, get me some champion data
      body.forEach( (champion, index) => {

        var championId = champion.championId,
            endpoint = 'champion/' + championId,
            namespace = 'api/lol/static-data/'+ region +'/v1.2/',
            options = {
              dataType: 'json',
              method: 'GET',
              qs: {
                api_key: apiKey,
                champData: 'image'
              },
              url: regionHost + namespace + endpoint
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
            console.log(err);
          }
        });
      });
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

    res.send(datum);
  });
});

/**
 * Look away, nothing to see here. Was a WIP, got distracted a bit. Now it's an
 * orphan and it keeps asking "Please sir, can I have some more".
 *
 * @todo                        Needs fixing, so much I forgot its purpose
 */
app.get('setRegion/:region_id', (req, res) => {

  var regionId = req.params.region_id,
      jsonObj = {};

  activeRegion = regionId || region;

  hostConfig(activeRegion);

  jsonObj = {
    data: {
      type: 'setRegion',
      host_set: hostConfig(activeRegion),
      region_set: activeRegion
    }
  }

  res.send(jsonObj);
});


/**
 * Fetches the summoner by name. Passed in from the summoner route.
 *
 * @param  {string.number}                    Summoner name
 * @send   {object}        datum.summoner_id  Summoner data specific to the summoner
 *         																		name. Hits the `summoner/by-name/`
 *         																		endpoint.
 */
app.get('/summoners/:summoner_id', (req, res) => {

  var summonerId = req.params.summoner_id,
      regionId = region,
      endpoint = 'summoner/by-name/'+ summonerId,
      namespace = 'api/lol/'+ regionId +'/v1.4/',
      options = {
        method: 'GET',
        qs: {
          api_key: apiKey
        },
        url: regionHost + namespace + endpoint
      };

  request(options, (err, response, body) => {

    if (!err && response.statusCode == 200) {

      var datum = JSON.parse(body);

      res.send(datum[summonerId.toLowerCase()]);
    } else {

      console.log(err);
    }
  });
});

app.listen(port, function () {
  console.log('League app listening on port '+ port +'!');
});
