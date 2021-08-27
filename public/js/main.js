$( document ).ready(function() {
    $(".parent-spinner").fadeOut(1000)
 });

function getID(id){
    document.getElementById('delete').value=id
}

function Edit(id){
    title=document.getElementById('title'+id).innerText
    desc=document.getElementById('desc'+id).innerText
    document.getElementById('Modaltitle').value=title
    document.getElementById('Modaldesc').value=desc

    document.getElementById('edit').value=id
}