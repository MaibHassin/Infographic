$(document).ready(function() {
  $.ajax({
    url: 'https://opendata.cbs.nl/ODataApi/odata/80518ENG/TypedDataSet',
    method: 'GET',
    dataType: 'json',
    success: function(data) {

      var lengthCountriesValue = $('#listCountries > option').length;
      var listCountriesValue = $('#listCountries').val();
      var listTypeGraph = $('#typeGraph').val();
      var charachteristicsValue;
      var newChart = document.getElementById('myChart').getContext('2d');

      showData(data.value, listCountriesValue, newChart, listTypeGraph, 'T009002');

      $('#listCountries').add('#typeGraph').change(function() {
        if ($('#allData').is(':checked')) {
          showGraphData('T009002');
        } else if ($('#genderData').is(':checked')) {
          showGenderGraphData();
        } else if ($('#educationData').is(':checked')) {
          showEducationGraphData();
        }
      });

      $('input[name=genderOption]').change(function() {
        showGenderGraphData();
      });

      $('input[name=educationOption]').change(function() {
        showEducationGraphData();
      });

      $('input[name=catagoreyType]').change(function() {
        if ($('#allData').is(':checked')) {
          $('#genderCatagoreyOptions').hide();
          $('#educationCatagoreyOptions').hide();
          showGraphData('T009002');
        } else if ($('#genderData').is(':checked')) {
          $('#genderCatagoreyOptions').show();
          $('#educationCatagoreyOptions').hide();
          showGenderGraphData();
        } else if ($('#educationData').is(':checked')) {
          $('#genderCatagoreyOptions').hide();
          $('#educationCatagoreyOptions').show();
          showEducationGraphData();
        }
      });

      function showGraphData(personalCharacheristicsValue) {
        listCountriesValue = $('#listCountries').val();
        listTypeGraph = $('#typeGraph').val();
        listGenderType = $('#typeGender').val();
        showData(data.value, listCountriesValue, newChart, listTypeGraph, personalCharacheristicsValue);
      }

      function showGenderGraphData() {
        if ($('#maleGender').is(':checked') && $('#femaleGender').is(':checked')) {
          showGraphData('bothGenders');
        } else if ($('#maleGender').is(':checked') && !$('#femaleGender').is(':checked')) {
          showGraphData('onlyMale');
        } else if (!$('#maleGender').is(':checked') && $('#femaleGender').is(':checked')) {
          showGraphData('onlyFemale');
        } else {
          showGraphData('T009002');
        }
      }

      function showEducationGraphData() {
        if($('#lowEducation').is(':checked') &&
          $('#secondaryEducation').is(':checked') &&
          $('#highEducation').is(':checked')) {
            showGraphData('allEducation');
          } else if ($('#lowEducation').is(':checked') &&
            !$('#secondaryEducation').is(':checked') &&
            !$('#highEducation').is(':checked')) {
            showGraphData('onlyLow');
          } else if (!$('#lowEducation').is(':checked') &&
            $('#secondaryEducation').is(':checked') &&
            !$('#highEducation').is(':checked')) {
            showGraphData('onlySecondary');
          } else if (!$('#lowEducation').is(':checked') &&
            !$('#secondaryEducation').is(':checked') &&
            $('#highEducation').is(':checked')) {
            showGraphData('onlyHigh');
          } else if ($('#lowEducation').is(':checked') &&
            $('#secondaryEducation').is(':checked') &&
            !$('#highEducation').is(':checked')) {
            showGraphData('lowAndSecondary');
          } else if ($('#lowEducation').is(':checked') &&
            !$('#secondaryEducation').is(':checked') &&
            $('#highEducation').is(':checked')) {
            showGraphData('lowAndHigh');
          } else if (!$('#lowEducation').is(':checked') &&
            $('#secondaryEducation').is(':checked') &&
            $('#highEducation').is(':checked')) {
            showGraphData('secondaryAndHigh');
          } else {
            showGraphData('T009002');
          }
      }
    },
    error: function() {
      showError();
    },
    timeout: 3000
  });

  function showData(data, countryNumber, myChart, graphType, personalChar) {
    var allData = 'T009002';
    maleData = '3000   ';
    femaleData = '4000   ';
    lowEducationData = '2018700';
    secondaryEducationData = '2018740';
    highEducationData = '2018790';

    var countryName = [
      'Belgium',
      'Bulgaria',
      'Cyprus',
      'Denmark',
      'Germany',
      'Estonia',
      'Finland',
      'France',
      'Hungary',
      'Ireland',
      'Iceland',
      'Italy',
      'Kosovo',
      'Lituania',
      'The Netherlands',
      'Norway',
      'Ukrain',
      'Poland',
      'Portugal',
      'Slovenia',
      'Slovakia',
      'Spain',
      'Czech Republic',
      'United Kingdom',
      'Sweden',
      'Switzerland',
      'Europe Average'
    ];
    var otherPeopleData = [],
      legalSystemData = [],
      policeData = [],
      politiciansData = [],
      parliamentData = [],
      polititcalPartiesData = [],
      europeanParliamentData = [],
      unitedNationsData = [];

    var countryValues;

    var all = [],
      dataValues;

    var graphDataValues = [
      otherPeopleData[countryNumber], legalSystemData[countryNumber], policeData[countryNumber],
      politiciansData[countryNumber], parliamentData[countryNumber], polititcalPartiesData[countryNumber],
      europeanParliamentData[countryNumber], unitedNationsData[countryNumber]
    ];

    if (personalChar == allData) {
      graphAllData(personalChar);
    } else if (personalChar == 'bothGenders') {
      graphGenderData(personalChar);
    } else if (personalChar == 'onlyMale') {
      graphGenderData(personalChar);
    } else if (personalChar == 'onlyFemale') {
      graphGenderData(personalChar);
    } else if (personalChar == 'onlyLow') {
      graphEducationData(personalChar);
    } else if (personalChar == 'onlySecondary') {
      graphEducationData(personalChar);
    } else if (personalChar == 'onlyHigh') {
      graphEducationData(personalChar);
    } else if (personalChar == 'lowAndSecondary') {
      graphEducationData(personalChar);
    } else if (personalChar == 'lowAndHigh') {
      graphEducationData(personalChar);
    } else if (personalChar == 'secondaryAndHigh') {
      graphEducationData(personalChar);
    } else if (personalChar == 'allEducation') {
      graphEducationData(personalChar);
    }

    function showAllData(personalCharachter, val, peopleType, colorGraph, borderGraph) {
      var otherPeopleTotal = 0,
        legalSystemTotal = 0,
        policeTotal = 0,
        politiciansTotal = 0,
        parliamentTotal = 0,
        polititcalPartiesTotal = 0,
        europeanParliamentTotal = 0,
        unitedNationsTotal = 0;

      otherPeopleData = [];
      legalSystemData = [];
      policeData = [];
      politiciansData = [];
      parliamentData = [];
      polititcalPartiesData = [];
      europeanParliamentData = [];
      unitedNationsData = [];

      $(data).each(function(index, value) {
        countryValues = value.Countries != 'L008635' &&
          value.Countries != 'L008724' &&
          value.Countries != 'L008615' &&
          value.Countries != 'L008654' &&
          value.Countries != 'L008709';

        if (value.Periods == '2012JJ00' && countryValues) {
          if (value.PersonalCharacteristics == personalCharachter) {
            otherPeopleData.push(value.OtherPeople_9);
            legalSystemData.push(value.LegalSystem_10);
            policeData.push(value.Police_11);
            politiciansData.push(value.Politicians_12);
            parliamentData.push(value.Parliament_13);
            polititcalPartiesData.push(value.PoliticalParties_14);
            europeanParliamentData.push(value.EuropeanParliament_15);
            unitedNationsData.push(value.UnitedNations_16);

            otherPeopleTotal += value.OtherPeople_9;
            legalSystemTotal += value.LegalSystem_10;
            policeTotal += value.Police_11;
            politiciansTotal += value.Politicians_12;
            parliamentTotal += value.Parliament_13;
            polititcalPartiesTotal += value.PoliticalParties_14;
            europeanParliamentTotal += value.EuropeanParliament_15;
            unitedNationsTotal += value.UnitedNations_16;
          }
        }
      });
      otherPeopleData[26] = otherPeopleTotal / 26;
      legalSystemData[26] = legalSystemTotal / 26;
      policeData[26] = policeTotal / 26;
      politiciansData[26] = politiciansTotal / 26;
      parliamentData[26] = parliamentTotal / 26;
      polititcalPartiesData[26] = polititcalPartiesTotal / 26;
      europeanParliamentData[26] = europeanParliamentTotal / 26;
      unitedNationsData[26] = unitedNationsTotal / 26;

      all[val] = {
        label: '2012 - ' + countryName[countryNumber] + ' percentage of' + peopleType + 'with trust in',
        data: [
          otherPeopleData[countryNumber], legalSystemData[countryNumber], policeData[countryNumber],
          politiciansData[countryNumber], parliamentData[countryNumber], polititcalPartiesData[countryNumber],
          europeanParliamentData[countryNumber], unitedNationsData[countryNumber]
        ],
        backgroundColor: colorGraph,
        borderWidth: 3,
        borderColor: borderGraph,
        hoverBorderWidth: 4,
        hoverBorderColor: colorGraph
      };
    }

    function graphAllData(PersonalCharacteristicsCondition) {
      showAllData(PersonalCharacteristicsCondition, 0, ' people ', '#343b47');
      if (window.bar != undefined) {
        window.bar.destroy();
      }

      dataValues = {
        type: graphType,
        data: {
          labels: [
            'Other People', 'Legal System', 'Police',
            'Politicians', 'Parliment', 'Political Parties',
            'European Parliment', 'United Nations'
          ],
          datasets: [all[0]]
        },
        options: {}
      };
      window.bar = new Chart(myChart, dataValues);
    }

    function graphGenderData(PersonalCharacteristicsCondition) {
      if (PersonalCharacteristicsCondition == 'onlyMale') {
        showAllData(maleData, 0, ' males ', '#2965ce');
        if (window.bar != undefined) {
          window.bar.destroy();
        }
        dataValues = {
          type: graphType,
          data: {
            labels: [
              'Other People', 'Legal System', 'Police',
              'Politicians', 'Parliment', 'Political Parties',
              'European Parliment', 'United Nations'
            ],
            datasets: [all[0]]
          },
          options: {}
        };
        window.bar = new Chart(myChart, dataValues);
      } else if (PersonalCharacteristicsCondition == 'onlyFemale') {
        showAllData(femaleData, 0, ' females ', '#ce2997');
        if (window.bar != undefined) {
          window.bar.destroy();
        }

        dataValues = {
          type: graphType,
          data: {
            labels: [
              'Other People', 'Legal System', 'Police',
              'Politicians', 'Parliment', 'Political Parties',
              'European Parliment', 'United Nations'
            ],
            datasets: [all[0]]
          },
          options: {}
        };
        window.bar = new Chart(myChart, dataValues);
      } else if (PersonalCharacteristicsCondition == 'bothGenders') {
        if(graphType == 'radar') {
          showAllData(maleData, 0, ' males ', 'rgba(0,0,0,0)',  'rgba(41, 98, 206, 0.75)');
          showAllData(femaleData, 1, ' females ', 'rgba(0,0,0,0)', 'rgba(206, 41, 151, 0.75)');
        } else {
          showAllData(maleData, 0, ' males ', 'rgba(41, 98, 206)');
          showAllData(femaleData, 1, ' females ', 'rgba(206, 41, 151)');
        }

        if (window.bar != undefined) {
          window.bar.destroy();
        }

        dataValues = {
          type: graphType,
          data: {
            labels: [
              'Other People', 'Legal System', 'Police',
              'Politicians', 'Parliment', 'Political Parties',
              'European Parliment', 'United Nations'
            ],
            datasets: [all[0], all[1]]
          },
          options: {}
        };
        window.bar = new Chart(myChart, dataValues);
      }
    }

    function graphEducationData(PersonalCharacteristicsCondition) {
      if (PersonalCharacteristicsCondition == 'onlyLow') {
        showAllData(lowEducationData, 0, ' low educated people ', 'rgb(41, 206, 109)');

        if (window.bar != undefined) {
          window.bar.destroy();
        }

        dataValues = {
          type: graphType,
          data: {
            labels: [
              'Other People', 'Legal System', 'Police',
              'Politicians', 'Parliment', 'Political Parties',
              'European Parliment', 'United Nations'
            ],
            datasets: [all[0]]
          },
          options: {}
        };
        window.bar = new Chart(myChart, dataValues);
      } else if (PersonalCharacteristicsCondition == 'onlySecondary') {
        showAllData(secondaryEducationData, 0, ' secondary educated people ', 'rgb(206, 134, 41)');

        if (window.bar != undefined) {
          window.bar.destroy();
        }

        dataValues = {
          type: graphType,
          data: {
            labels: [
              'Other People', 'Legal System', 'Police',
              'Politicians', 'Parliment', 'Political Parties',
              'European Parliment', 'United Nations'
            ],
            datasets: [all[0]]
          },
          options: {}
        };
        window.bar = new Chart(myChart, dataValues);
      } else if (PersonalCharacteristicsCondition == 'onlyHigh') {
        showAllData(highEducationData, 0, ' high educated people ', 'rgb(206, 41, 41)');

        if (window.bar != undefined) {
          window.bar.destroy();
        }

        dataValues = {
          type: graphType,
          data: {
            labels: [
              'Other People', 'Legal System', 'Police',
              'Politicians', 'Parliment', 'Political Parties',
              'European Parliment', 'United Nations'
            ],
            datasets: [all[0]]
          },
          options: {}
        };
        window.bar = new Chart(myChart, dataValues);
      } else if (PersonalCharacteristicsCondition == 'lowAndSecondary') {
        if (graphType == 'radar') {
          showAllData(lowEducationData, 0, ' low educated people ', 'rgba(0,0,0,0)', 'rgba(41, 206, 109, 0.75)');
          showAllData(secondaryEducationData, 1, ' secondary educated people ', 'rgba(0,0,0,0)', 'rgba(206, 134, 41, 0.75)');

        } else {
          showAllData(lowEducationData, 0, ' low educated people ', 'rgb(41, 206, 109)');
          showAllData(secondaryEducationData, 1, ' secondary educated people ', 'rgb(206, 134, 41)');
        }

        if (window.bar != undefined) {
          window.bar.destroy();
        }

        dataValues = {
          type: graphType,
          data: {
            labels: [
              'Other People', 'Legal System', 'Police',
              'Politicians', 'Parliment', 'Political Parties',
              'European Parliment', 'United Nations'
            ],
            datasets: [all[0], all[1]]
          },
          options: {}
        };
        window.bar = new Chart(myChart, dataValues);
      } else if (PersonalCharacteristicsCondition == 'lowAndHigh') {
        if (graphType == 'radar') {
          showAllData(lowEducationData, 0, ' low educated people ', 'rgba(0,0,0,0)', 'rgba(41, 206, 109, 0.75)');
          showAllData(highEducationData, 1, ' high educated people ', 'rgba(0,0,0,0)', 'rgba(206, 41, 41, 0.75)');

        } else {
          showAllData(lowEducationData, 0, ' low educated people ', 'rgb(41, 206, 109)');
          showAllData(highEducationData, 1, ' high educated people ', 'rgb(206, 41, 41)');
        }

        if (window.bar != undefined) {
          window.bar.destroy();
        }

        dataValues = {
          type: graphType,
          data: {
            labels: [
              'Other People', 'Legal System', 'Police',
              'Politicians', 'Parliment', 'Political Parties',
              'European Parliment', 'United Nations'
            ],
            datasets: [all[0], all[1]]
          },
          options: {}
        };
        window.bar = new Chart(myChart, dataValues);
      } else if (PersonalCharacteristicsCondition == 'secondaryAndHigh') {
        if (graphType == 'radar') {
          showAllData(secondaryEducationData, 0, ' secondary educated people ', 'rgba(0,0,0,0)', 'rgba(206, 134, 41, 0.75)');
          showAllData(highEducationData, 1, ' high educated people ', 'rgba(0,0,0,0)', 'rgba(206, 41, 41, 0.75)');

        } else {
          showAllData(secondaryEducationData, 0, ' secondary educated people ', 'rgb(206, 134, 41)');
          showAllData(highEducationData, 1, ' high educated people ', 'rgb(206, 41, 41)');
        }

        if (window.bar != undefined) {
          window.bar.destroy();
        }

        dataValues = {
          type: graphType,
          data: {
            labels: [
              'Other People', 'Legal System', 'Police',
              'Politicians', 'Parliment', 'Political Parties',
              'European Parliment', 'United Nations'
            ],
            datasets: [all[0], all[1]]
          },
          options: {}
        };
        window.bar = new Chart(myChart, dataValues);
      } else if (PersonalCharacteristicsCondition == 'allEducation') {
        if (graphType == 'radar') {
          showAllData(lowEducationData, 0, ' low educated people ', 'rgba(0,0,0,0)', 'rgba(41, 206, 109, 0.75)');
          showAllData(secondaryEducationData, 1, ' secondary educated people ', 'rgba(0,0,0,0)', 'rgba(206, 134, 41, 0.75)');
          showAllData(highEducationData, 2, ' high educated people', 'rgba(0,0,0,0)', 'rgba(206, 41, 41, 0.75)');
        } else {
          showAllData(lowEducationData, 0, ' low educated people ', 'rgb(41, 206, 109)');
          showAllData(secondaryEducationData, 1, ' secondary educated people ', 'rgb(206, 134, 41)');
          showAllData(highEducationData, 2, ' high educated people ', 'rgb(206, 41, 41)');
        }


        if (window.bar != undefined) {
          window.bar.destroy();
        }

        dataValues = {
          type: graphType,
          data: {
            labels: [
              'Other People', 'Legal System', 'Police',
              'Politicians', 'Parliment', 'Political Parties',
              'European Parliment', 'United Nations'
            ],
            datasets: [all[0], all[1], all[2]]
          },
          options: {}
        };
        window.bar = new Chart(myChart, dataValues);
      }
    }
  }

  function showError() {
    $('#content').html('Could not load the data, please refresh the page');
  }
});
