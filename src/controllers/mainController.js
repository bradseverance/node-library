var mainController = function (nav) {

  var getIndex = function (req, res) {

    res.render('index', {
      title: 'Home',
      nav: nav
    });

  };

  var getEvilPerson = function (req, res) {

    res.render('evilPerson', {
      title: 'You\'re Evil',
      nav: nav
    });

  };

  return {
    getIndex: getIndex,
    getEvilPerson: getEvilPerson
  };

};

module.exports = mainController;