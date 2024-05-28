function computeAge() { 
    var birth = new Date("2002-05-27");
    var today = new Date();
    var yearToday = today.getFullYear();
    var monthToday = today.getMonth() + 1;
    var dayToday = today.getDate();

    var yearBirth = birth.getFullYear();
    var monthBirth = birth.getMonth() + 1;
    var dayBirth = birth.getDate();

    var age = yearToday - yearBirth;

    if (monthToday < monthBirth || (monthToday === monthBirth && dayToday < dayBirth)) {
        age--;
    }

    return age;
}

var age = computeAge();
$("#age").text(age);
