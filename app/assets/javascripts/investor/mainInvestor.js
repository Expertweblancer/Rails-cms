var projectViewModel = null;
var projectssArray = [];

function countUp(count)
{
    var div_by = 100,
            speed = Math.round(count / div_by),
            $display = $('.count'),
            run_count = 1,
            int_speed = 24;

    var int = setInterval(function () {
        if (run_count < div_by) {
            $display.text(speed * run_count);
            run_count++;
        } else if (parseInt($display.text()) < count) {
            var curr_count = parseInt($display.text()) + 1;
            $display.text(curr_count);
        } else {
            clearInterval(int);
        }
    }, int_speed);
}

countUp(495);

function countUp2(count)
{
    var div_by = 100,
            speed = Math.round(count / div_by),
            $display = $('.count2'),
            run_count = 1,
            int_speed = 24;

    var int = setInterval(function () {
        if (run_count < div_by) {
            $display.text(speed * run_count);
            run_count++;
        } else if (parseInt($display.text()) < count) {
            var curr_count = parseInt($display.text()) + 1;
            $display.text(curr_count);
        } else {
            clearInterval(int);
        }
    }, int_speed);
}

countUp2(947);

function countUp3(count)
{
    var div_by = 100,
            speed = Math.round(count / div_by),
            $display = $('.count3'),
            run_count = 1,
            int_speed = 24;

    var int = setInterval(function () {
        if (run_count < div_by) {
            $display.text(speed * run_count);
            run_count++;
        } else if (parseInt($display.text()) < count) {
            var curr_count = parseInt($display.text()) + 1;
            $display.text(curr_count);
        } else {
            clearInterval(int);
        }
    }, int_speed);
}

countUp3(328);

function countUp4(count)
{
    var div_by = 100,
            speed = Math.round(count / div_by),
            $display = $('.count4'),
            run_count = 1,
            int_speed = 24;

    var int = setInterval(function () {
        if (run_count < div_by) {
            $display.text(speed * run_count);
            run_count++;
        } else if (parseInt($display.text()) < count) {
            var curr_count = parseInt($display.text()) + 1;
            $display.text(curr_count);
        } else {
            clearInterval(int);
        }
    }, int_speed);
}

countUp4(10328);

var projectsViewModelOperation = {
    projectViewModel: function () {
        var self = this;
    },
    ini: function () {
        projectViewModel = new projectsViewModelOperation.projectViewModel();
        projectsViewModelOperation.getMember();
        projectsViewModelOperation.getUser();
        projectsViewModelOperation.getProjectAuthor();
        ko.applyBindings(projectViewModel, $('#userViewModel')[0]);
    },
    getMember: function () {
        self.info = ko.observableArray([]);
        self.lenght = ko.observableArray([]);

        $.ajax({
            type: 'GET',
            url: mainUrl +'projects',
            success: function (data) {
                var m = [];
                m = data.projects;
                m.forEach(function (entry) {
                    var x = []
                    x = entry.investors;
                    x.forEach(function (invest) {
                        if (invest.id == user_id) {
                            self.info.push(entry);
                        }
                    });
                });
                //console.log("dataaaaa", self.info());
                var length = self.info().length;
                self.lenght.push(length);
            }

        });

    },
    getProjectAuthor: function () {
        self.author = ko.observableArray([]);
        self.leng = ko.observableArray([]);

        $.ajax({
            type: 'GET',
            url: mainUrl +'authorships',
            success: function (data) {
                var m = [];
                m = data.authorships;
                m.forEach(function (author) {
                    if (author.user_id == user_id) {
                        self.author.push(author);
                    }
                });
                //console.log("dataaaaa", self.info());
                var length = self.author().length;
                console.log("length", length);

                self.leng.push(length);
                console.log("self", self.leng());
            }

        });

    },
    getUser: function () {
        self.getUser = ko.observableArray([]);

        $.ajax({
            type: 'GET',
            url: mainUrl +'users/' + user_id,
            success: function (data) {
                self.getUser(data);
                console.log("details", self.getUser());
            }
        });

    },
}

$(document).ready(function () {
    projectsViewModelOperation.ini();

});




