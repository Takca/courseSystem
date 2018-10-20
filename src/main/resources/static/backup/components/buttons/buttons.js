function buttons(className) {
    console.log("We are Here");
    var $beautifulButton = $("." + className);
        $beautifulButton.unbind("click.myClick");
        $beautifulButton.on("click.myClick", function() {
        $(this).hide();
    });
}