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

      showData(data.value, listCountriesValue, newChart, listTypeGraph , 'T009002');

      $('#listCountries').add('#typeGraph').change(function() {
        if($('#allData').is(':checked')){
          showGraphData('T009002');
        } else if ($('#genderData').is(':checked')) {
          showGraphData('bothGenders');
        } else if ($('#educationData').is(':checked')) {
          showGraphData('allEducation');
        }
      });

      function showGraphData(personalCharacheristicsValue) {
        listCountriesValue = $('#listCountries').val();
        listTypeGraph = $('#typeGraph').val();
        listGenderType = $('#typeGender').val();
        showData(data.value, listCountriesValue, newChart, listTypeGraph, personalCharacheristicsValue);
      }
    },
    error: function() {
      showError();
    },
    timeout: 3000
  });

  function showData(data, i, myChart, graphType, personalChar) {
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

    var all = [], dataValues;

    var graphDataValues =[
      otherPeopleData[i], legalSystemData[i], policeData[i],
      politiciansData[i], parliamentData[i], polititcalPartiesData[i],
      europeanParliamentData[i], unitedNationsData[i]
    ];

    if(personalChar == allData) {
      graphAllData(personalChar);
    } else if(personalChar == 'bothGenders') {
      graphGenderData(personalChar);
    } else if (personalChar == 'allEducation') {
      graphEducationData(personalChar);
    }

    function showAllData(personalCharachter, val) {
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

        if(value.Periods == '2012JJ00' && countryValues) {
          if(value.PersonalCharacteristics == personalCharachter){
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
      otherPeopleData[26] = otherPeopleTotal/26;
      legalSystemData[26] = legalSystemTotal/26;
      policeData[26] = policeTotal/26;
      politiciansData[26] = politiciansTotal/26;
      parliamentData[26] = parliamentTotal/26;
      polititcalPartiesData[26] = polititcalPartiesTotal/26;
      europeanParliamentData[26] = europeanParliamentTotal/26;
      unitedNationsData[26] = unitedNationsTotal/26;

      all[val] = {
        label: '2012 - ' + countryName[i] + ' percentage of people with trust in',
        data:[
          otherPeopleData[i], legalSystemData[i], policeData[i],
          politiciansData[i], parliamentData[i], polititcalPartiesData[i],
          europeanParliamentData[i], unitedNationsData[i]
        ]
      };
    }

    function graphAllData(PersonalCharacteristicsCondition) {
      showAllData(PersonalCharacteristicsCondition, 0);
      if(window.bar != undefined) {
        window.bar.destroy();
      }

      dataValues = {
        type: graphType,
        data: {
          labels:[
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
      if(PersonalCharacteristicsCondition == 'onlyMale') {
        showAllData(maleData, 0);
        if(window.bar != undefined) {
          window.bar.destroy();
        }
        dataValues = {
          type: graphType,
          data: {
            labels:[
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
        showAllData(femaleData, 0);
        if(window.bar != undefined) {
          window.bar.destroy();
        }

        dataValues = {
          type: graphType,
          data: {
            labels:[
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
        showAllData(maleData, 0);
        showAllData(femaleData, 1);

        if(window.bar != undefined) {
          window.bar.destroy();
        }

        dataValues = {
          type: graphType,
          data: {
            labels:[
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
      if(PersonalCharacteristicsCondition == 'allEducation') {
        showAllData(lowEducationData, 0);
        showAllData(secondaryEducationData, 1);
        showAllData(highEducationData, 2);

        if(window.bar != undefined) {
          window.bar.destroy();
        }

        dataValues = {
          type: graphType,
          data: {
            labels:[
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
