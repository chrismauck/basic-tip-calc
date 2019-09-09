(function() {
    let dollarField = null;
    let serviceField = '0.20';

    $('#dollarField').on('blur', function() {
        if ($('#dollarField').val()) {
            dollarField = $(this).val();
            calculate(dollarField, serviceField);
        }
    });

    $('#tipRangeField').on('change', function() {
        serviceField = $(this).val() / 100;
        if ($('#dollarField').val()) {
            dollarField = $('#dollarField').val();
            calculate(dollarField, serviceField);
        }
    }) 
    const calculate = (amt, serv) => {
        let total = parseFloat(amt);
        let tipPer = parseFloat(serv);
        let tip = (total * serv).toFixed(2);
        let sum = parseFloat(total)+parseFloat(tip);
        sum = sum.toFixed(2);
        
        // console.log(total);
        // console.log(tipPer);
        // console.log(tip);
        // console.log(sum);
        $('#bill-value').html(total);
        $('#tip-value').html(tip);
        $('#total-value').html(sum);
    };

})();