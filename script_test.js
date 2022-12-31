function bruhify() {
    //How to change text
    document.getElementById("text").innerHTML="bruh" + " bruh but again";

    //How to change an image
    document.getElementById("testImage").src="https://static.displate.com/280x392/displate/2020-07-08/cd0478f68cdb953e2bbe012c4035c038_e0b3c1e83e0066602233af5fef7df4df.jpg"

    //How to get values from radio buttons
    let buttons = document.getElementsByName("buttons")
    for (var i = 0; i < buttons.length; i++){
        if (buttons[i].checked){
            let val = buttons[i];
        }
        break;
    }
    if (val == 0){
        document.getElementById("text").style.color = 'red';
    } else if (val == 1){
        document.getElementById("text").style.color = 'white';
    }
}
