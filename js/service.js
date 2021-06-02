const urlApiCompetition = 'https://api.football-data.org/v2/competitions';


$(document).ready(() => {

    getCompetitions();

});

function getCompetitions() {
    $.ajax({
        url: urlApiCompetition,
        type: 'GET',
    })
        .done((values) => {
            showCompetitions(formatCompetition(values));
            $('#brasil-button').click(() => {
                $('.competicoes').remove();
                showCompetitions(formatCompetition(values, 'Brazil'));
            });
        })
        .fail((msg) => {
            console.log(msg);
        });
};


function showCompetitions(competitions) {


    for (let i = 0; i < competitions.length; i++) {
        $('#competition-data').append('<tr class="competicoes">' +
            '<td class="text-center">' + competitions[i].pais + '</td>' +
            '<td class="text-center">' + competitions[i].competicao + '</td>' +
            '<td class="text-center">' + competitions[i].dataDeinicio + '</td>' +
            '</tr>');
    }



};

function formatCompetition(values, flag) {
    let formatedCompetition = [];
    let brazilianCompetitions = [];

    for (let i = 0; i < values.competitions.length; i++) {

        let competition = {
            pais: values.competitions[i].area.name,
            competicao: values.competitions[i].name,
            dataDeinicio: ''
        };

        if (values.competitions[i].currentSeason === null) {
            competition.dataDeinicio = 'Data de início não informada';
        } else {
            competition.dataDeinicio = formatDate(values.competitions[i].currentSeason.startDate);
        }

        if (values.competitions[i].area.name === 'Brazil') {
            brazilianCompetitions.push(competition);
        }
        formatedCompetition.push(competition);
    }

    return flag === 'Brazil' ? brazilianCompetitions : formatedCompetition;
}

function formatDate(date) {
    let formatedDate = date.split('-');

    return `${formatedDate[2]}-${formatedDate[1]}-${formatedDate[0]}`;
}


