var mainController = function (nav) {

  var getIndex = function (req, res) {

    res.render('index', {
      title: 'Books I\'ve Read',
      nav: nav
    });

  }

  var getEvilPerson = function (req, res) {

    res.render('evilPerson', {
      title: 'Books I\'ve Read',
      nav: nav
    });

  }

  return {
    getIndex: getIndex,
    getEvilPerson: getEvilPerson
  }

}

module.exports = mainController;