document.addEventListener("DOMContentLoaded",()=>{
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDarkMode) {
    }
})

$(document).ready(function() {
    var username = 'charlesl46';
    var apiUrl = 'https://api.github.com/users/' + username + '/events/public';

    $.ajax({
        url: apiUrl,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            var contributions = data.filter(function(event) {
                return event.type === 'PushEvent';
            });
            var latestContribution = contributions[0];
            if (latestContribution) {
                console.log(latestContribution);
                var repoName = latestContribution.repo.name;
                var commitMessage = latestContribution.payload.commits[0].message;
                var date = latestContribution.created_at;
                var dateObject = new Date(date);
                var day = dateObject.getUTCDate();
                var month = dateObject.getUTCMonth() + 1;
                var year = dateObject.getUTCFullYear();

                var formattedDate = `${day}/${month}/${year.toString().slice(-2)}`;

                console.log("dernière contrib : ",repoName,commitMessage);
                $("#recentworks").removeClass("loading");
                $("#recentworks").html(`
                    <div style="font-size: large;" class="ui feed">
                        <div class="event">
                          <div class="label">
                            <i class="check icon"></i>
                          </div>
                          <div class="content">
                            <div class="summary">
                               <a href="https://github.com/${repoName}">${repoName}</a> - <em>${commitMessage}</em>
                              <div class="date">${formattedDate}</div>
                            </div>
                          </div>
                        </div>
                    </div>
                    `)
            } else {
                console.log("aucune contrib récente")
            }
        },
        error: function(err) {
            console.log(err);
        }
    });
});

