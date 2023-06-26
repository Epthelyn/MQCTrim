(() => {
    $.ajax({
        url: 'https://taskman.rs/api/tasks',
        dataType: 'JSON',
        success: function(data){
            let tasksToUpdate = data.filter(task => {
                return task.published && task.mqc && !task.trim;
            });

            let byTier = {
                Beginner: tasksToUpdate.filter(t => t.tier_id == 1),
                Easy: tasksToUpdate.filter(t => t.tier_id == 2),
                Medium: tasksToUpdate.filter(t => t.tier_id == 3),
                Hard: tasksToUpdate.filter(t => t.tier_id == 4),
                Elite: tasksToUpdate.filter(t => t.tier_id == 5),
                Master: tasksToUpdate.filter(t => t.tier_id == 6),
                Legendary: tasksToUpdate.filter(t => t.tier_id == 7),
                God: tasksToUpdate.filter(t => t.tier_id == 8),
                Passive: tasksToUpdate.filter(t => t.tier_id == 9),
            }

            let pageHTML = "";
            for(k in byTier){
                pageHTML += `
                <b><u>${k}</u><b>
                <br>
                    ${byTier[k].map(t => `<a target="_blank" href="https://taskman.rs/admin/resources/tasks/${t.id}/edit">${t.hash_id} - ${t.title}</a>`).join("<br>")}
                <br>
                <hr>
                `;
            }

            document.body.innerHTML = pageHTML;
        }
    });
})();
