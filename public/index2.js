const text=document.getElementById("input");
const keys=["Alt","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Shift","PageDown","Control","CapsLock","Tab","Escape","Unidentified","AudioVolumeMute","Meta","End","PageUp","Home","Delete","Insert","MediaPlayPause","AudioVolumeDown","AudioVolumeUp","MediaTrackPrevious","MediaTrackNext","AltGraph"];
var a=text.innerHTML;
text.addEventListener("keydown",function(event){
    event.preventDefault();
    if(keys.includes(event.key)){
        return;
    }
    if(event.key==="Enter"){
        a="\n"+a;
        text.innerHTML=a;    
    }
    else if(event.key==="&"){
        
    }
    else if(event.key===" "){
        a=" "+a;
        text.innerHTML=a;
    }
    else if(event.key==="$"){
        a="";
        text.innerHTML=a;
    }
    else if(event.key==="Backspace"){
        a=a.slice(1);
        text.innerHTML=a;
    }
    else{
    var b=event.key;
    a=b+a;
    text.innerHTML=a;
    } 
});    