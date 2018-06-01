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

      $('#listCountries').add('#typeGraph').add('#typeGender').change(function() {
        if($('#allData').is(':checked')){
          listCountriesValue = $('#listCountries').val();
          listTypeGraph = $('#typeGraph').val();
          listGenderType = $('#typeGender').val();
          showData(data.value, listCountriesValue, newChart, listTypeGraph, 'T009002');
        }
      });

      $('input[name="catagoreyType"]').change(function() {
        if($('#genderData').is(':checked')) {
          $('#educationCatagoreyOptions').hide();
          $('#genderCatagoreyOptions').show();
          listCountriesValue = $('#listCountries').val();
          listTypeGraph = $('#typeGraph').val();
          listGenderType = $('#typeGender').val();
          showData(data.value, listCountriesValue, newChart, listTypeGraph, 'both');
          $('#allGenders').change(function() {
            if($('#allGenders').is(':checked')) {
              $('#maleGender').prop('checked', true);
              $('#femaleGender').prop('checked', true);
              listCountriesValue = $('#listCountries').val();
              listTypeGraph = $('#typeGraph').val();
              listGenderType = $('#typeGender').val();
              showData(data.value, listCountriesValue, newChart, listTypeGraph, 'both');
            } else {
              $('#maleGender').prop('checked', false);
              $('#femaleGender').prop('checked', false);
            }
          });

          $('#maleGender').add('#femaleGender').change(function() {
            if(!$('#maleGender').is(':checked') || !$('#femaleGender').is(':checked')) {
              $('#allGenders').prop('checked', false);
              if($('#maleGender').is(':checked')) {
                listCountriesValue = $('#listCountries').val();
                listTypeGraph = $('#typeGraph').val();
                listGenderType = $('#typeGender').val();
                showData(data.value, listCountriesValue, newChart, listTypeGraph, '3000   ');
              }

              if($('#femaleGender').is(':checked')) {
                console.log('works');
                listCountriesValue = $('#listCountries').val();
                listTypeGraph = $('#typeGraph').val();
                listGenderType = $('#typeGender').val();
                showData(data.value, listCountriesValue, newChart, listTypeGraph, '4000   ');
              }
            } else if ($('#maleGender').is(':checked') && $('#femaleGender').is(':checked')) {
              $('#allGenders').prop('checked', true);
            }
          });
        } else if ($('#educationData').is(':checked')) {
          $('#genderCatagoreyOptions').hide();
          $('#educationCatagoreyOptions').show();
        } else {
          $('#genderCatagoreyOptions').hide();
          $('#educationCatagoreyOptions').hide();
        }
      });
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

    if(personalChar == allData) {
      showAllData(allData);

      var all = {
        label: '2012 - ' + countryName[i] + ' percentage of people with trust in',
        data:[
          otherPeopleData[i], legalSystemData[i], policeData[i],
          politiciansData[i], parliamentData[i], polititcalPartiesData[i],
          europeanParliamentData[i], unitedNationsData[i]
        ]
      };


      showAllData(maleData);
      var all2 = {
        label: '2012 - ' + countryName[i] + ' percentage2 of people with trust in',
        data:[
          otherPeopleData[i], legalSystemData[i], policeData[i],
          politiciansData[i], parliamentData[i], polititcalPartiesData[i],
          europeanParliamentData[i], unitedNationsData[i]
        ]
      };
      if(window.bar != undefined) {
        window.bar.destroy();
      }

      var test = {
        type: graphType,
        data: {
          labels:[
            'Other People', 'Legal System', 'Police',
            'Politicians', 'Parliment', 'Political Parties',
            'European Parliment', 'United Nations'
          ],
          datasets: [all, all2]
        },
        options: {}
      };
      window.bar = new Chart(myChart, test);
    }



    function showAllData(test) {
      var otherPeopleTotal = 0,
          legalSystemTotal = 0,
          policeTotal = 0,
          politiciansTotal = 0,
          parliamentTotal = 0,
          polititcalPartiesTotal = 0,
          europeanParliamentTotal = 0,
          unitedNationsTotal = 0;

      $(data).each(function(index, value) {
        countryValues = value.Countries != 'L008635' &&
                        value.Countries != 'L008724' &&
                        value.Countries != 'L008615' &&
                        value.Countries != 'L008654' &&
                        value.Countries != 'L008709';

        if(value.Periods == '2012JJ00' &&
          countryValues) {
            if(value.PersonalCharacteristics == test){
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
    }
  }



  function showError() {
    $('#content').html('Could not load the data, please refresh the page');
  }
});
