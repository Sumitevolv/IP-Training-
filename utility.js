const utilities ={
    log:function(message) {consolr.log("[LOG]: ${message}");},
    warn:function(message) {console.warn('[WARN]: ${message}');}
    
};

const app = Object.create(utilities);
app.name = "MyApp";
app.log("Application started");