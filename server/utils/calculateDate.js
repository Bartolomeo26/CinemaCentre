module.exports.calculateDate = () =>
{
    var today = new Date();
  
    var day = today.getDate();
    var month = today.getMonth() + 1; // Miesiące są numerowane od 0 do 11
    var year = today.getFullYear();
  
    // Dodanie wiodących zer, jeśli dzień lub miesiąc są mniejsze niż 10
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
  
    var date = day + '/' + month + '/' + year;
    return date;
}