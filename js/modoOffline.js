console.log('Este Script');
addEventListener('modoOffline', ()=>{
    console.log('fallback.html');
    document.location.href="fallback.html";
})
if(navigator.onLine) {
    console.log('Es online');
} else {
    console.log('Es Offline');
    document.location.href="fallback.html";

}